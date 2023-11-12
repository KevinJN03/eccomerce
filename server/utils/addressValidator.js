import { body, check, validationResult } from 'express-validator';

const addressValidator = [
  check('firstName', 'Please enter a name').trim().escape().notEmpty(),
  check('lastName', 'Please enter a name').trim().escape().notEmpty(),
  check('mobile', 'Please enter a mobile number').trim().escape().notEmpty(),
  check('address_1', 'Please enter a address').trim().escape().notEmpty(),
  check('city', 'Please enter a city').trim().escape().notEmpty(),
  check('postCode', 'Please enter a postcode').trim().escape().notEmpty(),
  check('county', 'Please enter a county').trim().escape().notEmpty(),
];

export default addressValidator;
