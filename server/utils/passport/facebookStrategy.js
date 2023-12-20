import FacebookStrategy from 'passport-facebook';
import User from '../../Models/user.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { myCache } from '../../app.js';
import { v4 as uuidv4 } from 'uuid';

const facebookStrategyOption = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: '/api/user/login/facebook/callback',
  state: true,
};

const verifyCallBack = async (accessToken, refreshToken, profile, cb) => {
  console.log({ profile });
  //   const email = profile.emails[0]?.value;
  const findUserByFacebookId = await User.findOne({
    'social_accounts.facebook': profile?.id,
  });

  if (findUserByFacebookId) {
    return cb(null, findUserByFacebookId);
  }
  //   const findUser = await User.findOne({ email });

  //   if (findUser) {
  //     await User.findOneAndUpdate(
  //       { email },
  //       { 'social_accounts.facebook': profile?.id },
  //     );
  //     return cb(null, findUser);
  //   }

  if (!findUserByFacebookId) {
    const payload = {
      //   email,
      social_accounts: { facebook: profile?.id },
      lastName: profile.name?.familyName,
      firstName: profile.name?.givenName,
    };

    const token = jwt.sign(payload, process.env.OAUTH_REGISTRATION_JWT_SECRET, {
      expiresIn: '15m',
      algorithm: 'HS256',
    });

    const id = uuidv4();
    const ttl = 15 * 60;
    myCache.set(id, token, ttl);

    return cb(null, null, id);
  }
};

const facebookStrategy = new FacebookStrategy(
  facebookStrategyOption,
  verifyCallBack,
);

export default facebookStrategy;
