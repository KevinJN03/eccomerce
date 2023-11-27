/* eslint-disable import/prefer-default-export */
import asyncHandler from 'express-async-handler';
import Product from '../Models/product.js';
import { validationResult, check } from 'express-validator';
import { checkAuthenticated } from '../middleware/checkAuthenticated.js';

import 'dotenv/config';
import Stripe from 'stripe';

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

    const getResult = getAllCartProducts.map((product) => {
      const getVariationSelectArray = cartObj[product.id];

      getVariationSelectArray.map(({ color, size, quantity }) => {
        if (product.isSizePresent) {
          const findVariation = product.variations.find(
            (item) => item.name === 'Size',
          );

          const getVariation = findVariation.options.get(size.id);

          cartPrice +=
            (getVariation?.price || product?.price?.current) * quantity;
          return getVariation;
        }

        if (product.isColorPresent) {
          const findVariation = product.variations.find(
            (item) => item.name === 'Colour',
          );

          const getVariation = findVariation.options.get(color.id);
          cartPrice +=
            (getVariation?.price || product?.price?.current) * quantity;

          return getVariation;
        }
      });
    });
    const calculatePrice = parseInt(cartPrice * 100);
    console.log({ calculatePrice });
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

    const getResult = getAllCartProducts.map((product) => {
      const getVariationSelectArray = cartObj[product.id];

      getVariationSelectArray.map(({ color, size, quantity }) => {
        if (product.isSizePresent) {
          const findVariation = product.variations.find(
            (item) => item.name === 'Size',
          );

          const getVariation = findVariation.options.get(size.id);

          cartPrice +=
            (getVariation?.price || product?.price?.current) * quantity;
          return getVariation;
        }

        if (product.isColorPresent) {
          const findVariation = product.variations.find(
            (item) => item.name === 'Colour',
          );

          const getVariation = findVariation.options.get(color.id);
          cartPrice +=
            (getVariation?.price || product?.price?.current) * quantity;

          return getVariation;
        }
      });
    });
    const calculatePrice = parseInt(cartPrice * 100);
    console.log({ calculatePrice });
    /* use off_session inorder to allow klarna payment */
    const paymentIntent = await stripe.paymentIntents.create({
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
