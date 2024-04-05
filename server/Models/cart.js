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
    },
  ],
};
const cartSchema = new Schema({
  timestamp: { type: Schema.Types.Date, default: Date.now },

  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'products' },
      images: [],
      delivery: { type: Schema.Types.ObjectId, ref: 'deliveryProfile' },
      quantity: { type: Schema.Types.Number, default: 1 },
      price: {
        current: { type: Schema.Types.Number },
        previous: { type: Schema.Types.Number },
      },
      shipping: {
        one_item: Schema.Types.Number,
        additional_item: Schema.Types.Number,
        cost: Schema.Types.Number,
        id: Schema.Types.String,
      },
      variation_data: {
        combineVariation: { type: Schema.Types.Boolean },
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
    },
  ],
});

export default mongoose.model('cart', cartSchema);
