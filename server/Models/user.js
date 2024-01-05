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
    lastEmailChange: {
      type: Schema.Types.Date,
    },
    password: { type: String, required: true, minlength: 10 },
    dob: {
      type: Date,
      required: 'DOB is required. Please enter date of birth.',
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
    address: [{ type: Schema.Types.ObjectId, ref: 'address' }],

    default_address: {
      shipping_address: { type: Schema.Types.ObjectId, ref: 'address' },
      billing_address: { type: Schema.Types.ObjectId, ref: 'address' },
    },
    payment_methods: [
      {
        logo: { type: Schema.Types.String },
        alt: { type: Schema.Types.String },
        description: { type: Schema.Types.String },
        text: { type: Schema.Types.String },
        index: { type: Schema.Types.Number },
      },
    ],
    // orders: [{ type: Schema.Types.String, ref: 'order' }],
    mobile: { type: Schema.Types.String },
    adminAccess: { type: Schema.Types.Boolean, default: false },
    contact_preferences: {
      discount_newDrops: {
        email: { type: Schema.Types.Boolean, default: false },
        text: { type: Schema.Types.Boolean, default: false },
      },
      stockAlert: {
        email: { type: Schema.Types.Boolean, default: false },
      },
    },
    social_accounts: {
      google: { type: Schema.Types.String },
      twitter: { type: Schema.Types.String },
      facebook: { type: Schema.Types.String },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

UserSchema.path('dob').validate({
  validator: function (value) {
    const today = dayjs();

    const difference = today.diff(dayjs(value), 'year');

    return difference >= 18;
  },
  message: 'Must be 18 years old or older.',
});
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export default mongoose.model('Users', UserSchema);
