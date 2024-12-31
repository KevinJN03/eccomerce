import { check } from 'express-validator';
import User from '../Models/user';
import dayjs from 'dayjs';

const userValidators = [
  check('email', 'Please enter a valid email address.')
    .trim()
    .escape()
    .notEmpty()
    .custom(async (value) => {
      const findUser = await User.findOne({ email: value });

      if (findUser) {
        throw new Error(
          'User Already Exists. Please try using a different email address.',
        );
      }
      return true;
    }),

  check('password', 'Password must be between 10 to 20 characters.')
    .trim()
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 10, max: 20 }),
  check('firstName', 'Please enter an valid first name.')
    .trim()
    .escape()
    .notEmpty(),
  check('lastName', 'Please enter an valid last name.')
    .trim()
    .escape()
    .notEmpty(),
  check('email', 'Please enter a valid email.')
    .trim()
    .escape()
    .notEmpty()
    .isEmail(),
  check('dob', 'Please enter an valid date')
    .notEmpty()
    .withMessage('Please enter an valid date')
    .bail() // Stops further validation if this fails
    .custom((value) => {
      const userDob = dayjs(value);
      const todayDate = dayjs();
      const difference = todayDate.diff(userDob, 'year');
      if (difference < 18) {
        throw new Error('You must be 18 or older to use Glamo.');
      }
      return true;
    }),
  check('interest', 'Interest is required. Please enter your Interest.')
    .notEmpty()
    .isIn(['menswear', 'womenswear']),
];

export default userValidators;
