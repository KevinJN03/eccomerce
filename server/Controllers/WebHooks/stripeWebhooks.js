import 'dotenv/config';
import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import { checkAuthenticated } from '../../middleware/checkAuthenticated.js';
import Product from '../../Models/product.js';
import _ from 'lodash';
const stripe = Stripe(process.env.STRIPE_KEY);
const CLIENT_URL = process.env.CLIENT_URL;

const stripeWebHooks = asyncHandler(async (req, res, next) => {
  const event = req.body;
  if (event.type == 'charge.succeeded') {
    const { payment_intent } = event.data.object;
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
    const cartObj = paymentIntent.metadata?.cartObj;
    const parseCartObj = JSON.parse(cartObj);
    const isQuantityFixed = paymentIntent.metadata?.isQuantityFixed;
    const findAllProducts = Object.keys(parseCartObj).map((id) => {
      return Product.findById(id);
    });

    //find product
    //then remove product

    const foundProducts = await Promise.all(findAllProducts);

    const removeProducts = foundProducts.map((product) => {
      console.log({ id: product.id });

      const getVariations = parseCartObj[product.id];
      console.log({ getVariations });

      if (isQuantityFixed) {
        let totalOrderQuantity = 0;

        getVariations.forEach(({ quantity }) => {
          totalOrderQuantity += quantity;
        });

        product.stock -= totalOrderQuantity;

        console.log(product.stock, { totalOrderQuantity });
        return product.save();
      }

      getVariations.map((variation) => {
        const isColorPresent =
          _.has(variation, 'color') && _.has(variation?.color, 'stock');
        const isSizePresent =
          _.has(variation, 'size') && _.has(variation?.size, 'stock');

        if (isColorPresent) {
          const colorProductVariations = product.variations.find(
            (item) => item.name == 'Colour',
          );
          console.log({ colorProductVariations });
          const { options } = colorProductVariations;
          const getItemVariation = options.get(variation.id);
          const newVariations = {
            ...getItemVariation,
            stock: getItemVariation.stock - variation.quantity,
          };
          options.set(variation.id, newVariations);
        }

        if (isSizePresent) {
          const sizeProductVariations = product.variations.find(
            (item) => item.name == 'Size',
          );
          console.log({ sizeProductVariations });
          const { options } = sizeProductVariations;
          const getItemVariation = options.get(variation.id);
          const newVariations = {
            ...getItemVariation,
            stock: getItemVariation.stock - variation.quantity,
          };
          options.set(variation.id, newVariations);
        }

        return product.save();
      });
    });
    const result = await Promise.all(removeProducts);
    console.log({ result });
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
