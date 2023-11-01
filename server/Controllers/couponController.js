/* eslint-disable camelcase */
import asyncHandler from 'express-async-handler';

import Coupon from '../Models/coupon.js';

export const get_all_coupons = asyncHandler(async (req, res, next) => {
  const coupons = await Coupon.find();

  res.send(coupons);
});
export const create_coupon = asyncHandler(async (req, res, next) => {
  const { code, amount } = req.body;
  const newCoupon = await Coupon.create({ code, amount });
  res.status(200).send(newCoupon);
});

export const get_single_coupon = asyncHandler(async (req, res, next) => {
  const { code } = req.query;

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });

  if (coupon) {
    res.status(200).send(coupon);
  } else {
    const err = new Error('Coupon Not Found');
    err.statusCode = 404;
    next(err);
    // res.status(404).send('Coupon Not Found');
  }
});

export const delete_single_coupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const coupon = await Coupon.findByIdAndDelete(id);
  res.status(200).send(`Coupon ${coupon.code} successfully removed`);
});
