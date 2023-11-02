/* eslint-disable import/prefer-default-export */
import User from '../Models/user.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { body, check, validationResult } from 'express-validator';

export const count_all = asyncHandler(async (req, res, next) => {
  const userCount = await User.countDocuments();

  res.status(200).json({
    userCount,
  });
});

export const adminLogin = [
  check('email').custom(async (email) => {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      throw new Error("User doesn't exists.");
    }

    return true;
  }),
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const newResult = result.errors.map((item) => {
        return {
          [item.path]: item.msg,
        };
      });
      return res.status(404).send(...newResult);
    }

    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    console.log('match', match);

    res.status(200).send('login in successfully');
  }),
];
