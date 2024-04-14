import _ from 'lodash';
import mongoose, { Schema } from 'mongoose';

const chargeObj = {
  one_item: { type: Schema.Types.Number, default: 0, required: true },
  additional_item: { type: Schema.Types.Number, default: 0, required: true },
};

export const timeObj = (property) => {
  return {
    type: {
      type: Schema.Types.String,
      enum: {
        values: ['days', 'weeks'],
      },
      default: 'days',
    },

    start: {
      type: Schema.Types.Number,
      default: 1,
      required: [
        true,
        "You didn't enter a start day for your profile. Please enter a start date",
      ],
      validate: {
        validator: function (startValue) {
          const endValue = _.get(this, `${property}.end`);
          //  this.get('processing_time')?.end || this.get('shipping')?.end;

          console.log({
            startValue,
            endValue,
            check: startValue <= endValue,
            this: this,
          });

          return startValue <= endValue;
        },
        message: 'Your start day or week must be less than end day',
      },
    },
    end: {
      type: Schema.Types.Number,
      default: 1,
      required: [
        true,
        "You didn't enter a end day for your profile. Please enter an end date",
      ],
    },
  };
};

export const delivery_upgrades_fields = (property) => ({
  destination: {
    type: Schema.Types.String,
    lowercase: true,
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
    ...timeObj(property),
  },
});

const DeliveryProfileSchema = new Schema({
  timestamp: { type: Schema.Types.Date, default: Date.now },
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
    uppercase: true,
  },
  standard_delivery: [
    new Schema({
    
      destination: { type: Schema.Types.String, required: true },
      iso_code: { type: Schema.Types.String, required: true },
      charges: chargeObj,
      shipping: {
        service: { type: Schema.Types.String },
        ...timeObj('shipping'),
      },
    }),
  ],
  delivery_upgrades: [new Schema(delivery_upgrades_fields('shipping'))],
  processing_time: timeObj('processing_time'),
});

DeliveryProfileSchema.pre('updateOne', function (next) {
  this.options.runValidators = true;
  next();
});

// DeliveryProfileSchema.path('processing_time.start').validate(function (value) {
//   const time = this.get('processing_time');
//   return value < time.end;
// }, 'Your start day or week must be less than end day');

export default mongoose.model('deliveryProfile', DeliveryProfileSchema);
