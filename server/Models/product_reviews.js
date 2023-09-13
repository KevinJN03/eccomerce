import mongoose from 'mongoose';

const { Schema } = mongoose;

const ProductReviewSchema = new Schema({
  author: { type: Schema.Types.String, required: true },
  rating: { type: Schema.Types.Number, required: true },
  comment: {
    type: Schema.Types.String,
    required: true,
    minlength: [10, 'your review must be more than 10 characters long'],
  },
});


export default mongoose.model('product_review', ProductReviewSchema)
