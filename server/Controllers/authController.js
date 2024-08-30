import express from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import 'dotenv/config';
import OAuthUser from '../Models/oAuthUser';
import userValidators from '../utils/userValidators';
import { check, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../Models/user';
import { myCache } from '../app';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';
import { checkAuthenticated } from '../middleware/checkAuthenticated';

const router = express.Router();

const { CLIENT_URL, OAUTH_REGISTRATION_JWT_SECRET, SALT_ROUNDS, STRIPE_KEY } =
  process.env;
const stripe = Stripe(STRIPE_KEY);
router.get('/login/google', passport.authenticate('google'));
router.get('/login/facebook', passport.authenticate('facebook'));
router.get('/login/twitter', passport.authenticate('twitter'));

const authenticateUser = (provider) => {
  return asyncHandler((req, res, next) => {
    let redirectPath = 'portal/redirect';

    if (req.isAuthenticated()) {
      redirectPath = 'my-account/social-accounts';
    }
    passport.authenticate(provider, (err, user, info) => {
      if (err) {
        next(err);
      }

      if (user) {
        return req.logIn(user, (error) => {
          if (error) {
            return next(err);
          }
          return res.redirect(`${CLIENT_URL}/${redirectPath}`);
        });
      }
      console.log({ info });
      if (info) {
        res.redirect(
          `${CLIENT_URL}/portal/social-register/finaldetails?signin=${info}`,
        );
      }
    })(req, res, next);
  });
};

router.get('/login/twitter/callback', authenticateUser('twitter'));

router.get('/login/facebook/callback', authenticateUser('facebook'));
router.get('/login/google/callback', authenticateUser('google'));

router.get(
  '/oauth/:id',
  asyncHandler(async (req, res, next) => {
    try {
      const { id } = req.params;

      const value = myCache.get(id);

      if (!value) {
        return res.status(400).send({
          error: {
            general:
              'Failed to register your social account as the time to register has passed.',
          },
        });
      }
      const payload = await jwt.verify(value, OAUTH_REGISTRATION_JWT_SECRET);

      res.json({ success: true, user: payload });
    } catch (error) {
      res.status(500).send({ error: { general: error.message } });
    }
  }),
);

router.post('/ouath/user', [
  userValidators,
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req).formatWith(({ msg }) => msg);
    console.log(req.body);
    if (!result.isEmpty()) {
      return res.status(400).send({ success: false, error: result.mapped() });
    }
    const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS));

    const hashPassword = bcrypt.hashSync(req.body?.password, salt);
    const user = await User.create({ ...req.body, password: hashPassword });
    await stripe.customers.create({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    });
    myCache.del(req.body.key);
    return req.logIn(user, (error) => {
      if (error) {
        return next(err);
      }

      return res.redirect('/api/user/check');
    });
    // res.send({ success: true });
    // return res.redirect('/api/user/check');
  }),
]);

router.post('/oauth/disconnect', [
  checkAuthenticated,
  check('account').trim().escape(),
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const userId = req.user._id;
    const user = await User.findOneAndUpdate(
      userId,
      {
        $unset: { [`social_accounts.${req.body?.account}`]: '' },
      },
      {
        select: { social_accounts: 1 },
        lean: {
          toObject: true,
        },
        new: true,
      },
    );
    console.log({ user });
    res.status(200).send({
      success: true,
      msg: 'account deleted',
      social_accounts: user?.social_accounts,
    });
  }),
]);
export default router;
