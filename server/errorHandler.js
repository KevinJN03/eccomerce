import { s3Delete } from './utils/s3Service.js';
import logger from './utils/logger.js';
const customValidationError = (error) => {
  const values = Object.values(error.errors).map((err) => err.message);
  // return Object.values(error).map(err => err.message)
  console.log(values);
  return values;
};

export default async function errorHandler(error, req, res, next) {
  try {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    console.log(error);

    logger.error(error, error.message);
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

    if (error.name == 'MulterError') {
      error.message =
        'Error occurs while adding or deleting images. Please contact Administrator for asssistance.';
    }

    if (error?.code == 'payment_method_provider_decline') {
      error.message =
        'A refund has already been processed for this transaction.';
    }
    res.status(500).json({
      // if js an array is ann object
      msg: typeof error.message === 'object' ? error.message : [error.message],
      success: false,
    });
  } catch (error) {
    res.status(500).json({
      // if js an array is ann object
      msg: ['request failed.'],
      success: false,
    });
  }
}
