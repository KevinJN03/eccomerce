/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import asyncHandler from 'express-async-handler';
import randomstring from 'randomstring';
import GiftCard from '../Models/giftCard.js';
import Voucherify from 'voucher-code-generator';
import _ from 'lodash';
import { check, validationResult } from 'express-validator';
import endDateValidator from '../utils/endDateValidator.js';
export const create_giftCard = [
  check('amount', 'Must be equal to or greater than 5')
    .escape()
    .trim()
    .isInt({ min: 5 }),

  check('email', 'Enter the recipient email address')
    .escape()
    .trim()
    .notEmpty()
    .isEmail(),

  endDateValidator(),
  asyncHandler(async (req, res, next) => {
    // const { code, amount, type } = req.body;

    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return res.status(400).send(errors.mapped());
    }

    if (req.body?.create) {
      const giftCard = (await GiftCard.create(req.body)).toObject();

      return res.send({ ...giftCard, created: true });
    }

    // const giftCard = await GiftCard.create({ code, amount, type });

    //return res.status(200).send(giftCard);
    return res.send({ msg: 'passed validation' });
  }),
];

export const get_all_giftCard = asyncHandler(async (req, res, next) => {
  const giftCard = await GiftCard.find();

  return res.status(200).send(giftCard);
});

export const get_single_giftCard = asyncHandler(async (req, res, next) => {
  let { code } = req.query;
  code = code.toUpperCase();

  if (code.substring(0, 3) != 'GL-') {
    code = `GL-${code}`;
  }
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

export const generate_new_code = asyncHandler(async (req, res, next) => {
  const newCode = Voucherify.generate({
    // length: 16,
    pattern: '####-####-####-####',
    // charset: 'alphanumeric',
  });

  // randomstring.generate({
  //   length: 16,
  //   charset: ['GL-', 'alphanumeric'],
  //   capitalization: 'uppercase',
  // });

  res.send({ code: _.toUpper(newCode[0]), success: true });
});
