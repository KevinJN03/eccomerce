/* eslint-disable import/prefer-default-export */
import User from '../Models/user.js';
import asyncHandler from 'express-async-handler';

export const count_all = asyncHandler(async (req, res, next) => {
  const userCount = await User.countDocuments();

  res.status(200).json({
    userCount,
  });
});


