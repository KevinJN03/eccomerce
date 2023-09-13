import mongoose from 'mongoose';

const { Schema } = mongoose;
const GiftCardSchema = new Schema({
  code: {
    type: String,
    required: true,
    min: [6, 'the coupon/gift card must be between 6 and 16 character'],
    max: [16, 'the coupon/gift card must be between 6 and 16 character'],
  },
  expires: Schema.Types.Date,
  amount: {
    type: Schema.Types.Decimal128,
    min: [5, 'Gift Card moust be £5 or over'],
  },
});

export default mongoose.model('giftCard', GiftCardSchema);
