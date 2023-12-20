import mongoose from 'mongoose';
const { Schema } = mongoose;

const OAuthSchema = new Schema({
  firstName: {
    type: Schema.Types.String,
  },
  lastName: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
  },
  issuer: {
    type: Schema.Types.String,
  },
  timeStamp: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});
export default mongoose.model('oAuthUser', OAuthSchema);
