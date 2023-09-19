/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import asyncHandler from 'express-async-handler';

import GiftCard from '../Models/giftCard.js';

export const create_giftCard = asyncHandler(async (req, res, next) => {
  const { code, amount, type } = req.body;

  const giftCard = await GiftCard.create({ code, amount, type });

  return res.status(200).send(giftCard);
});

export const get_all_giftCard = asyncHandler(async (req, res, next) => {
  const giftCard = await GiftCard.find();

  return res.status(200).send(giftCard);
});

export const get_single_giftCard = asyncHandler(async (req, res, next) => {
  let { code } = req.query;
  code = code.toUpperCase();
  const giftCard = await GiftCard.findOne({ code });

  if (giftCard) {
    return res.status(200).send(giftCard);
  } else {
    const error = new Error('Gift Card Not Found');
    error.statusCode = 404;
    return next(error);
  }
});

export const delete_single = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const giftCard = await GiftCard.findByIdAndDelete({ _id: id });

  res.status(200).json({
    msg: `Gift Card ${giftCard.code} successfully deleted.`,
    giftCard,
  });
});

export const delete_all = asyncHandler(async (req, res, next) => {
  const allGiftcards = await GiftCard.find();
  const onlyIds = allGiftcards.map((giftCard) => {
    const { id } = giftCard;
    return id;
  });

  console.log(onlyIds);
  const giftCard = await GiftCard.deleteMany({ _id: onlyIds });

  res.status(200).json({
    msg: `Gift Card ${giftCard.code} successfully deleted.`,
    giftCard,
  });
});
