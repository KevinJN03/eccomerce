import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';
import User from '../Models/user';
import jwt from 'jsonwebtoken';
import PasswordReset from '../React Email/emails/passwordreset.jsx';
import 'dotenv/config';
import transporter from '../utils/nodemailer';
import bcrypt from 'bcryptjs';
import logger from '../utils/logger.js';
import { render } from '@react-email/render';
import * as React from 'react';
const { CLIENT_URL, PASSWORD_RESET_JWT_SECRET, SENDER, SALT_ROUNDS } = process.env;
export const forgetPassword = [
  check('email', 'Email is Invalid.')
    .trim()
    .escape()
    .isEmail()
    .custom(async (value, { req }) => { 
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error(
          "Email Address doesn't exist, please check the email for any typos.",
        );
      } else {
        req.password = user.password;
        return true;
      }
    }),
  asyncHandler(async (req, res, next) => {
    const errorFormatter = ({ msg, path }) => {
      return msg;
    };
    const results = validationResult(req).formatWith(errorFormatter);

    if (!results.isEmpty()) {
      // console.log('validationError: ', results.mapped());

      return res.status(404).send({ error: results.mapped() });
    }
    const { email } = req?.body;
    console.log('here: ', { password: req.password });

    const newSecret = PASSWORD_RESET_JWT_SECRET + req.password;

    const payload = {
      id: req.password,
      email: email,
    };
    const token = jwt.sign(payload, newSecret, { expiresIn: '15m' });
    const url = `${CLIENT_URL}/portal/reset-password?pwrt=${token}&email=${email}`;

    const emailHtml = render(<PasswordReset url={url} />);
    const mailOptions = {
      from: SENDER,
      to: email,
      subject: 'Your GLAMO password reset link is ready',
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    logger.info(
      req.body,
      'Password reset link generated and email sent to user ',
    );
    return res.status(200).send({
      success: true,
      msg: 'password link successfully generated and sent to user email.',
    });
  }),
];

export const resetPassword = [
  check('password', 'Password must be between 8 to 50 characters.')
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 50 }),
  check('confirmPassword')
    .trim()
    .custom((value, { req }) => {
      if (value != req.body.password) {
        throw new Error('passwords does not match.');
      } else {
        return true;
      }
    }),
  check('email').trim().escape(),
  check('token').trim().escape(),
  asyncHandler(async (req, res, next) => {
    try {
      const results = validationResult(req).formatWith(({ msg }) => msg);

      if (!results.isEmpty()) {
        console.log({ error: results.mapped() });
        return res.status(400).send({ error: results.mapped() });
      }
      const { token, email, password, confirmPassword } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .send({ success: false, msg: 'user does not exist.' });
      }
      const getSecret = PASSWORD_RESET_JWT_SECRET + user.password;
      const payload = jwt.verify(token, getSecret);

      if (payload?.email != email) {
        return res.status(404).send({ success: false, msg: 'invalid' });
      }

      const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS));
      const hashPassword = bcrypt.hashSync(confirmPassword, salt);
      user.password = hashPassword;
      user.save();
      logger.info(user, 'Password reset successful ');

      res.send({ success: true, msg: 'password successfully updated!' });
    } catch (error) {
      console.error('invalid jwt', error);
      logger.warn(error, error.message);

      let expired = false;
      let invalid = false;
      if (error?.name == 'TokenExpiredError') {
        expired = true;
      }
      if (error?.name == 'JsonWebTokenError') {
        invalid = true;
      }
      res.status(500).send({ expired, invalid });
    }
  }),
];
