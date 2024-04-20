import { body, check, validationResult } from 'express-validator';
import _ from 'lodash';

function customVariationValidator({ value, minValue, maxValue, msg, checker }) {
  const parseValue = value;
  console.log({ checker, parseValue, value });

  if (checker) {
    return true;
  }

  if (parseValue < minValue || parseValue > maxValue || !parseValue) {
    console.log('error throwing');
    throw new Error(msg);
  }

  return parseValue;
}

const productValidator = [
  check('files').custom((value, { req }) => {
    console.log({ value });
    if (req.files.length < 1) {
      throw new Error('Please add at least one photo.');
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
    .isIn(['men', 'women']),
  body('price', 'Please enter a valid price.')
    .notEmpty()
    .trim()
    .escape()
    .toFloat()
    .optional({ nullable: true })
    .custom((value, { req }) => {
      const newVariation = _.map(req.body.variations, (array) =>
        JSON.parse(array),
      );

      return customVariationValidator({
        value,
        minValue: 0.17,
        maxValue: 42933.2,
        msg: 'Price must be between £0.17 and £42,933.20.',
        checker: _.some(newVariation, { priceHeader: { on: true } }),
      });
    }),
  body('stock', 'Please enter a valid stock.')
    .notEmpty()

    .trim()
    .escape()
    .toInt()
    .optional({ nullable: true })
    .custom((value, { req }) => {
      const newVariation = _.map(req.body.variations, (array) =>
        JSON.parse(array),
      );
      return customVariationValidator({
        value,
        minValue: 0,
        maxValue: 999,
        msg: 'Quantity must be between 0 and 999.',
        checker: _.some(newVariation, { quantityHeader: { on: true } }),
      });
    }),

  // .notEmpty(),

  body('description', 'Please Enter a description').escape().trim().notEmpty(),
  // body('detail', 'Please add some details.')
  //   .trim()
  //   .escape()
  //   .isArray({ min: 1 })
  //   .custom(async (value) => {
  //     const everyValue = value.every((item) => item === '\n' || item === '');

  //     if (everyValue === true) {
  //       throw new Error();
  //     }
  //   }),
  body('delivery', 'Add a delivery option to this listing')
    .trim()
    .notEmpty()
    .not()
    .equals('undefined')
    .escape(),

  // .custom((value) => {
  //   console.log({ delivery: value });

  //   return value;
  // }),
];

export default productValidator;
