import bcrypt from 'bcryptjs';
import GoogleStrategy from 'passport-google-oidc';
import User from '../../Models/user.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';

import { myCache } from '../../app.js';
import { v4 as uuidv4 } from 'uuid';
const googleStrategyOption = {
  clientID: process.env['GOOGLE_CLIENT_ID'],
  clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
  callbackURL: '/api/user/login/google/callback',
  scope: ['profile', 'email'],
};

const googleVerifyCallBack = async (issuer, profile, cb) => {
  const email = profile.emails[0]?.value;

  const findUserByGoogleId = await User.findOne({
    'social_accounts.google': profile?.id,
  });

  if (findUserByGoogleId) {
    return cb(null, findUserByGoogleId);
  }
  const findUser = await User.findOne({ email });

  if (findUser) {
    await User.findOneAndUpdate(
      { email },
      { 'social_accounts.google': profile?.id },
    );
    return cb(null, findUser);
  }

  if (!findUser) {
    const payload = {
      email,
      social_accounts: { google: profile?.id },
      lastName: profile.name?.familyName,
      firstName: profile.name?.givenName,
    };

    const token = jwt.sign(
      payload,
      process.env['OAUTH_REGISTRATION_JWT_SECRET'],
      { expiresIn: '15m', algorithm: 'HS256' },
    );

    const id = uuidv4();
    const ttl = 15 * 60;
    myCache.set(id, token, ttl);

    return cb(null, null, id);
  }
};

const googleStrategy = new GoogleStrategy(
  googleStrategyOption,
  googleVerifyCallBack,
);

export default googleStrategy;
