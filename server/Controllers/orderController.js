/* eslint-disable import/prefer-default-export */
import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import { validationResult, check } from 'express-validator';
import { checkAuthenticated } from '../middleware/checkAuthenticated.js';
import randomstring from 'randomstring';
import 'dotenv/config';
import Stripe from 'stripe';
import _ from 'lodash';
import generateOrderNumber from '../utils/generateOrderNumber.js';
import Order from '../Models/order.js';
const stripe = Stripe(process.env.STRIPE_KEY);

export const createPaymentIntent = [
  // check('cart').escape(),
  // check('shipping').escape(),
  // check('billing').escape(),
  checkAuthenticated,
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;
    const { cart, shipping, deliveryOption, billing, deliveryDate } = req.body;
    // make a map with all the cart item products
    //
    let cartPrice = 0;
    const cartMap = new Map();
    const cartObj = {};
    const itemsArray = [];
    const cartIds = [];
    cart.map(
      ({
        id,
        variationSelect,
        quantity,
        isVariation1Present,
        isVariation2Present,
        isVariationCombine,
        cartId,
        price,
      }) => {
        const obj = {
          id,
          ...variationSelect,

          quantity,
          isVariation1Present,
          isVariation2Present,
          isVariationCombine,
          price: price?.current,
        };
        itemsArray.push({ ...obj, product: id });
        cartIds.push(cartId);
        if (!cartMap.has(id)) {
          obj.cartId = cartId;
          const array = [obj];

          cartObj[id] = array;
          cartMap.set(id, array);
        } else {
          obj.cartId = cartId;
          const getArray = cartMap.get(id);

          getArray.push(obj);
          cartMap.set(getArray);
        }
      },
    );

    const productsArray = Object.keys(cartObj);

    const getAllCartProducts = await Product.find({
      _id: { $in: productsArray },
    });

    const getResult = getAllCartProducts.map((product) => {
      const getVariationSelectArray = cartObj[product.id];

      getVariationSelectArray.map((variationDetail) => {
        if (product?.variations) {
          if (product.variations.length < 3) {
            const foundObj = { price: null, stock: null };
            const findOptionsforVariation1 = product.variations.find(
              (item) => item.name === variationDetail.variation1.title,
            );
            const findOptionsforVariation2 = product.variations.find(
              (item) => item.name === variationDetail.variation2.title,
            );

            const findPrice_StockArray = [
              findOptionsforVariation1,
              findOptionsforVariation2,
            ].map((variation, index) => {
              if (variation?.options) {
                const foundOptionVariation = variation.options.get(
                  variationDetail[`variation${index + 1}`].id,
                );

                if (_.has(foundOptionVariation, 'price')) {
                  foundObj.price = foundOptionVariation.price;
                }

                if (_.has(foundOptionVariation, 'stock')) {
                  foundObj.stock = foundOptionVariation.stock;
                }
              }
            });

            if (foundObj.price) {
              cartPrice += foundObj.price * variationDetail?.quantity;
            } else {
              cartPrice += product?.price?.current * variationDetail.quantity;
            }
          } else {
            const findOptionsforVariation = product.variations[2].options;

            if (findOptionsforVariation) {
              const foundOptionVariation = findOptionsforVariation.get(
                variationDetail?.variation2?.id,
              );

              if (foundOptionVariation) {
                cartPrice +=
                  foundOptionVariation?.price * variationDetail?.quantity;
              } else {
              }
            }
          }
        }
      });
    });
    let subTotal = cartPrice;
    if (_.has(deliveryOption, 'cost')) {
      cartPrice += deliveryOption.cost;
    }

    let parseCartPrice = parseFloat(cartPrice).toFixed(2);
    const calculatePrice = parseInt(parseCartPrice.replace('.', ''));

    /* use off_session inorder to allow klarna payment */
    const orderNumber = generateOrderNumber();

    console.log({ calculatePrice });
    const paymentIntent = await stripe.paymentIntents.create({
      metadata: {
        orderNumber,
      },
      amount: calculatePrice,
      currency: 'gbp',
      customer: userId,
      // setup_future_usage: 'off_session',
      shipping,
      payment_method_types: ['card', 'paypal', 'klarna', 'afterpay_clearpay'],
    });

    console.log({ orderNumber });
    const orderObj = {
      _id: orderNumber,
      customer: userId,
      status: 'processing',
      shipping_address: shipping,
      billing_address: billing,
      transaction_cost: {
        total: parseCartPrice,
        subtotal: parseFloat(subTotal).toFixed(2),
      },
      shipping_option: {
        cost: deliveryOption?.cost,
        delivery_date: deliveryDate,
        name: deliveryOption?.name,
        id: deliveryOption?.id,
      },
      items: itemsArray,
      cartObj,
      cartIds,
    };

    const order = await Order.create(orderObj);
    // console.log({ order });
    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
      orderNumber: orderNumber,
      id: paymentIntent.id,
    });
  }),
];

export const getOrderDetails = [
  checkAuthenticated,
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;
    const { id } = req.params;

    const order = await Order.findById(id.toUpperCase())
      .populate('items.product', ['images', 'title', 'variations'])
      .exec();
    if (order) {
      if (order.customer.toString() === userId) {
        return res.status(200).send({
          order,
          success: false,
        });
      } else {
        res.status(404).send({
          msg: 'You are not authorized.',
          success: false,
        });
      }
    } else {
      return res.status(404).send({
        msg: 'Not Found',
        success: false,
      });
    }
  }),
];
