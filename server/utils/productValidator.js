import { body, check, validationResult } from 'express-validator';

function customVariationValidator({ value, minValue, maxValue, msg }) {

  const parseValue = JSON.parse(value.replace(/&quot;/g, '"'));

  if (!parseValue.on) return true;
  if (parseValue.on && !parseValue.value) return false;
  if (parseValue.value < minValue || parseValue.value > maxValue)
    throw new Error(msg);

  return true;
}

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
    .custom((value) =>
      customVariationValidator({
        value,
        minValue: 0.17,
        maxValue: 42933.2,
        msg: 'Price must be between £0.17 and £42,933.20.',
      }),
    ),

  body('isAllInputValid', 'Please enter a value in all inputs.').custom(
    (value) => {
      const parseValue = JSON.parse(value);
  
      // if (value) return true;
      // return false;
      return parseValue;
    },
  ),
  body('stock', 'Please enter a valid stock.')
    .trim()
    .escape()
    .custom((value) =>
      customVariationValidator({
        value,
        minValue: 0,
        maxValue: 999,
        msg: 'Quantity must be between 0 and 999.',
      }),
    ),

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
