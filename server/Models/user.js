import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  interest: {
    type: String,
    enum: {
      values: ['Menswear', 'Womenswear'],
      message: '{VALUE} is not support, only Menswear or Womenswear is allowed',
    },
    required: true,
  },
});

export default mongoose.model('Users', UserSchema);
