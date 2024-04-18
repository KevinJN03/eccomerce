import { model, Schema } from 'mongoose';

const variationOptionSchema = new Schema({
  stock: { type: Schema.Types.Number },
  price: { type: Schema.Types.Number },
  variation: { type: Schema.Types.String },
  variation2: { type: Schema.Types.String },
  visible: { type: Schema.Types.Boolean },
  id: { type: Schema.Types.String },
});
const variationSchema = new Schema(
  {
    name: { type: String },
    options: {
      type: Schema.Types.Map,
      of: variationOptionSchema,
    },
    default: Boolean,
    quantityHeader: Object,
    priceHeader: Object,
    combine: Schema.Types.Boolean,
    on: Boolean,
    name2: String,
  },
  { strict: false, virtuals: true },
);

variationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

variationSchema.set('toJSON', {
  virtuals: true,
});

export const productSchema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      maxlength: [140, 'Title must be under 140 characters'],
    },

    featured: { type: Schema.Types.Boolean, default: false },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
      required: true,
    },
    price: { type: Schema.Types.Mixed },
    stock: { type: Schema.Types.Number },
    gender: {
      type: Schema.Types.String,
      enum: {
        values: ['men', 'women'],
        message: ['{VALUE} is not support, only men or women is allowed'],
      },
    },
    description: {
      type: Schema.Types.String,
      required: true,
    },
    // detail: {
    //   type: Schema.Types.Array,
    //   required: true,
    //   maxlength: [400, 'Details must be under 200 characters'],
    // },

    variations: [variationSchema],
    images: { type: Schema.Types.Array, default: [] },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'product_review' }],
    delivery: { type: Schema.Types.ObjectId, ref: 'deliveryProfile' },
    timestamp: { type: Schema.Types.Date, default: Date.now },
    visits: { type: Schema.Types.Number, default: 0 },
    status: {
      type: Schema.Types.String,
      default: 'active',
      enum: {
        values: ['active', 'inactive', 'draft'],
        message: ['{VALUE} is not support, please inter a accepted type'],
      },
    },
  },
  {
    strict: false,
    toJSON: { virtuals: true },
  },
);

productSchema.virtual('id');


export default model('product', productSchema);
