import mongoose from 'mongoose';
import { couponSchema } from './coupon';
const { Schema } = mongoose;

const GiftCardSchema = couponSchema.clone();

// new Schema({
//   code: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: [6, 'the coupon/gift card must be between 6 and 16 character'],
//     maxlength: [16, 'the coupon/gift card must be between 6 and 16 character'],
//   },
//   expires: Schema.Types.Date,
//   amount: {
//     type: Schema.Types.Number,
//     min: [5, 'Gift Card must be £5 or over'],
//   },

//   type: {
//     type: Schema.Types.String,
//     enum: ['fixed', 'percentage'],
//     default: 'fixed',
//   },
// });

// GiftCardSchema.pre('save', async function (next) {
//   this.code = this.code.toUpperCase();
//   if (this.code.substring(0, 3) != 'gl-'.toUpperCase()) {
//     this.code = `GL-${this.code}`;
//     return next();
//   } else {
//     next();
//   }
// });

GiftCardSchema.post('save', async (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error(`GiftCard ${doc.code} already Exists`));
  } else {
    next();
  }
});
export default mongoose.model('giftCard', GiftCardSchema);
