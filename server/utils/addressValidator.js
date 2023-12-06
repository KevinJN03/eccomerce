import { body, check, validationResult } from 'express-validator';
import {
  postcodeValidator,
  postcodeValidatorExistsForCountry,
} from 'postcode-validator';
const addressValidator = [
  check('firstName', 'Please enter a name').trim().escape().notEmpty(),
  check('lastName', 'Please enter a name').trim().escape().notEmpty(),
  check('mobile', 'Please enter a mobile number').trim().escape().notEmpty(),
  check('address_1', 'Please enter a address').trim().escape().notEmpty(),
  check('city', 'Please enter a city').trim().escape().notEmpty(),
  check('postCode', 'Please enter a postcode')
    .trim()
    .escape()
    .notEmpty()
    .custom((value, { req }) => {
      console.log({ value, body: req.body });

      const isCountryValidatorExist = postcodeValidatorExistsForCountry(
        req.body?.country,
      );

      if (isCountryValidatorExist) {
        const isPostCodeValid = postcodeValidator(value, req.body?.country);

        if (!isPostCodeValid) {
          throw new Error('Invalid post code');
        } else {
          return true;
        }
      } else {
        return true;
      }
    }),
  check('county', 'Please enter a county').trim().escape().notEmpty(),
];

export default addressValidator;
