import asyncHandler from 'express-async-handler';

import { validationResult, check } from 'express-validator';

export const create_order = asyncHandler(async (req, res, next) => {
  res.status(404).send('success');
});
