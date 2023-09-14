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
  detail: {
    type: Schema.Types.Array,
    required: true,
    maxlength: [400, 'Details must be under 200 characters'],
  },
  color: [{ type: Schema.Types.String }],
  size: { type: Schema.Types.Array, default: [] },
  images: { type: Schema.Types.Array, default: [] },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'product_review' }],
});

export default mongoose.model('product', productSchema);
