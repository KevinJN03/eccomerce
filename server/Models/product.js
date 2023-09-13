import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: Schema.Types.String,
    maxlength: [100, 'Title must be under 100 characters'],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  price: { type: Schema.Types.Decimal128 },
  details: {
    type: Schema.Types.String,
    required: true,
    maxlength: [200, 'Details must be under 200 characters'],
  },
  color: [{ type: Schema.Types.ObjectId, required: true }],
  sizes: { type: Schema.Types.Array, default: [] },
  images: { type: Schema.Types.Array, default: [] },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'product_review' }],
});

export default mongoose.model('product', productSchema);
