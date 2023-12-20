import passport from 'passport';
import LocalStrategy from 'passport-local';
import GoogleStrategy from 'passport-google-oidc';
// import GoogleAuthStrategy from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import _ from 'lodash';
import User from '../Models/user.js';
import oAuthUser from '../Models/oAuthUser.js';
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

const googleStrategyOption = {
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/api/user/login/google/callback',
  scope: ['profile', 'email'],
};
// const googleVerifyCallBack = async (accessToken, refreshToken, profile, cb) => {
const googleVerifyCallBack = async (issuer, profile, cb) => {
  const email = profile.emails[0]?.value;
  console.log(profile, { email });

  const findUser = await User.findOne({ email });

  if (findUser) {
    cb(null, findUser);
  }

  if (!findUser) {
    const newUser = await oAuthUser.create({
      email,
      issuer: 'google',
      lastName: profile.name?.familyName,
      firstName: profile.name?.givenName,
    });
    cb(null, null, newUser?._id);
  }
};

// const GoogleStrategy = GoogleAuthStrategy.Strategy;
const googleStrategy = new GoogleStrategy(
  googleStrategyOption,
  googleVerifyCallBack,
);

passport.serializeUser((user, cb) => {
  return cb(null, user.id);
});

passport.deserializeUser(async (userId, cb) => {
  try {
    const findUser = await User.findById(userId, {
      password: 0,
      dob: 0,
      address: 0,
      __v: 0,
    });

    const newResult = findUser.toObject({ virtuals: false });

    delete newResult._id;
    return cb(null, newResult);
  } catch (error) {
    return cb(error);
  }
});

passport.use(strategy);
passport.use(googleStrategy);
export default passport;
