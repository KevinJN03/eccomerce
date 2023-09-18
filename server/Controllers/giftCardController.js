/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import asyncHandler from 'express-async-handler';

import GiftCard from ' ../Models/giftCard.js';

export const create_giftCard = asyncHandler(async (req, res, next) => {


    const giftCard = await giftCard.create({})
});
