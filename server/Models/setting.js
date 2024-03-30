import mongoose from 'mongoose';

const { Schema } = mongoose;

const SettingSchema = new Schema({
  name: { type: Schema.Types.String, unique: true },
  delivery: {
    full_name: { type: Schema.Types.String },
    address_1: { type: Schema.Types.String },
    address_2: { type: Schema.Types.String },
    city: { type: Schema.Types.String },
    county: { type: Schema.Types.String },
    post_code: { type: Schema.Types.String },
    phone_number: { type: Schema.Types.String },
    label_format: { type: Schema.Types.String },
    include_order_detail: { type: Schema.Types.Boolean },
    custom_form: {
      prefill_with_title: { type: Schema.Types.Boolean },
      description: { type: Schema.Types.String },
    },
    delivery_upgrades: { type: Schema.Types.Boolean },
    processing_schedule: {
      monday_friday: { type: Schema.Types.Boolean },
      saturday: { type: Schema.Types.Boolean },
      sunday: { type: Schema.Types.Boolean },
    },
  },
});

export default mongoose.model('Settings', SettingSchema);
