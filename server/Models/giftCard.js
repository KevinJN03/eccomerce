import 'dotenv/config';
import mongoose from 'mongoose';
import { couponSchema } from './coupon';
import { decrypt, encrypt } from '../utils/encrypt-decrypt-giftcard';
import crypto from 'crypto';
import _ from 'lodash';
import dayjs from 'dayjs';
const { Schema } = mongoose;

const { GIFT_CARD_SALT } = process.env;
const GiftCardSchema = couponSchema.clone();

GiftCardSchema.add({
  hash_code: { type: Schema.Types.String }, // New property for gift cards
  applied: { type: Schema.Types.Boolean, default: false, required: true },
  email: { type: Schema.Types.String, required: true },
  redacted_code: { type: Schema.Types.String },
  balance: { type: Schema.Types.Number },
  customer: { type: Schema.Types.ObjectId },
  // audits: [
  //   {
  //     timestamp: { type: Schema.Types.Date, default: Date.now, required: true },
  //     msg: { type: Schema.Types.String, default: '', required: true },
  //   },
  // ],
});
GiftCardSchema.set('toJSON', { virtuals: true });
GiftCardSchema.set('toObject', { virtuals: true });

// GiftCardSchema.virtual('decryptedCode').get(function () {
//   const decryptedCode = decrypt(this.code);
//   const censoredText = `XXXX-XXXX-${decryptedCode.substring(10, 14)}-XXXX`;
//   return censoredText;
// });

GiftCardSchema.pre('save', function (next) {
  const encryptedText = encrypt(this.code);
  const hash = crypto.createHash('sha256').update(this.code).digest('hex');
  const redactPositions = [0, 5, 10, 15];
  const randomIndex = _.random(0, redactPositions.length - 1);
  const redacted_portion = this.code.substring(
    redactPositions[randomIndex],
    redactPositions[randomIndex] + 4,
  );
  const redacted_array = ['XXXX', 'XXXX', 'XXXX', 'XXXX'];
  redacted_array[randomIndex] = redacted_portion;
  this.redacted_code = redacted_array.join('-');
  this.code = encryptedText;
  this.hash_code = hash;
  this.emails_sent = 1;
  this.balance = this.amount;
  //this.start_date = dayjs().utc().unix();
  this.audits = [
    {
      msg: `Gift card generated and email sent to customer email address.`,
    },
  ];

  next();
});
GiftCardSchema.post('save', async (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error(`GiftCard ${doc.code} already Exists`));
  } else {
    next();
  }
});

export default mongoose.model('giftCard', GiftCardSchema);
