import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../Models/user.js';
import bcrypt from 'bcryptjs';

import _ from 'lodash';
const verifyCallback = async (email, password, cb) => {
  try {
    const findUser = await User.findOne({ email });

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
    console.log('error at passport: ', error);
    return cb(error);
  }
};

const verificationFields = {
  usernameField: 'email',
  passwordField: 'password',
};
const strategy = new LocalStrategy(verificationFields, verifyCallback);

passport.serializeUser((user, cb) => {
  return cb(null, user.id);
});

passport.deserializeUser(async (userId, cb) => {
  console.log({ userId });
  try {
    const findUser = await User.findById(userId, { password: 0 });
    return cb(null, findUser);
  } catch (error) {
    return cb(error);
  }
});

passport.use(strategy);
export default passport;
