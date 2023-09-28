/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import multer from 'multer';
import { Readable } from 'stream';
import sharp from 'sharp';
import s3Upload from './s3Service.js';
import productRoute from './Routes/productRoute.js';
import categoryRoute from './Routes/categoryRoute.js';
import couponRoute from './Routes/couponRoute.js';
import searchRoute from './Routes/searchRoute.js';
import giftCardRoute from './Routes/giftCardRoute.js';
import userRoute from './Routes/userRoute.js';
import adminRoute from './Routes/adminRoute.js';
// import sharp from 'sharp';
import fileFilter from './Upload/fileFilter.js';
import sharpify from './Upload/sharpify.js';
import errorHandler from './errorHandler.js';
const { DBNAME, URL } = process.env;

const db = () => {
  mongoose
    .connect(URL, { dbName: DBNAME })
    .then(() => {
      console.log('successfully database Connection');
    })
    .catch((error) => {
      console.log(`error: ${error}`);
    });
};
db();

const app = express();
const PORT = 3000;
app.use(morgan('dev'));
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/server-status', (req, res) => {
  res.send('OK');
});
app.use('/product', productRoute);
app.use('/coupon', couponRoute);
app.use('/category', categoryRoute);
app.use('/search', searchRoute);
app.use('/giftcard', giftCardRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);
const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.split('/')[0] === 'image') {
//     cb(null, true);
//   } else {
//     cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'), false);
//   }
// };
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 6 },
});

// const sharpify = async (originalFile) => {
//   try {
//     const image = sharp(originalFile.buffer);
//     const meta = await image.metadata();
//     const { format } = meta;
//     const config = {
//       webp: { quality: 80 },
//     };
//     const newFile = await image[format](config[format])
//       .resize({
//         width: 1000,
//         withoutEnlargement: true,
//       })
//       .toBuffer();
//     return newFile;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// const sharpify = async (file) => {
//   const compressedFile = await sharp(file.buffer)
//     .toFormat('webp')
//     .webp({ quality: 80, force: true })
//     .toBuffer();
//   let newName = file.originalname.split('.');
//   newName.pop();
//   newName = newName.toString().concat('.webp');
//   console.log(newName);
//   const newFile = {
//     originalname: newName,
//     buffer: compressedFile,
//   };
//   console.log('new file: ', newFile);
//   console.log('oldfile', file);
//   return newFile;
// };
app.post('/upload', upload.array('file'), async (req, res) => {
  try {
    const newFile = await sharpify(req.files[0]);

    // console.log("req.file",await req.files)
    // const compressFiles = await req.files.map(async (file) => {
    //   console.log(file.buffer);
    //   const compressed = await sharp(file).webp({ quality: 20 }).toFile('test');
    //   console.log(compressed);
    //   return compressed;
    // });

    // console.log('compressfiles', await compressFiles);
    const results = await s3Upload([newFile]);

    return res.json({ status: 'success', results });
  } catch (err) {
    return console.log(err);
  }
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on Port: ${PORT}`);
});
