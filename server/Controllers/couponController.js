import asyncHandler from 'express-async-handler';

import Coupon from '../Models/coupon.js';

export const get_all_coupons = asyncHandler(async (req, res, next) => {
  const coupons = await Coupon.find();

  res.send(coupons);
});
export const create_coupon = asyncHandler(async (req, res, next) => {
  const { code , amount } = req.body;
  const newCoupon = await Coupon.create({ code, amount });
  res.status(200).send(newCoupon);
});

export const get_single_coupon = asyncHandler(async (req, res, next) => {
  const { code } = req.query;

  console.log(code);

  const coupon = await Coupon.findOne({ code });

  res.status(200).send(coupon);
});

export const delete_single_coupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const coupon = await Coupon.findByIdAndDelete(id);
  res.status(200).send(`Coupon ${coupon.code} successfully removed`);
});
