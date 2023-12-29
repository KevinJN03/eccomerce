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

const productSchema = new Schema(
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
  },
  {
    strict: false,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

productSchema.virtual('id');

// productSchema
//   .virtual('minVariationPrice', { localField: 'id', foreignField: 'id' })
//   .get(function () {
//     let minVariationPrice = 10000000;
//     const variations = this.variations;
//     variations.map((item) => {
//       if (item.priceHeader.on) {
//         const { options } = item;
//         for (const [key, value] of options) {
//           minVariationPrice = Math.min(minVariationPrice, value?.price);
//         }
//       }
//     });

//     if (minVariationPrice == 10000000) {
//       return null;
//     }
//     return parseFloat(minVariationPrice).toFixed(2);
//   });
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
