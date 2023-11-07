/* eslint-disable import/prefer-default-export */
import asyncHandler from 'express-async-handler';
import User from '../Models/user.js';
import multer from 'multer';
import fileFilter from '../Upload/fileFilter.js';
import sharpify from '../Upload/sharpify.js';
import bcrypt from 'bcryptjs';
import s3Upload, { s3Delete } from '../s3Service.js';
import 'dotenv/config';
import { body, check, validationResult } from 'express-validator';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import dayjs from 'dayjs';
import passport from '../utils/passport.js';
const SALT_ROUNDS = process.env.SALT_ROUNDS;
dayjs.extend(utc);
dayjs.extend(timezone);
const handleProfilePhoto = async (file, id) => {
  if (file) {
    const compressImg = await sharpify(file, 'profile');
    compressImg.id = id;
    await s3Upload([compressImg], true);
    const profileImg = `${process.env.UPLOAD_URL}/user/${id}.${compressImg.format}`;
    const updateUser = await User.findByIdAndUpdate(
      id,
      { profileImg },
      { upsert: true, new: true },
    );

    console.log(updateUser);
  }
};

export const get_all_users = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).send(users);
});
// test
export const dummy_data = asyncHandler(async (req, res, next) => {
  const dummyUsers = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      dob: new Date('1990-01-15'),
      interest: 'Menswear',
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'janesmith@example.com',
      password: 'securepassword',
      dob: new Date('1985-05-20'),
      interest: 'Womenswear',
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
      password: 'mysecretpassword',
      dob: new Date('1995-09-10'),
      interest: 'Menswear',
    },
    {
      firstName: 'Ella',
      lastName: 'Brown',
      email: 'ella@example.com',
      password: 'mypassword123',
      dob: new Date('1988-11-30'),
      interest: 'Womenswear',
    },
  ];

  const bulkCreate = await User.insertMany(dummyUsers);
  res.send(bulkCreate);
});

export const delete_user = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  await s3Delete('user', id);
  res.status(200).json({
    msg: 'user Deleted',
    user,
  });
});
export const delete_many_user = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const idArr = id.split(',');
  const deleteUserImage = idArr.map((item) => {
    s3Delete('user', item);
  });

  const result = await Promise.all([
    User.deleteMany({ _id: idArr }),
    deleteUserImage,
  ]);
  res.status(200).send(result);
});

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 6 },
});

export const create_user = [
  upload.single('file'),
  asyncHandler(async (req, res, next) => {
    const { file } = req;

    const {
      password,
      firstName,
      lastName,
      dob,
      address,
      mobile,
      email,
      interest,
    } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      password: hashPassword,
      firstName,
      lastName,
      dob,
      address: [address],
      mobile,
      email,
      interest,
    });

    const { id } = user;

    await handleProfilePhoto(file, id);
    res.status(201).send(user);
  }),
];

export const signUp_user = [
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
  check('dob', 'Please enter an valid date').custom((value) => {
    const userDob = dayjs(value);
    const todayDate = dayjs();
    const difference = todayDate.diff(userDob, 'year');
    if (difference < 18) {
      throw new Error('You must be 18 or older to use Glamo.');
    }
    return true;
  }),
  asyncHandler(async (req, res, next) => {
    const { firstName, email, password, interest, lastname, dob } = req.body;
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const newResult = {};

      result.errors.map(({ path, msg }) => {
        newResult[path] = msg;
      });
      return res.status(400).send(newResult);
    }
    const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS));
    console.log({ salt });
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = await User.create({ ...req.body, password: hashPassword });

    res.status(200).send({ msg: 'user created', user });
  }),
];

export const get_single_user = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).send('User Not Found');
  } else {
    res.status(200).send(user);
  }
});

export const update_single = [
  upload.single('file'),
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { file } = req;

    console.log(req.body);
    const user = await User.updateOne({ _id: id }, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    await handleProfilePhoto(file, id);

    res.status(200).send(user);
  }),
];

export const loginUser = [
  check('email', 'Please enter a valid email address.')
    .trim()
    .isEmail()
    .custom(async (email) => {
      try {
        const result = await User.findOne({ email });

        if (!findUser) {
          throw new Error('User does not exist.');
        }

        return true;
      } catch (error) {}
    }),
  check(
    'password',
    'Please enter a valid password between 10 to 20 characters.',
  )
    .trim()
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 10, max: 20 }),
  asyncHandler(async (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const newResult = {};

      result.errors.map(({ path, msg }) => {
        newResult[path] = msg;
      });
      return res.status(400).send(newResult);
    }
    passport.authenticate('local', (err, user, info) => {
      console.log({ user });
      if (err) {
        next(err);
      }

      if (!user) {
        return res
          .status(400)
          .send({ password: 'The password is invalid. Please try again.' });
      }

      req.logIn(user, (error) => {
        if (error) {
          return next(err);
        }

        return res.status(200).redirect('/user/check');
      });
    })(req, res, next);
  }),
];

export const userLogout = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout();
  }

  return res.status(200).redirect('/user/check');
});

export const checkUser = asyncHandler(async (req, res, next) => {

  res
    .status(200)
    .send({ user: req.user, authenticated: req.isAuthenticated() });
});
