import mongoose, { Schema } from 'mongoose';

const timeObj = {
  type: {
    type: Schema.Types.String,
    enum: {
      values: ['days', 'weeks'],
    },
    default: 'days',
  },
  start: {
    type: Schema.Types.Number,
    required: [
      true,
      "You didn't enter a start day for your profile. Please enter a start date",
    ],
  },
  end: {
    type: Schema.Types.Number,
    required: [
      true,
      "You didn't enter a end day for your profile. Please enter an end date",
    ],
  },
};

const chargeObj = {
  one_item: { type: Schema.Types.Number, default: 0, required: true },
  additional_item: { type: Schema.Types.Number, default: 0, required: true },
};
const DeliveryProfileSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [
      true,
      "You didn't provide a name for your delivery profile. Please enter a name",
    ],
    unique: [true, 'err'],
  },
  cost: Schema.Types.Number,

  country_of_origin: {
    type: Schema.Types.String,
  },
  origin_post_code: {
    type: Schema.Types.String,
  },
  standard_delivery: [
    {
      _id: {
        type: Schema.Types.ObjectId,
      
      },
      destination: { type: Schema.Types.String, required: true },
      iso_code: { type: Schema.Types.String, required: true },
      charges: chargeObj,
      shipping: {
        service: { type: Schema.Types.String },
        ...timeObj,
      },
    },
  ],
  delivery_upgrades: [
    {
      destination: {
        type: Schema.Types.String,
        enum: {
          values: ['domestic', 'international'],
        },
      },
      upgrade: {
        type: Schema.Types.String,
        required: true,
        minlength: 1,
        maxlength: 28,
      },
      charges: chargeObj,
      shipping: {
        service: { type: Schema.Types.String },
        ...timeObj,
      },
    },
  ],
  processing_time: timeObj,
});

DeliveryProfileSchema.pre('updateOne', function (next) {
  this.options.runValidators = true;
  next();
});

DeliveryProfileSchema.path('processing_time.start').validate(function (value) {
  const time = this.get('processing_time');
  return value < time.end;
}, 'Your start day or week must be less than end day');

export default mongoose.model('deliveryProfile', DeliveryProfileSchema);
