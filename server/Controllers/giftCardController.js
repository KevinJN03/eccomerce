/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import 'dotenv/config';
import * as React from 'react';
import asyncHandler from 'express-async-handler';
import randomstring from 'randomstring';
import GiftCard from '../Models/giftCard.js';
import Voucherify from 'voucher-code-generator';
import _ from 'lodash';
import { check, validationResult } from 'express-validator';
import endDateValidator from '../utils/endDateValidator.js';
import GiftCardSend from '../React Email/emails/giftcard/GiftCardSend.jsx';
import transporter from '../utils/nodemailer.js';
import { renderAsync } from '@react-email/render';
import crypto from 'crypto';
import { decrypt, hashCode } from '../utils/encrypt-decrypt-giftcard.js';
import { rmSync } from 'fs';
import dayjs from 'dayjs';
const { SENDER } = process.env;

export const get_all_giftCard = asyncHandler(async (req, res, next) => {
  const giftCard = await GiftCard.find();

  return res.status(200).send(giftCard);
});

export const get_single_giftCard = asyncHandler(async (req, res, next) => {
  const { code } = req.query;
  const codeToUpperCase = _.toUpper(code);
  const hashCode = crypto
    .createHash('sha256')
    .update(codeToUpperCase)
    .digest('hex');
  const giftCard = await GiftCard.findOne({ hash_code: hashCode });

  if (giftCard) {
    // giftCard.code = decrypt(giftCard.code);
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
  const generateCode = async (success = false) => {
    if (!req.body?.create) {
      return next();
    }
    if (!success) {
      const newCode = Voucherify.generate({
        pattern: '####-####-####-####',
        // charset: 'alphanumeric',
      });
      const codeToUpperCase = _.toUpper(newCode[0]);
      const findCode = await GiftCard.exists({ code: codeToUpperCase });
      if (findCode) {
        return generateCode(false);
      } else {
        return codeToUpperCase;
      }
    }
  };

  const gift_card_code = await generateCode(false);

  req.body.code = gift_card_code;
  next();
  // res.send({ code: gift_card_code });
});

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
  generate_new_code,
  asyncHandler(async (req, res, next) => {
    const { code, amount, end_date } = req.body;
    const errors = validationResult(req).formatWith(({ msg }) => msg);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.mapped());
    }
    if (req.body?.create) {
      const giftCard = (await GiftCard.create(req.body)).toObject();

      const emailHtml = await renderAsync(
        <GiftCardSend {...{ amount, code, end_date }} />,
      );

      const mailOptions = {
        from: SENDER,
        to: req.body.email,
        subject: `🎁 Surprise! Your Glamo Gift Card is Here!`,
        html: emailHtml,
      };
      await transporter.sendMail(mailOptions);
      return res.send({ ...giftCard, created: true });
    }
    // const giftCard = await GiftCard.create({ code, amount, type });
    //return res.status(200).send(giftCard);
    return res.send({ msg: 'passed validation', body: req.body });
  }),
];

export const resendEmail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const giftCard = await GiftCard.findById(id, null, {
    lean: { toObject: true },
  });

  if (giftCard) {
    giftCard.code = decrypt(giftCard.code);
  }
  const emailHtml = await renderAsync(<GiftCardSend {...giftCard} />);

  const mailOptions = {
    from: SENDER,
    to: giftCard.email,
    subject: `🎁 Surprise! Your Glamo Gift Card is Here!`,
    html: emailHtml,
  };
  await transporter.sendMail(mailOptions);
  await GiftCard.findByIdAndUpdate(
    id,
    {
      $inc: { emails_sent: 1 },
      $push: {
        audits: {
          $each: [
            {
              msg: 'Gift card email resent to customer email address.',
            },
          ],
          $position: 0,
        },
      },
    },
    {
      lean: { toObject: true },
    },
  );

  res.send({ msg: 'email resent', success: true });
});

export const saveGiftCard = [
  check('code', 'Enter a valid voucher code')
    .escape()
    .trim()
    .isLength({ min: 19, max: 19 })
    .custom(async (value, { req }) => {
      const hash_code = hashCode(value);
      const gift_card = await GiftCard.findOne({ hash_code }, null, {
        lean: { toObject: true },
      });

      if (!gift_card) {
        throw new Error('A voucher with this code does not exist.');
      }
      if (gift_card.customer) {
        console.log({ req: req.user, customer: gift_card.customer });
        throw new Error(
          `This voucher has already been applied to ${
            req.user._id?.equals(gift_card.customer) ? 'your' : 'an'
          } account.`,
        );
      }

      return value;
    }),
  asyncHandler(async (req, res, next) => {
    const { code } = req.body;

    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (!errors.isEmpty()) {
      return res.status(404).send(errors.mapped());
    }
    const hash_code = hashCode(code);
    console.log({ code, user: req.user._id, hashCode });

    const gift_card = await GiftCard.findOneAndUpdate(
      { hash_code },
      {
        customer: req.user._id,
        added: dayjs().toDate(),
        $push: {
          audits: {
            $each: [
              {
                msg: 'Gift card added to an account',
              },
            ],
            $position: 0,
          },
        },
      },
      {
        new: true,
        lean: { toObject: true },
      },
    );

    res.send({ code, gift_card });
  }),
];

export const getAllUserGiftCards = [
  check('limit').escape().trim().toInt(),
  check('page').escape().trim().toInt(),

  asyncHandler(async (req, res, next) => {
    const { page, limit } = req.query;
    const count = await GiftCard.countDocuments({ customer: req.user._id });
    const skip = (page - 1) * limit;
    const pipeline = [
      {
        $match: { customer: req.user._id },
      },
      {
        $sort: { added: -1, _id: 1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          amount: 1,
          redacted_code: 1,
          balance: 1,
          end_date: 1,
          timestamp: 1,
        },
      },
     
    ];

    const result = await GiftCard.aggregate(pipeline);
    res.send({ vouchers: result, count });
  }),
];
