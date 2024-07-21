/* eslint-disable camelcase */
import asyncHandler from 'express-async-handler';

import Coupon from '../Models/coupon.js';
import { check, validationResult } from 'express-validator';
import dayjs from 'dayjs';

export const get_all_coupons = asyncHandler(async (req, res, next) => {
  // const coupons = await Coupon.find({}, null, { lean: { toObject: true } });

  const coupons = await Coupon.aggregate([{ $sort: { timestamp: -1 } }]);

  res.status(200).send(coupons);
});

export const get_single_coupon = [
  asyncHandler(async (req, res, next) => {
    const { code } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (coupon) {
      res.status(200).send(coupon);
    } else {
      const err = new Error('Coupon Not Found');
      err.statusCode = 404;
      next(err);
      // res.status(404).send('Coupon Not Found');
    }
  }),
];

export const delete_single_coupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const coupon = await Coupon.findByIdAndDelete(id);
  res.status(200).send(`Coupon ${coupon.code} successfully removed`);
});

export const create_coupon = [
  check('code', 'Must be 6-16 characters long')
    .escape()
    .trim()
    .toUpperCase()
    .notEmpty()
    .isLength({ min: 6, max: 16 })
    .custom(async (value) => {
      const coupon = await Coupon.findOne({ code: value });
      if (coupon) {
        throw new Error(
          `Coupon "${value}" already exist. Try a different code`,
        );
      }
      return value;
    }),
  check('type', 'Select a Type').escape().trim().isIn(['percentage', 'fixed']),
  check('order_minimum', 'Select a Type')
    .escape()
    .trim()
    .isIn(['none', 'number_of_items', 'order_total']),

  check('amount', 'Must be equal to or greater than 5')
    .escape()
    .trim()
    .isInt({ min: 5 }),

  check('start_date', 'Select a date')
    .escape()
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      const dateDiffToday = dayjs.unix(value).diff(dayjs(), 'day');
      const { end_date, no_end_date } = req.body;
      const dateDiffPeriod = dayjs
        .unix(value)
        .diff(dayjs.unix(end_date), 'day');
      // console.log({ value, dateDiffToday });

      console.log({
        value,
        dateDiffPeriod,
        dateDiffToday,
        date: dayjs.unix(value).toISOString(),
      });

      if (dateDiffToday < 0) {
        throw new Error('Must not be in the past');
      } else if (no_end_date) {
        return value;
      } else if (dateDiffPeriod > 0) {
        throw new Error('Must be before end date');
      } else {
        return value;
      }
    }),
  check('end_date', 'Select a date')
    .escape()
    .trim()
    // .notEmpty()
    .custom((value, { req }) => {
      const { start_date, no_end_date } = req.body;

      if (no_end_date) {
        return true;
      }
      const dateDiffToday = dayjs.unix(value).diff(dayjs(), 'day');
      const dateDiffPeriod = dayjs
        .unix(value)
        .diff(dayjs.unix(start_date), 'day');

      if (dateDiffToday < 0) {
        throw new Error('Must not be in the past');
      } else if (dateDiffPeriod < 0) {
        throw new Error('Must be after start date');
      }

      return value;
    }),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.mapped());
    }

    if (req.body?.create) {
      const coupon = (await Coupon.create(req.body)).toObject();

      return res.send({ ...coupon, created: true });
    }

    // const coupoon = await Coupon.create(req.body)
    return res.send({ msg: 'passed validation' });
    // const { code, amount, type } = req.body;
    // const newCoupon = await Coupon.create({ code, amount, type });
    // res.status(200).send(newCoupon);
  }),
];
