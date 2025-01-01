import { model, Schema } from 'mongoose';

const variationOptionSchema = new Schema({
    stock: { type: Schema.Types.Number },
    price: { type: Schema.Types.Number },
    variation: { type: Schema.Types.String },
    variation2: { type: Schema.Types.String },
    visible: { type: Schema.Types.Boolean }, // may change to active instead of visible
    variationId: {type: Schema.Types.ObjectId, required: true}
  }, {
    virtuals: true, toJSON: {virtuals: true} , toObject:{virtuals: true}
  });
  
  variationSchema.virtual('id').get(function () {
    return this._id.toHexString();
  });
  
  
  export default model('variationOption', variationOptionSchema);