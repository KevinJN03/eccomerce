import mongoose from 'mongoose';

const { Schema } = mongoose;
const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    min: [6, 'the coupon/gift card must be between 6 and 16 character'],
    max: [16, 'the coupon/gift card must be between 6 and 16 character'],
  },
  expires: Date,
  amount: Schema.Types.Mixed,
  type: Schema.Types.String,
  total_use: Schema.Types.Number,
});
export default mongoose.model('coupon', couponSchema);
