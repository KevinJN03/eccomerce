import mongoose from 'mongoose';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import expressAsyncHandler from 'express-async-handler';
dayjs.extend(relativeTime);
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: 'First Name is required. Please enter your first Name.',
    },
    lastName: {
      type: String,
      required: 'Last Name is required. Please enter your Last Name.',
    },
    email: {
      type: String,
      required: 'Email is required. Please enter your Email.',
      unique: true,
    },
    password: { type: String, required: true, minlength: 10 },
    dob: {
      type: Date,
      required: 'DOB is required. Please enter date of birth.',
      // max: '2003-09-09',
      validate: {
        validator(v) {
          const today = dayjs();

          const difference = today.diff(dayjs(v), 'year');

          return difference >= 18;
        },
        message: 'Must be 18 years old or older.',
      },
    },
    interest: {
      type: String,
      enum: {
        values: ['menswear', 'womenswear'],
        message:
          '{VALUE} is not support, only Menswear or Womenswear is allowed.',
      },
      required: 'Interest is required. Please enter your Interest.',
    },
    profileImg: String,
    address: { type: Schema.Types.Array },
    mobile: { type: Schema.Types.String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
export default mongoose.model('Users', UserSchema);
