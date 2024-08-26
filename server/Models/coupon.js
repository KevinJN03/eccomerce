import mongoose from 'mongoose';

const { Schema } = mongoose;
const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
export const couponSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    min: [6, 'the coupon/gift card must be between 6 and 16 character'],
    max: [16, 'the coupon/gift card must be between 6 and 16 character'],
  },
  // expires: { type: Schema.Types.Date, default: tomorrowDate },
  amount: {
    type: Schema.Types.Number,
    min: [5, 'amount must be at least 5'],
  },
  type: {
    type: Schema.Types.String,
    enum: ['fixed', 'percentage'],
    default: 'fixed',
  },
  // total_use: { type: Schema.Types.Number, default: 5 },
  uses: {
    type: Schema.Types.Number,
    default: 0,
  },

  emails_sent: {
    type: Schema.Types.Number,
    default: 0,
  },
  order_minimum: {
    type: Schema.Types.String,
    enum: ['none', 'number_of_items', 'order_total'],
    default: 'none',
  },
  minimum_value: {
    type: Schema.Types.Number,
  },
  start_date: { type: Schema.Types.Number },
  end_date: { type: Schema.Types.Number },
  no_end_date: { type: Schema.Types.Boolean },
  listings: { type: Schema.Types.Array },
  listings_type: {
    type: Schema.Types.String,
    enum: ['all', 'select'],
    default: 'all',
  },
  timestamp: { type: Schema.Types.Date, default: Date.now },
  offer_type: {
    type: Schema.Types.String,
    default: 'promo_code',
    required: true,
  },
  active: { type: Schema.Types.Boolean, default: true, required: true },
  audits: [
    {
      timestamp: { type: Schema.Types.Date, default: Date.now, required: true },
      msg: { type: Schema.Types.String, default: '', required: true },
    },
  ],
});

couponSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error(`Coupon ${doc.code} already Exists`));
  } else {
    next();
  }
});
export default mongoose.model('coupon', couponSchema);
