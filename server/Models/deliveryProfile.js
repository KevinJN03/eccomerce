import mongoose, { Schema } from 'mongoose';

const DeliveryProfileSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [
      true,
      "You didn't provide a name for your delivery profile. Please enter a name",
    ],
    unique: true,
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
      validate: {
        validator: function (x) {
          return x < this.processingTime.end;
        },
        message: 'Your start day must be less than end day',
      },
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

DeliveryProfileSchema.post('save', async (error, doc, next) => {
  // console.log('error here: ', error.errors['processingTime.end'].message);
  // console.log(error);

  if (error.name === 'MongoServerError' && error.code === 11000) {
    return next(
      new Error(
        `There is already a delivery profile with name ${doc.code}. Please use another name!`,
      ),
    );
  }

  next();
});
export default mongoose.model('deliveryProfile', DeliveryProfileSchema);
