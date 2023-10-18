import { body, check, validationResult } from 'express-validator';

const customVariationValidator = (value, { req, next }) => {
  const { variations } = req.body;
  const parseVariation = JSON.parse(variations);
  console.log({ value });
  if (parseVariation.length > 0) {
    return true;
  }

  if (value) {
    return true;
  }

  return false;
};

const productValidator = [
  check('files').custom((value, { req }) => {
    if (req.files.length < 1) {
      throw new Error('Please add a photo.');
    }

    return true;
  }),
  body('title', 'Please add a title.').trim().escape().notEmpty(),

  body('category', 'Please select from one of the categories.')
    .trim()
    .escape()
    .notEmpty()
    .custom((value) => {
      if (value === 'undefined') {
        throw new Error();
      }

      return true;
    }),
  body('gender', 'Please select from one of the genders.')
    .trim()
    .escape()
    .notEmpty()
    .custom((value) => {
      if (value === 'undefined') {
        throw new Error();
      }

      return true;
    }),
  body('price', 'Please enter a valid price.')
    .trim()
    .escape()
    .custom(customVariationValidator),

  // .notEmpty(),
  body('stock', 'Please enter a valid stock.')
    .trim()
    .escape()
    .custom(customVariationValidator),

  // .notEmpty(),
  body('detail', 'Please add some details.')
    .trim()
    .escape()
    .isArray({ min: 1 })
    .custom(async (value) => {
      const everyValue = value.every((item) => item === '\n' || item === '');

      if (everyValue === true) {
        throw new Error();
      }
    }),
  body('delivery', 'Please add some delivery profiles.')
    .trim()
    .escape()
    .isArray({ min: 1 }),
];

export default productValidator;
