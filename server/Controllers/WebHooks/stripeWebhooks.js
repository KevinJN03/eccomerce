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

      const order = await Order.findById(orderNumber);

      const cartObj = order?.cartObj;
      const productsArray = Object.keys(cartObj);
      const foundProducts = await Product.find({ _id: { $in: productsArray } });

      const reduceStock = await foundProducts.map((productObject) => {
        const getCartVariationInfoArray = cartObj[productObject.id];
        getCartVariationInfoArray.map((variationDetail) => {
          if (productObject?.variations) {
            if (productObject.variations.length < 3) {
              const foundObj = { price: null, stock: null };
              const findOptionsforVariation1 = productObject.variations.find(
                (item) => item.name === variationDetail.variation1.title,
              );
              const findOptionsforVariation2 = productObject.variations.find(
                (item) => item.name === variationDetail.variation2.title,
              );
              let isStockChange = false;

              const foundVariations = [
                findOptionsforVariation1,
                findOptionsforVariation2,
              ].map((variation, index) => {
                if (variation?.options) {
                  const foundOptionVariation = variation.options.get(
                    variationDetail[`variation${index + 1}`].id,
                  );

                  if (foundOptionVariation?.stock) {
                    variation.options.set(
                      variationDetail[`variation${index + 1}`].id,
                      {
                        ...foundOptionVariation,
                        stock:
                          foundOptionVariation.stock -
                            variationDetail.quantity || 0,
                      },
                    );

                    isStockChange = true;
                  }
                }
              });

              if (!isStockChange) {
                productObject.stock =
                  productObject.stock - variationDetail.quantity || 0;
              }
            } else {
              const findOptionsforVariation =
                productObject.variations[2].options;

              if (findOptionsforVariation) {
                const foundOptionVariation = findOptionsforVariation.get(
                  variationDetail?.variation2?.id,
                );

                if (foundOptionVariation) {
                  productObject.variations[2].options.set(
                    variationDetail?.variation2?.id,
                    {
                      ...foundOptionVariation,
                      stock:
                        foundOptionVariation.stock - variationDetail.quantity ||
                        0,
                    },
                  );
                } else {
                  console.log('didnt find variation, may have been deleted');
                }
              }
            }
          }
        });

        return productObject.save();
      });

      const result = Promise.all([...reduceStock])

        .then(async (res) => {
          // let paymentType = '';

          const getPaymentMethod = await stripe.paymentMethods.retrieve(
            paymentIntent?.payment_method,
          );
          /*     if (getPaymentMethod?.type == 'card') {
            paymentType = getPaymentMethod.card?.brand;
          } else {
            paymentType = getPaymentMethod?.type;
          }
          console.log({ paymentType }); */
          const updateOrder = await Order.findOneAndUpdate(
            { _id: orderNumber },
            {
              $unset: { cartObj: '' },
              $set: {
                status: 'received',
                payment_type:
                  getPaymentMethod?.card?.brand || getPaymentMethod?.type,
                payment_intent_id: paymentIntent?.id,
              },
            },
            {
              populate: {
                path: 'items.product customer',
              },
              new: true,
              lean: { toObject: true },
            },
          ).exec();

          const updateUser = await User.findByIdAndUpdate(
            userId,
            {
              $push: { orders: orderNumber },
            },
            {
              upsert: true,
              new: true,
            },
          );

          const emailHtml = render(<OrderReceived order={updateOrder} />);

          const sendEmail = await transporter.sendMail({
            from: 'kevinjean321@gmail.com',
            to: updateOrder?.customer?.email,
            subject: 'Thanks for your order!',
            html: emailHtml,
          });
        })
        .catch((error) => {
          console.log(error);
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
