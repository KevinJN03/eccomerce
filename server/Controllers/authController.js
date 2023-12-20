import express from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import 'dotenv/config';
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
          `${CLIENT_URL}/portal/social-sign-up/finaldetails?signin=${info}`,
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
export default router;
