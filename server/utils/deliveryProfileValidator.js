import { check } from 'express-validator';
import { isEmpty, isNull } from 'lodash';

const generateChecks = ({ property }) => {
  return [
    check(`${property}.*.shipping`, 'Select a delivery service').custom(
      (value, { req }) => {
        if (isEmpty(value?.service)) {
          return false;
        }

        if (isEmpty(value?.start)) {
          throw Error('Select a shipping timeframe start.');
        }
        if (isEmpty(value?.end)) {
          throw Error('Select a shipping timeframe end.');
        }

        if (isEmpty(value?.type)) {
          throw Error('Select a shipping timeframe type.');
        }

        return true;
      },
    ),

    check(`${property}.*.charges`, 'Select shipping charges').custom(
      (value) => {
        console.log({ value });

        // console.log({ additional_item: isNaN(value?.additional_item) });

        if (value?.additional_item > value?.one_item) {
          throw new Error(`Price can't be greater than the One item price.`);
        }
        return true;

      },
    ),

    // check(`${property}.charges.additional_item`, 'Select a delivery service')
    //   .escape()
    //   .trim()
    //   .notEmpty(),
    // check(`${property}.destination`, 'add a destination')
    //   .escape()
    //   .trim()
    //   .notEmpty(),
    // check(`${property}.iso_code`, 'add a destination')
    //   .escape()
    //   .trim()
    //   .notEmpty(),
  ];
};
const deliveryProfileValidator = [
  check('name', 'Profile name must be between 1 and 128 characters.')
    .escape()
    .trim()
    .isLength({ min: 1, max: 128 }),

  check('origin_post_code', 'Enter a valid postal code')
    .escape()
    .trim()
    .isLength({ min: 1 }),

  check('processing_time').custom((value) => {
    if (isEmpty(value) || isEmpty(value?.start) || isEmpty(value?.end)) {
      throw Error('Select a processing time');
    }

    return value;
  }),

  ...generateChecks({ property: 'standard_delivery' }),
  ...generateChecks({ property: 'delivery_upgrades' }),
];

export default deliveryProfileValidator;
