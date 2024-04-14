import mongoose from 'mongoose';

const { Schema } = mongoose;
const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const couponSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    min: [6, 'the coupon/gift card must be between 6 and 16 character'],
    max: [16, 'the coupon/gift card must be between 6 and 16 character'],
  },
  expires: { type: Schema.Types.Date, default: tomorrowDate },
  amount: { type: Schema.Types.Number, min: [5, 'amount must be at least 5'] },
  type: {
    type: Schema.Types.String,
    enum: ['fixed', 'percentage'],
    default: 'fixed',
  },
  total_use: { type: Schema.Types.Number, default: 5 },
});

couponSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error(`Coupon ${doc.code} already Exists`));
  } else {
    next();
  }
});
export default mongoose.model('coupon', couponSchema);
