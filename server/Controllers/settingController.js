/* eslint-disable import/prefer-default-export */
import express from 'express';
import 'dotenv/config.js';
import asyncHandler from 'express-async-handler';
import Setting from '../Models/setting.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

export const update_settings = [
  check('delivery.full_name', 'Please enter a full name.')
    .escape()
    .trim()
    .notEmpty(),
  check('delivery.address_1', 'Please enter a street address.')
    .escape()
    .trim()
    .notEmpty(),
  check('delivery.address_2').escape().trim(),
  check('delivery.city', 'Please enter a city.').escape().trim().notEmpty(),
  check('delivery.post_code', 'Please enter a post code.')
    .escape()
    .trim()
    .notEmpty(),
  check('delivery.phone_number', 'Please enter a valid phone number.')
    .escape()
    .trim()
    .notEmpty(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      console.log(errors.mapped());
      return res.status(404).send(errors.mapped());
    }
    const { name } = req.body;

    const findSetting = await Setting.findOne({ name });
    let setting = null;
    if (findSetting) {
      setting = await Setting.findOneAndUpdate({ name }, req.body, {
        new: true,
        // runValidators: true,
      });
    } else {
      setting = await Setting.create(req.body);
    }

    res.status(200).send({ msg: 'settings successfully updated', setting });
  }),
];

export const get_setting = [
  asyncHandler(async (req, res, next) => {
    const setting = await Setting.findOne(
      { name: 'general' },
      { [req.query?.property]: 1 },
      {
        lean: { toObject: true },
      },
    );

    if (setting) {
      return res.status(200).send(setting);
    }

    res.status(404).send({ msg: 'not found' });
  }),
];
