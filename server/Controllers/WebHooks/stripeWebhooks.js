import 'dotenv/config';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import { checkAuthenticated } from '../../middleware/checkAuthenticated.js';
import Product from '../../Models/product.js';
import _ from 'lodash';
import Order from '../../Models/order.js';
import product from '../../Models/product.js';
import User from '../../Models/user.js';

const stripe = Stripe(process.env.STRIPE_KEY);
const CLIENT_URL = process.env.CLIENT_URL;

const stripeWebHooks = asyncHandler(async (req, res, next) => {
  const event = req.body;
  if (event.type == 'charge.succeeded') {
    const { payment_intent } = event.data.object;
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
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
                        foundOptionVariation.stock - variationDetail.quantity ||
                        0,
                    },
                  );

                  isStockChange = true;
                }
              }
            });

            if (!isStockChange) {
              console.log(
                'stock didnt change for product: ',
                productObject.title,
                variationDetail,
              );
              productObject.stock =
                productObject.stock - variationDetail.quantity || 0;
            }
          } else {
            const findOptionsforVariation = productObject.variations[2].options;

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

    const result = Promise.all([...reduceStock]).then(async (res) => {
      const updateOrder = await Order.findOneAndUpdate(
        { _id: orderNumber },
        { $unset: { cartObj: '' }, $set: { status: 'received' } },
        { new: true },
      );

      const updateUser = await User.findByIdAndUpdate(
        userId,
        {
          $push: { orders: orderNumber },
        },
        {
          upsert: true,
        },
      );
    });

    //find product
    //then remove product

    // const foundProducts = await Promise.all(findAllProducts);

    // const removeProducts = foundProducts.map((product) => {
    //   console.log({ id: product.id });

    //   const getVariations = parseCartObj[product.id];
    //   console.log({ getVariations });

    //   if (isQuantityFixed) {
    //     let totalOrderQuantity = 0;

    //     getVariations.forEach(({ quantity }) => {
    //       totalOrderQuantity += quantity;
    //     });

    //     product.stock -= totalOrderQuantity;

    //     console.log(product.stock, { totalOrderQuantity });
    //     return product.save();
    //   }

    //   getVariations.map((variation) => {
    //     const isColorPresent =
    //       _.has(variation, 'color') && _.has(variation?.color, 'stock');
    //     const isSizePresent =
    //       _.has(variation, 'size') && _.has(variation?.size, 'stock');

    //     if (isColorPresent) {
    //       const colorProductVariations = product.variations.find(
    //         (item) => item.name == 'Colour',
    //       );
    //       console.log({ colorProductVariations });
    //       const { options } = colorProductVariations;
    //       const getItemVariation = options.get(variation.id);
    //       const newVariations = {
    //         ...getItemVariation,
    //         stock: getItemVariation.stock - variation.quantity,
    //       };
    //       options.set(variation.id, newVariations);
    //     }

    //     if (isSizePresent) {
    //       const sizeProductVariations = product.variations.find(
    //         (item) => item.name == 'Size',
    //       );
    //       console.log({ sizeProductVariations });
    //       const { options } = sizeProductVariations;
    //       const getItemVariation = options.get(variation.id);
    //       const newVariations = {
    //         ...getItemVariation,
    //         stock: getItemVariation.stock - variation.quantity,
    //       };
    //       options.set(variation.id, newVariations);
    //     }

    //     return product.save();
    //   });
    // });
    // const result = await Promise.all(removeProducts);
    // console.log({ result });
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
});

export default stripeWebHooks;
