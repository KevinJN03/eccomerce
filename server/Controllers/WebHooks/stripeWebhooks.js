import 'dotenv/config';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import { checkAuthenticated } from '../../middleware/checkAuthenticated.js';
import Product from '../../Models/product.js';
import _ from 'lodash';
import Order from '../../Models/order.js';
import product from '../../Models/product.js';
import User from '../../Models/user.js';
import transporter from '../../utils/nodemailer.js';
import { render } from '@react-email/render';
import OrderSuccess from '../../React Email/emails/orderSuccess.jsx';
import * as React from 'react';
import OrderReceived from '../../React Email/emails/orderReceived.jsx';
const stripe = Stripe(process.env.STRIPE_KEY);
const CLIENT_URL = process.env.CLIENT_URL;

const stripeWebHooks = asyncHandler(async (req, res, next) => {
  try {
    const event = req.body;

    // if (event.type == 'setup_intent.requires_action') {
    //   const result = await stripe.handleNextAction({
    //     clientSecret: event?.data?.object?.client_secret,
    //   });
    //   console.log('secret: ', event?.data?.object?.client_secret )
    // }

    if (event.type === 'charge.failed') {
      console.log({ process: 'failed' });
      const { payment_intent } = event.data.object;
      const paymentIntent =
        await stripe.paymentIntents.retrieve(payment_intent);

      const orderNumber = paymentIntent.metadata?.orderNumber;

      const order = await Order.findByIdAndUpdate(orderNumber, {
        status: 'failed',
      });
    }

    if (event.type === 'charge.succeeded') {
      const { payment_intent } = event.data.object;
      const paymentIntent =
        await stripe.paymentIntents.retrieve(payment_intent);
      const orderNumber = paymentIntent.metadata?.orderNumber;

      const userId = paymentIntent?.customer;
      const order = await Order.findById(orderNumber, null, {
        lean: { toObject: true },
      });

      const cartObj = {};

      order.items.forEach((item) => {
        if (_.has(cartObj, item.product)) {
          cartObj[item.product].push(item);
        } else {
          cartObj[item.product] = [item];
        }
      });
      const productsArray = Object.keys(cartObj);

      const foundProducts = await Product.find({ _id: { $in: productsArray } });

      foundProducts.forEach((productObject) => {
        const ItemsArray = cartObj[productObject.id];

        ItemsArray.forEach((variationDetail) => {
          if (_.get(productObject, 'variations')?.length < 3) {
            const findQuantityVariation = {};

            for (let i = 0; i < productObject.variations.length; i++) {
              if (
                _.get(productObject, [
                  'variations',
                  i,
                  'quantityHeader',
                  'on',
                ]) == true
              ) {
                _.assign(
                  findQuantityVariation,
                  _.merge(productObject.variations[i].toObject(), {
                    variationIndex: i + 1,
                  }),
                );
                break;
              }
            }

            if (!_.isEmpty(findQuantityVariation)) {
              const variationOptions = findQuantityVariation.options;
              const foundVariationId = _.get(variationDetail, [
                `variation${findQuantityVariation.variationIndex}`,
                'id',
              ]);
              const foundVariation = variationOptions?.get(foundVariationId);

              variationOptions.set(foundVariationId, {
                ...foundVariation,
                stock: (foundVariation.stock -= variationDetail.quantity),
              });
            } else {
              productObject.stock =
                productObject.stock - variationDetail.quantity || 0;
            }
          } else if (_.get(productObject, 'variations')?.length >= 3) {
            const variationCombineOption = productObject.variations[2].options;

            if (variationCombineOption) {
              const foundOptionVariation = variationCombineOption.get(
                variationDetail?.variation2?.id,
              );

              if (foundOptionVariation) {
                variationCombineOption.set(foundOptionVariation.id, {
                  ...foundOptionVariation,
                  stock: (foundOptionVariation.stock -=
                    variationDetail.quantity),
                });
              } else {
                console.log('didnt find variation, may have been deleted');
              }
            }
          } else {
            console.log('reach else block');
          }
        });

        return productObject.save();
      });

      const getPaymentMethod = await stripe.paymentMethods.retrieve(
        paymentIntent?.payment_method,
      );

      const updateOrder = await Order.findOneAndUpdate(
        { _id: orderNumber },
        {
          $set: {
            status: 'received',
            payment_type:
              getPaymentMethod?.card?.brand || getPaymentMethod?.type,
            payment_intent_id: paymentIntent?.id,
          },
        },
        {
          populate: {
            path: 'items.product customer itemsByProfile.items.product',
          },
          new: true,
          lean: { toObject: true },
        },
      ).exec();

      // const updateUser = await User.findByIdAndUpdate(
      //   userId,
      //   {
      //     $push: { orders: orderNumber },
      //   },
      //   {
      //     upsert: true,
      //     new: true,
      //   },
      // );

      const emailHtml = render(<OrderReceived order={updateOrder} />);

      await transporter.sendMail({
        from: 'kevinjean321@gmail.com',
        to: updateOrder?.customer?.email,
        subject: 'Thanks for your order!',
        html: emailHtml,
      });

      res.status(200).send({ success: true });
      return;
    }

    if (event.type == 'setup_intent.succeeded') {
      const { object } = event.data;

      const { customer } = object;
      const paymentMethod = await stripe.paymentMethods.retrieve(
        object.payment_method,
      );

      if (paymentMethod.type === 'card') {
        const newPaymentMethodId = paymentMethod.id;
        const newPaymentMethodFingerPrint = paymentMethod.card.fingerprint;
        const allPaymentMethods = await stripe.customers.listPaymentMethods(
          customer,
          {
            type: 'card',
          },
        );
        const { data } = allPaymentMethods;

        const fingerPrintArray = [];

        data.forEach((item) => {
          const fingerPrint = item.card.fingerprint;
          if (
            fingerPrint == newPaymentMethodFingerPrint &&
            item.id != newPaymentMethodId
          ) {
            fingerPrintArray.push({
              fingerPrint,
              id: item.id,
            });
          }
        });

        await Promise.all(
          [...fingerPrintArray].map(({ id }) => {
            return stripe.paymentMethods.detach(id);
          }),
        );
      }

      return res.send({ success: true });
    } else {
      res.status(200).send({ success: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
});

export default stripeWebHooks;
