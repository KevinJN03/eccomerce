"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var AddressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  firstName: {
    type: Schema.Types.String,
    required: true
  },
  lastName: {
    type: Schema.Types.String,
    required: true
  },
  address_1: {
    type: Schema.Types.String,
    required: true
  },
  address_2: {
    type: Schema.Types.String
  },
  city: {
    type: Schema.Types.String,
    required: true
  },
  county: {
    type: Schema.Types.String
  },
  postCode: {
    type: Schema.Types.String,
    required: true,
    uppercase: true
  },
  mobile: {
    type: Schema.Types.String,
    required: true
  },
  country: {
    type: Schema.Types.String,
    required: true
  }
});
var _default = exports["default"] = _mongoose["default"].model('address', AddressSchema);