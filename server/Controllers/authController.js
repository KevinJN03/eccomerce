import express from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import 'dotenv/config';
import OAuthUser from '../Models/oAuthUser';
import userValidators from '../utils/userValidators';
import { validationResult } from 'express-validator';
const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL;
router.get('/login/google', passport.authenticate('google'));
// router.get(
//   '/login/failed',
//   asyncHandler((req, res, next) => {
//     res.status(401).send({ success: false, msg: 'login failed' });
//   }),
// );

//   {
//     successRedirect: `/api/user/check`,
//     failureRedirect: `/api/user/check`,
//   }
router.get(
  '/login/google/callback',
  asyncHandler((req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        next(err);
      }

      if (user) {
        return req.logIn(user, (error) => {
          if (error) {
            return next(err);
          }
          return res.redirect(`${CLIENT_URL}`);
        });
      }

      if (info) {
        console.log({ info });
        res.redirect(
          `${CLIENT_URL}/portal/social-register/finaldetails?signin=${info}`,
        );
      }
    })(req, res, next);
  }),
);
router.get(
  '/login/test',
  asyncHandler((req, res, next) => {
    res.send({ success: true, msg: 'test pass' });
  }),
);

router.get(
  '/oauth/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const user = await OAuthUser.findOne({ _id: id }, null, {
      lean: { toObject: true },
    });

    if (!user) {
      return res.status(404).json({ success: false, msg: 'record not found' });
    }
    res.json({ success: true, user });
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

    res.send({ success: true });
  }),
]);
export default router;
