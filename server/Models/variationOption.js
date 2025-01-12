import { model, Schema } from 'mongoose';

const variationOptionSchema = new Schema(
  {
    stock: {
      type: Schema.Types.Number,
      set: (value) => {
        if (value) {
          return parseFloat(value).toFixed(0);
        }
      },
    },
    price: {
      type: Schema.Types.Number,
      set: (value) => {
        if (value) {
          const parseValue = parseFloat(value).toFixed(2)
          
          return parseValue;
        }
        return;
      },
    },
    variation: { type: Schema.Types.String },
    variation2: { type: Schema.Types.String },
    visible: { type: Schema.Types.Boolean }, // may change to active instead of visible
    variation_id: { type: Schema.Types.ObjectId, required: true },
    //option_id: { type: Schema.Types.String, required: true },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
  },
  {
    virtuals: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

variationOptionSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

export default model('variationOption', variationOptionSchema);
