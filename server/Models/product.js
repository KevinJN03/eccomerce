import mongoose, { SchemaType } from 'mongoose';

const { Schema } = mongoose;

const variationSchema = new Schema(
  {
    name: { type: String },
    options: { type: Schema.Types.Map },
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
    detail: {
      type: Schema.Types.Array,
      required: true,
      maxlength: [400, 'Details must be under 200 characters'],
    },
    // color: [{ type: Schema.Types.String }],
    // size: { type: Schema.Types.Array, default: [] },
    variations: [variationSchema],
    images: { type: Schema.Types.Array, default: [] },
    reviews: [{ type: Schema.Types.ObjectId, ref: 'product_review' }],
    delivery: [{ type: Schema.Types.ObjectId, ref: 'deliveryProfile' }],
    timestamp: { type: Schema.Types.Date, default: Date.now },
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
/*  toObject: { virtuals: true },
    , */
productSchema.virtual('id');

// productSchema.virtual('additional_data').get(function () {
//   const data = { minPrice: [], minStock: [] };
//   const { variations, id } = this;
//   console.log({ variations, id });
//   variations.map(({ options, priceHeader, quantityHeader }) => {
//     if (priceHeader.on) {
//       for (const [key, value] of options) {
//         data.minPrice.push(value.price);
//       }
//     }
//     if (quantityHeader.on) {
//       for (const [key, value] of options) {
//         data.minStock.push(value.stock);
//       }
//     }
//   });

//   return 'hi';
// });
// productSchema.virtual('isSizePresent').get(function () {
//   const variations = this.variations;

//   let isPresent = false;

//   variations.map((variation) => {
//     if (variation.name == 'Size') {
//       isPresent = true;
//     }
//   });

//   return isPresent;
// });

// productSchema.virtual('isColorPresent').get(function () {
//   const variations = this.variations;

//   let isPresent = false;

//   variations.map((variation) => {
//     if (variation.name == 'Colour') {
//       isPresent = true;
//     }
//   });

//   return isPresent;
// });
export default mongoose.model('product', productSchema);
