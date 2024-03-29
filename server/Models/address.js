import { Schema, model } from 'mongoose';

const AddressSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String, required: true },
  address_1: { type: Schema.Types.String, required: true },
  address_2: { type: Schema.Types.String },
  city: { type: Schema.Types.String, required: true },
  county: { type: Schema.Types.String },
  postCode: { type: Schema.Types.String, required: true, uppercase: true },
  mobile: { type: Schema.Types.String, required: true },
  country: { type: Schema.Types.String, required: true },
});

export default model('address', AddressSchema);
