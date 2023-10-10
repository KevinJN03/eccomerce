import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: Schema.Types.String,
    maxlength: [140, 'Title must be under 140 characters'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  price: { type: Schema.Types.Mixed },
  gender: {
    type: Schema.Types.String,
    enum: {
      values: ['men', 'women'],
      message: ['{VALUE} is not support, only men or women is allowed'],
    },
  },
  detail: {
    type: Schema.Types.Array,
    required: true,
    maxlength: [400, 'Details must be under 200 characters'],
  },
  color: [{ type: Schema.Types.String }],
  size: { type: Schema.Types.Array, default: [] },
  images: { type: Schema.Types.Array, default: [] },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'product_review' }],
  delivery: [{ type: Schema.Types.ObjectId, ref: 'deliveryProfile' }],
});

export default mongoose.model('product', productSchema);
