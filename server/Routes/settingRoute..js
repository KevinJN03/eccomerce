/* eslint-disable import/prefer-default-export */
import express from 'express';
import urllib from 'urllib';
import 'dotenv/config.js';
import asyncHandler from 'express-async-handler';
import Setting from '../Models/setting';
import { check, validationResult } from 'express-validator';

const router = express.Router();

export const update_settings = [
  check('upgrade.full_name').escape().trim().notEmpty(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (errors.isEmpty()) {
      return res.status(404).send(errors.mapped());
    }
    const { name } = req.body;
    const setting = await Setting.updateOne({ name }, req.body, {
      upsert: true,
    });

    res.status(200).send({ msg: 'settings successfully updated' });
  }),
];

export const get_setting = [
  asyncHandler(async (req, res, next) => {
    const setting = await Setting.findOne({ name: 'general' });

    if (setting) {
      return res.status(200).send(setting);
    }

    res.status(404).send({ msg: 'not found' });
  }),
];
