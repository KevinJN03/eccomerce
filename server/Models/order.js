import mongoose, { SchemaType } from 'mongoose';

const { Schema } = mongoose;
const enum_states = {
  values: ['received', 'shipped', 'delivered', 'cancelled', 'unpaid'],
  message:
    'enum validator failed value `VALUE`, please ensure value is of any of the following: received, shipped, delivered, cancelled',
};
const OrderSchema = new Schema({
  _id: { type: Schema.Types.String, required: true, unique: true },
  items: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'product' },
      quantity: { type: Schema.Types.Number },
      isVariation1Present: { type: Schema.Types.Boolean },
      isVariation2Present: { type: Schema.Types.Boolean },
      isVariationCombine: { type: Schema.Types.Boolean },
      variation1: { type: Schema.Types.Mixed },
      variation2: { type: Schema.Types.Mixed },
      price: { type: Schema.Types.Number },
    },
  ],
  createdAt: { type: Schema.Types.Date, default: Date.now },
  status: {
    type: Schema.Types.String,
    enum: enum_states,
    required: true,
    // default: 'recieved',
  },
  customer: { type: Schema.Types.ObjectId, ref: 'Users', required: true },

  shipping_address: {
    type: Schema.Types.Mixed,
  },
  billing_address: {
    type: Schema.Types.Mixed,
  },
  transaction_cost: {
    total: {
      type: Schema.Types.Number,
    },

    subtotal: {
      type: Schema.Types.Number,
    },
  },

  shipping_option: {
    cost: { type: Schema.Types.Number },
    delivery_date: { type: Schema.Types.String },
  },
  //   address: {
  //     type: Schema.Types.Mixed,
  //   },
  //   transaction_cost: { type: Schema.Types.Number },

  cartObj: { type: Schema.Types.Mixed, ref: 'product' },
});

export default mongoose.model('order', OrderSchema);
