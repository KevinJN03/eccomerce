import mongoose from 'mongoose';

const { Schema } = mongoose;

const variationObj = {
  title: Schema.Types.String,
  variationIndex: Schema.Types.Number,
  array: [
    {
      price: Schema.Types.Number,
      id: Schema.Types.String,
      visible: Schema.Types.Boolean,
      stock: Schema.Types.Number,
      variation: Schema.Types.String,
      variation2: Schema.Types.String,
    },
  ],
};

const ItemSchema = new Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   default: mongoose.Types.ObjectId,
  // },
  timestamp: { type: Schema.Types.Date, default: Date.now },
  cart_id: { type: Schema.Types.String },
  product_id: { type: Schema.Types.ObjectId, ref: 'products' },
  images: [],
  delivery: { type: Schema.Types.ObjectId, ref: 'deliveryProfile' },
  quantity: {
    type: Schema.Types.Number,
    default: 1,
    min: [1, 'Quantity should be equal to or greater than 1'],
  },
  price: {
    current: { type: Schema.Types.Number },
    previous: { type: Schema.Types.Number },
  },
  stock: Schema.Types.Number,
  shipping_data: {
    one_item: Schema.Types.Number,
    additional_item: Schema.Types.Number,
    cost: Schema.Types.Number,
    id: Schema.Types.String,
  },
  variation_data: {
    combineVariation: { type: Schema.Types.Mixed },
    isVariationCombine: { type: Schema.Types.Boolean },
    variation1_data: variationObj,
    variation2_data: variationObj,
    select: {
      variation1: {
        id: Schema.Types.String,
        title: Schema.Types.String,
        variation: Schema.Types.String,
      },
      variation2: {
        id: Schema.Types.String,
        title: Schema.Types.String,
        variation: Schema.Types.String,
      },
    },
  },

  status: Schema.Types.String,
  title: Schema.Types.String,
  additional_data: {
    price: { min: Schema.Types.Number, max: Schema.Types.Number },
    stock: {
      min: Schema.Types.Number,
      max: Schema.Types.Number,
      total: Schema.Types.Number,
    },
  },
});
export const cartSchema = new Schema({
  timestamp: { type: Schema.Types.Date, default: Date.now },
  delivery_option: Schema.Types.Mixed,

  items: [ItemSchema],
});

export default mongoose.model('cart', cartSchema);
