import TwitterStrategy from 'passport-twitter';
import User from '../../Models/user.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { myCache } from '../../app.js';
import { v4 as uuidv4 } from 'uuid';

const twitterStrategyOption = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: '/api/user/login/twitter/callback',
  includeEmail: true,
};

const verifyCallBack = async (token, tokenSecret, profile, cb) => {
  const email = profile.emails[0]?.value;
  const findUserByTwitterId = await User.findOne({
    'social_accounts.twitter': profile?.id,
  });

  if (findUserByTwitterId) {
    return cb(null, findUserByTwitterId);
  }

  const findUser = await User.findOne({ email });

  if (findUser) {
    await User.findOneAndUpdate(
      { email },
      { 'social_accounts.twitter': profile?.id },
    );
    return cb(null, findUser);
  }

  if (!findUserByTwitterId) {
    const fullName = profile.displayName.split(' ');

    const payload = {
      email,
      social_accounts: { twitter: profile?.id },
      lastName: fullName[1],
      firstName: fullName[0],
    };

    const jwtToken = jwt.sign(
      payload,
      process.env.OAUTH_REGISTRATION_JWT_SECRET,
      {
        expiresIn: '15m',
        algorithm: 'HS256',
      },
    );

    const id = uuidv4();
    const ttl = 15 * 60;
    myCache.set(id, jwtToken, ttl);

    return cb(null, null, id);
  }
};

const twitterStrategy = new TwitterStrategy.Strategy(
  twitterStrategyOption,
  verifyCallBack,
);

export default twitterStrategy;
