import asyncHandler from 'express-async-handler';
import cart_wishlist_pipeline from './cart_wishlist_pipeline';
import { Types } from 'mongoose';
import Cart from '../Models/cart';
import variationFormat from './variationFormat';
import _ from 'lodash';
import Stripe from 'stripe';
import 'dotenv/config';
import randomstring from 'randomstring';
import Order from '../Models/order';
const stripe = Stripe(process.env.STRIPE_KEY);
import generateOrderNumber from './generateOrderNumber';
import { check, validationResult } from 'express-validator';

const generatePaymentIntent = [
  check('cart_id')
    .escape()
    .trim()
    .custom(async (value) => {
      const cart = await Cart.findById(value, null, {
        lean: { toObject: true },
      });
      let failed = false;
      const delivery_option = {};
      _.forEach(_.get(cart, 'items'), ({ delivery }) => {
        if (_.get(cart, ['delivery_option', delivery])) {
          delivery_option[delivery] = cart.delivery_option?.[delivery];
          return
        }

        failed = true;
        delivery_option[delivery] = false;
      });

      console.log({ value, delivery_option });

      if (failed) {
        throw new Error(JSON.stringify(delivery_option));
      } else {
        return delivery_option;
      }
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => {
      try {
        return JSON.parse(msg);
      } catch (error) {
        return msg;
      }
    });

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.mapped());
    }
    return res.send({ success: true });
    const {
      cart,
      shipping,
      deliveryOption,
      billing,
      deliveryDate,
      total,
      cart_id,
      cartInfo,
      promo,
    } = req.body;
    const userId = req.user._id?.toString();

    //   const data = await Cart.aggregate([
    //     {
    //       $match: {
    //         _id: new Types.ObjectId(cart_id),
    //       },
    //     },
    //     ...cart_wishlist_pipeline,
    //     {
    //       $project: { items: 1 },
    //     },
    //   ]);

    //   const document = {
    //     ...data[0],
    //     items: variationFormat({ products: data[0].items }),
    //   };

    //   const items = variationFormat({ products: data[0].items });

    //
    //   let calculateTotalCost = 0;

    //   items.forEach((item) => {
    //     calculateTotalCost +=
    //       _.get(item, 'price.current') * _.get(item, 'quantity');
    //   });
    const order_id = generateOrderNumber();

    const paymentIntent = await stripe.paymentIntents.create({
      metadata: {
        order_id,
      },
      amount: parseInt(parseFloat(total.withShipping) * 100),
      currency: 'gbp',
      customer: userId,
      shipping,
      payment_method_types: ['card', 'paypal', 'klarna', 'afterpay_clearpay'],
    });
    const itemsArray = [];
    const itemsByProfileArray = Object.entries(cartInfo.deliveryInfoObj).map(
      ([key, value]) => {
        const {
          itemsByProfile,
          shipping_costs,
          standard_delivery,
          delivery_upgrades,
          processing_time,
        } = value;
        const delivery_option = _.get(cartInfo, ['delivery_option', key]);
        //   console.log({
        //     shipping: { ..._.get(shipping_costs, delivery_option), profileId: key },
        //     delivery_option,
        //   });

        const findDelivery = [...standard_delivery, ...delivery_upgrades].find(
          ({ _id }) => _id == delivery_option,
        );

        const shippingInfo = {
          ...findDelivery,
          ..._.get(shipping_costs, delivery_option),
          processing_time,
          profileId: key,
        };

        const items = itemsByProfile.map(
          ({ variation_data, product_id, quantity, price, ...rest }) => {
            return {
              product: product_id,
              quantity,
              isVariation1Present:
                _.get(variation_data, 'variation1_present') || false,
              isVariation2Present:
                _.get(variation_data, 'variation2_present') || false,
              isVariationCombine:
                _.get(variation_data, 'isVariationCOmbine') || false,
              variation1: _.get(variation_data, 'select.variation1'),
              variation2: _.get(variation_data, 'select.variation2'),

              price: _.get(price, 'current'),
              ...rest,
            };
          },
        );

        itemsArray.push(...items);
        return {
          items,
          shippingInfo,
        };
      },
    );

    //   const profile = await DeliveryProfile.findById(deliveryOption?.id, null, {
    //     toObject: true,
    //     new: true,
    //   });

    const orderObj = {
      _id: order_id,
      customer: userId,
      status: 'processing',
      shipping_address: shipping,
      billing_address: billing,
      transaction_cost: {
        total: total.withShipping,
        subtotal: total.withOutShipping,
        promo: {
          code: promo?.code,
          discount: total?.amountOff,
        },
        delivery_cost: total?.delivery_cost,
      },
      itemsByProfile: itemsByProfileArray,
      shipping_option: {
        //   cost: total?.delivery_cost,
        //   delivery_date: deliveryDate,
        //   name: deliveryOption?.name,
        //   id: deliveryOption?.id,
        //   time: profile?.processingTime?.end,
        //   type: profile?.processingTime?.type,
      },

      items: itemsArray,
      cartId: cart_id,
    };

    const order = await Order.create(orderObj);
    // console.log({ order });
    res.status(200).send({
      success: true,
      clientSecret: paymentIntent.client_secret,
      orderNumber: order_id,
      id: paymentIntent.id,
    });
  }),
];

export default generatePaymentIntent;
