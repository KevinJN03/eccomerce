import mongoose, { Schema, SchemaType } from 'mongoose';

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
  one_item: { type: Schema.Types.Number },
  additional_item: { type: Schema.Types.Number },
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
      _id: Schema.Types.ObjectId,
      destination: { type: Schema.Types.String },
      shipping_time: timeObj,
      charges: chargeObj,
      delivery_service: { type: Schema.Types.String },
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
      delivery_service: { type: Schema.Types.String },
      shipping_time: timeObj,
    },
  ],
  processingTime: timeObj,
});

DeliveryProfileSchema.pre('updateOne', function (next) {
  this.options.runValidators = true;
  next();
});

DeliveryProfileSchema.path('processingTime.start').validate(function (value) {
  const time = this.get('processingTime');
  return value < time.end;
}, 'Your start day or week must be less than end day');

DeliveryProfileSchema.post('save', async function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    return next(
      new Error(
        `There is already a delivery profile with name ${doc.code}. Please use another name!`,
      ),
    );
  }

  return next();
});

export default mongoose.model('deliveryProfile', DeliveryProfileSchema);
