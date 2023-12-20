import mongoose from 'mongoose';
const { Schema } = mongoose;

const OAuthSchema = new Schema({
  firstName: {
    type: Schema.Types.String,
    // required: 'First Name is required. Please enter your first Name.',
  },
  lastName: {
    type: Schema.Types.String,
    // required: 'Last Name is required. Please enter your Last Name.',
  },
  email: {
    type: Schema.Types.String,
    // required: 'Email is required. Please enter your Email.',
  },
  issuer: {
    type: Schema.Types.String,
  },
});
export default mongoose.model('oAuthUser', OAuthSchema);
