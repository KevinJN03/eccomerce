import { Schema, Types, model } from 'mongoose';
import { delivery_upgrades_fields, timeObj } from './deliveryProfile';

const enum_states = {
  values: [
    'received',
    'shipped',
    'delivered',
    'cancelled',
    'returned',
    'processing',
    'failed',
  ],
  message:
    'enum validator failed value `VALUE`, please ensure value is of any of the following: received, shipped, delivered, cancelled, ',
};

const itemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'product' },
  quantity: { type: Schema.Types.Number },
  isVariation1Present: { type: Schema.Types.Boolean },
  isVariation2Present: { type: Schema.Types.Boolean },
  isVariationCombine: { type: Schema.Types.Boolean },
  variation1: { type: Schema.Types.Mixed },
  variation2: { type: Schema.Types.Mixed },
  price: { type: Schema.Types.Number },
  images: { type: [Schema.Types.String], maxlength: 1 },
  title: { type: Schema.Types.String },
});
const OrderSchema = new Schema({
  _id: { type: Schema.Types.String, required: true, unique: true },
  items: [itemSchema],
  itemsByProfile: [
    {
      items: [itemSchema],
      shippingInfo: {
        endDate: Schema.Types.Date,
        startDate: Schema.Types.Date,
        cost: Schema.Types.Number,
        _id: Schema.Types.ObjectId,
        profileId: Schema.Types.ObjectId,
        processing_time: timeObj('shippingInfo.processing_time'),

        shipping: {
          service: { type: Schema.Types.String },
          ...timeObj('shippingInfo.shipping'),
        },
        // ...delivery_upgrades_fields('shippingInfo.shipping'),
      },
    },
  ],
  createdAt: { type: Schema.Types.Date, default: Date.now },
  payment_type: { type: Schema.Types.String },
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
    promo: {
      discount: Schema.Types.Number,
      code: Schema.Types.String,
    },
    delivery_cost: Schema.Types.Number,
  },

  shipping_option: {
    cost: { type: Schema.Types.Number },
    // delivery_date: { type: Schema.Types.String },
    // name: { type: Schema.Types.String },
    // time: { type: Schema.Types.Number },
    // type: { type: Schema.Types.String },
    // id: { type: Schema.Types.ObjectId, ref: 'deliveryProfile' },
  },
  //   address: {
  //     type: Schema.Types.Mixed,
  //   },
  //   transaction_cost: { type: Schema.Types.Number },

  cartObj: { type: Schema.Types.Mixed, ref: 'product' },
  cartId: { type: Schema.Types.ObjectId, ref: 'cart' },

  trackingNumber: { type: Schema.Types.String },
  courier: { type: Schema.Types.String },
  payment_intent_id: { type: Schema.Types.String },
  refund_id: { type: Schema.Types.String },
  ship_date: { type: Schema.Types.Date },
  return_date: { type: Schema.Types.Date },
  cancel_date: { type: Schema.Types.Date },
  cancel: {
    reason: { type: Schema.Types.String },
    additional_information: { type: Schema.Types.String, maxlength: 500 },
  },
  private_note: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
      note: { required: true, type: Schema.Types.String },
      date: { required: true, type: Schema.Types.Date, default: Date.now },
    },
  ],
});

export default model('order', OrderSchema);
