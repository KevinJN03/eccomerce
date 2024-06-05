import passport from 'passport';
import User from '../../Models/user.js';
import strategy from './localStrategy.js';
import googleStrategy from './googleStrategy.js';
import facebookStrategy from './facebookStrategy.js';
import twitterStrategy from './twiiterStrategy.js';
import logger from '../logger.js';

passport.serializeUser((user, cb) => {

  return cb(null, user._id?.toString());
});

passport.deserializeUser(async (userId, cb) => {
  try {
    const findUser = await User.findById(
      userId,
      {
        email: 1,
        firstName: 1,
        lastName: 1,
        interest: 1,
        _id: 1,
        id: 1,
        // adminAccess: 1,
        // password: 0,
        // dob: 0,
        // address: 0,
        // __v: 0,
      },
      { lean: { toObject: true } },
    );

    return cb(null, findUser);
  } catch (error) {
    logger.error(error);
    return cb(error);
  }
});

passport.use(strategy);
passport.use(googleStrategy);
passport.use(facebookStrategy);
passport.use(twitterStrategy);
export default passport;
