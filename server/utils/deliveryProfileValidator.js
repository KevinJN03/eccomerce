/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
import { check } from 'express-validator';
import _, { isEmpty, isNull } from 'lodash';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
const generateChecks = ({ property }) => {
  return [
    check(`${property}`, 'Select a delivery service')
      .isArray()
      .custom((value, { req }) => {
        const resultObj = {};
        let isAllClear = true;

        for (const element of value) {
          const checks = { shipping: false, charges: false };
          if (!_.has(element, 'shipping.service') && !checks.shipping) {
            resultObj[element._id] = {
              ...resultObj[element._id],
              shipping: 'Select a delivery service',
            };

            isAllClear = false;
            checks.shipping = true;
          }

          if (!_.has(element, 'element.start') && !checks.shipping) {
            resultObj[element._id] = {
              ...resultObj[element._id],
              shipping: 'Select a shipping timeframe start.',
            };
            checks.shipping = true;
          }
          if (!_.has(element, 'element.end') && !checks.shipping) {
            resultObj[element._id] = {
              ...resultObj[element._id],
              shipping: 'Select a shipping timeframe end.',
            };
            checks.shipping = true;
          }

          if (!_.has(element, 'element.type') && !checks.shipping) {
            resultObj[element._id] = {
              ...resultObj[element._id],
              shipping: 'Select a shipping timeframe type.',
            };
            checks.shipping = true;
          }

          if (
            (!_.has(element, 'charges') ||
              !_.has(
                element,
                'charges.one_item' ||
                  !_.has(element, 'charges.additional_item'),
              )) &&
            !checks.charges
          ) {
            resultObj[element._id] = {
              ...resultObj[element._id],
              charges: 'Select how much you want you charge',
            };
            checks.charges = true;
          }

          ['one_item', 'additional_item'].forEach((prop) => {
            if (
              element?.charges?.[prop] < 0 ||
              element?.charges?.[prop] > 15865.4
            ) {
              resultObj[element._id] = {
                ...resultObj[element._id],
                [prop]: `Price must be between £0.00 and £15,865.40.`,
              };
            }
          });

          if (element?.charges?.one_item < element?.charges?.additional_item) {
            resultObj[element._id] = {
              ...resultObj[element._id],
              additional_item: `Price can't be greater than the One item price.`,
            };
          }
        }

        if (isAllClear) {
          return true;
        }
        throw new Error(JSON.stringify(resultObj));
      }),

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
  check('country_of_origin', 'Select a Country your dispatching from.')
    .escape()
    .trim()
    .notEmpty(),
  check('name', 'Profile name must be between 1 and 128 characters.')
    .escape()
    .trim()
    .isLength({ min: 1, max: 128 }),

  check('origin_post_code', 'Enter a valid postal code')
    .escape()
    .trim()
    .isLength({ min: 1 })
    .custom((value, { req }) => {
      const { country_of_origin } = req.body;

      console.log(country_of_origin, value);
      if (
        postcodeValidatorExistsForCountry(country_of_origin) &&
        !postcodeValidator(value?.toUpperCase(), country_of_origin)
      ) {
        return false;
      }
      return true;
    }),

  check('processing_time').custom((value) => {
    const resultObj = {};
    if (isEmpty(value) || !value?.start || !value?.end) {
      resultObj.general = 'Select a processing time';
      throw Error(JSON.stringify(resultObj));
    }

    if (value?.start > value?.end) {
      resultObj.start = `Start ${
        value?.type || 'timeframe'
      } cant be greater than end ${value?.type || 'timeframe'}.`;

      throw Error(JSON.stringify(resultObj));
    }

    return value;
  }),

  ...generateChecks({ property: 'standard_delivery' }),
  ...generateChecks({ property: 'delivery_upgrades' }),
];

export default deliveryProfileValidator;
