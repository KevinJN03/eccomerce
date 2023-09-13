import mongoose, { SchemaType } from 'mongoose';

const { Schema } = mongoose;
const enum_states = {
  values: ['pending', 'shipped', 'delivered', 'cancelled'],
  message:
    'enum validator failed value `VALUE`, please ensure value is of any of the following: pending, shipped, delivered, cancelled',
};
const OrderSchema = new Schema({
  items: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  createdAt: { type: Schema.Types.Date, default: Date.now },
  status: { type: Schema.Types.String, enum: enum_states, required: true },
});

export default mongoose.model('order', OrderSchema);
