/* eslint-disable import/prefer-default-export */
import asyncHandler from 'express-async-handler';
import User from '../Models/user.js';
import multer from 'multer';
import fileFilter from '../Upload/fileFilter.js';
import sharpify from '../Upload/sharpify.js';
import bcrypt from 'bcryptjs';
import s3Upload from '../s3Service.js';

const handleProfilePhoto = async (file, id) => {
  if (file) {
    const compressImg = await sharpify(file, 'profile');
    compressImg.id = id;
    await s3Upload([compressImg], 'profile');
    const profileImg = `https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/user/${id}.${compressImg.format}`;
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

  res.status(200).json({
    msg: 'user Deleted',
    user,
  });
});
export const delete_many_user = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const idArr = id.split(',');
  const user = await User.deleteMany({ _id: idArr });
  res.send(user);
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
