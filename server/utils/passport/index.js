import passport from 'passport';
import User from '../../Models/user.js';
import googleStrategy from './googleStrategy.js';
import facebookStrategy from './facebookStrategy.js';
import twitterStrategy from './twiiterStrategy.js';
import logger from '../logger.js';
import UserModel from '../../Models/user.js';
import localStrategy from './localStrategy.js';

passport.use(localStrategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);
passport.use(twitterStrategy);

passport.serializeUser((user, cb) => {
  const userId =user._id.toString()
  return cb(null, userId);
});

passport.deserializeUser(async (userId, cb) => {
  try {
    const findUser = await User.findById(
      userId,
      {
        email: 1,
        firstName: 1,
        lastName: 1,
        //interest: 1,
        _id: 1,
        id: 1,
        // social_accounts: 1,
        // default_address: 1,
        // contact_preferences: 1,
        // adminAccess: 1,
        // password: 0,
        //dob: 1,
        // address: 0,
        // __v: 0,
      },
      { lean: { toObject: true } },
    );
    // console.log({ findUser });
    return cb(null, findUser);
  } catch (error) {
    logger.error(error);
    return cb(error);
  }
});


export default passport;
