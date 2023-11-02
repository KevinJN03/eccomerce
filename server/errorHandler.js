import { s3Delete } from './s3Service.js';

const customValidationError = (error) => {
  const values = Object.values(error.errors).map((err) => err.message);
  // return Object.values(error).map(err => err.message)
  console.log(values);
  return values;
};

export default async function errorHandler(error, req, res, next) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ success: false, msg: 'Invalid Id format' });
  }

  if (error.name === 'MongoServerError' && error.code == 11000) {
    const key = Object.values(error.keyValue);

    error.message = `${key[0]} already exists. Please try A different ${
      Object.keys(error.keyValue)[0]
    }.`;
  }

  if (error.name === 'ValidationError') {
    error.message = customValidationError(error);
  }
  console.log(error.message);
  if (error.name == 'MulterError') {
    error.message =
      'Error occurs while adding or deleting images. Please contact Administrator for asssistance.';
  }
  res.status(error.statusCode).json({
    // if js an array is ann object
    msg: typeof error.message === 'object' ? error.message : [error.message],
    success: false,
  });
}
