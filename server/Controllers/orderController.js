/* eslint-disable import/prefer-default-export */
import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import { validationResult, check } from 'express-validator';
import { checkAuthenticated } from '../middleware/checkAuthenticated.js';

import 'dotenv/config';
import Stripe from 'stripe';
import _ from 'lodash';
const stripe = Stripe(process.env.STRIPE_KEY);

export const create_order = [
  checkAuthenticated,
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;
    const { cart, shipping } = req.body;
    // make a map with all the cart item products
    //
    let cartPrice = 0;
    const cartMap = new Map();
    const cartObj = {};
    cart.map(({ id, variationSelect, quantity }) => {
      if (!cartMap.has(id)) {
        const array = [{ ...variationSelect, quantity }];
        cartObj[id] = array;
        cartMap.set(id, array);
      } else {
        const getArray = cartMap.get(id);

        getArray.push({ ...variationSelect, quantity });
        cartMap.set(getArray);
      }
    });
    const getAllCartProducts = await Promise.all(
      Object.keys(cartObj).map((id) => {
        const product = Product.findById(id);
        return product;
      }),
    );
    let isQuantityFixed = true;
    const getResult = getAllCartProducts.map((product) => {
      const getVariationSelectArray = cartObj[product.id];

      getVariationSelectArray.map(({ color, size, quantity }) => {
        if (product.isSizePresent) {
          const findVariation = product.variations.find(
            (item) => item.name === 'Size',
          );

          const getVariation = findVariation.options.get(size.id);
          if (_.has(getVariation, 'price')) {
            cartPrice += getVariation.price * quantity;
            isQuantityFixed = false;
          } else {
            cartPrice += product.price.current * quantity;
          }
          return getVariation;
        }

        if (product.isColorPresent) {
          const findVariation = product.variations.find(
            (item) => item.name === 'Colour',
          );

          const getVariation = findVariation.options.get(color.id);

          if (_.has(getVariation, 'price')) {
            cartPrice += getVariation.price * quantity;
            isQuantityFixed = false;
          } else {
            cartPrice += product.price.current * quantity;
          }

          return getVariation;
        }
      });
    });
    const calculatePrice = parseInt(cartPrice * 100);
    /* use off_session inorder to allow klarna payment */
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculatePrice,
      currency: 'gbp',
      customer: userId,
      // setup_future_usage: 'off_session',
      shipping,
      payment_method_types: ['card', 'paypal', 'klarna', 'afterpay_clearpay'],
    });
    console.log(paymentIntent);
    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  }),
];

export const createPaymentIntent = [
  checkAuthenticated,
  asyncHandler(async (req, res, next) => {
    const userId = req.session.passport.user;
    const { cart, shipping } = req.body;
    // make a map with all the cart item products
    //
    let cartPrice = 0;
    const cartMap = new Map();
    const cartObj = {};
    cart.map(
      ({
        id,
        variationSelect,
        quantity,
        isVariation1Present,
        isVariation2Present,
        isVariationCombine,
      }) => {
        const obj = {
          id,
          ...variationSelect,
          quantity,
          isVariation1Present,
          isVariation2Present,
          isVariationCombine,
        };
        if (!cartMap.has(id)) {
          const array = [obj];
          cartObj[id] = array;
          cartMap.set(id, array);
        } else {
          const getArray = cartMap.get(id);

          getArray.push(obj);
          cartMap.set(getArray);
        }
      },
    );
    const getAllCartProducts = await Promise.all(
      Object.keys(cartObj).map((id) => {
        const product = Product.findById(id);
        return product;
      }),
    );
    let isQuantityFixed = true;
    const getResult = getAllCartProducts.map((product) => {
      const getVariationSelectArray = cartObj[product.id];

      getVariationSelectArray.map((variationDetail) => {
        // console.log(variationDetail);
        if (product?.variations) {
          if (product.variations.length < 3) {
            // console.log({ notCobine: true, variationDetail });

            const foundObj = { price: null, stock: null };
            const findOptionsforVariation1 = product.variations.find(
              (item) => item.name == variationDetail.variation1.title,
            );
            const findOptionsforVariation2 = product.variations.find(
              (item) => item.name == variationDetail.variation2.title,
            );

            if (findOptionsforVariation1) {
              const foundOptionVariation = findOptionsforVariation1.options.get(
                variationDetail.variation1.id,
              );

              if (_.has(foundOptionVariation, 'price')) {
                foundObj.price = foundOptionVariation.price;
              }

              if (_.has(foundOptionVariation, 'stock')) {
                foundObj.stock = foundOptionVariation.stock;
              }
            }

            if (findOptionsforVariation2) {
              const foundOptionVariation = findOptionsforVariation2.options.get(
                variationDetail.variation2.id,
              );

              if (_.has(foundOptionVariation, 'price')) {
                foundObj.price = foundOptionVariation.price;
              }

              if (_.has(foundOptionVariation, 'stock')) {
                foundObj.stock = foundOptionVariation.stock;
              }
            }

            console.log({ foundObj });

            if (foundObj.price) {
              cartPrice += foundObj.price * variationDetail?.quantity;
            } else {
              cartPrice += product?.price?.current * variationDetail.quantity;
            }
          } else {
            console.log('this is a combineVariation');

            const findOptionsforVariation = product.variations[2].options;

            if (findOptionsforVariation) {
              const foundOptionVariation = findOptionsforVariation.get(
                variationDetail?.variation2?.id,
              );

              console.log({ foundOptionVariation });

              if (foundOptionVariation) {
                cartPrice +=
                  foundOptionVariation?.price * variationDetail?.quantity;
              } else {
                console.log('didnt find variation, may have been deleted');
              }
            }
          }
        }
      });
    });
    const calculatePrice = parseInt(cartPrice * 100);
    console.log({ cartPrice });
    /* use off_session inorder to allow klarna payment */

    const paymentIntent = await stripe.paymentIntents.create({
      metadata: {
        // cartObj: JSON.stringify(cartObj),
        isQuantityFixed,
      },
      amount: calculatePrice,
      currency: 'gbp',
      customer: userId,
      // setup_future_usage: 'off_session',
      shipping,
      payment_method_types: ['card', 'paypal', 'klarna', 'afterpay_clearpay'],
    });

    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  }),
];
