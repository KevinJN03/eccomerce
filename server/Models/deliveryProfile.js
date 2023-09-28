import mongoose, { Schema } from 'mongoose';

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
  processingTime: {
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
  },
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
