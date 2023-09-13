import mongoose from 'mongoose';

const { Schema } = mongoose;

const AddressSchema = new Schema({
  address_1: { type: Schema.Types.String, required: true },
  address_2: { type: Schema.Types.String, required: true },
  city: { type: Schema.Types.String, required: true },
  county: { type: Schema.Types.String },
  postCode: { type: Schema.Types.String, required: true },
  mobile: { type: Schema.Types.Number, required: true },
  country: { type: Schema.Types.String, required: true },
});

export default mongoose.model('address', AddressSchema);
