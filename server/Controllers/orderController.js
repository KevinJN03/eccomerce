import asyncHandler from 'express-async-handler';

import { validationResult, check } from 'express-validator';

export const create_order = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  res.status(200).send('success');
});
