import bcrypt from 'bcryptjs';
import LocalStrategy from 'passport-local';
import User from '../../Models/user.js';
// delete 
const verifyCallback = async (email, password, cb) => {
  try {
    const findUser = await User.findOne({ email }, null, {lean: {toObject: true}});

    if (!findUser) {
      return cb(null, false);
    }
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      return cb(null, false);
    }

    if (match) {
      return cb(null, findUser);
    }
  } catch (error) {
    return cb(error);
  }
};

const verificationFields = {
  usernameField: 'email',
  passwordField: 'password',
};
const localStrategy = new LocalStrategy.Strategy(verificationFields, verifyCallback);

export default localStrategy;
