const customValidationError = (error) => {
  const values = Object.values(error.errors).map((err) => err.message);
  // return Object.values(error).map(err => err.message)
  console.log(values);
  return values;
};

export default function errorHandler(error, req, res, next) {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ success: false, msg: 'Invalid Id format' });
  }

  if (error.name === 'ValidationError') {
    error.message = customValidationError(error);
  }
  res.status(error.statusCode).json({
    // if js an array is ann object
    msg: typeof error.message === "object" ? error.message : [error.message],
    success: false,
  });
}
