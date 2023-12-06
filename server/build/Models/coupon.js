"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
var couponSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
    min: [6, 'the coupon/gift card must be between 6 and 16 character'],
    max: [16, 'the coupon/gift card must be between 6 and 16 character']
  },
  expires: {
    type: Schema.Types.Date,
    "default": tomorrowDate
  },
  amount: Schema.Types.Mixed,
  type: {
    type: Schema.Types.String,
    "default": 'fixed'
  },
  total_use: {
    type: Schema.Types.Number,
    dafault: 5
  }
});
couponSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new Error("Coupon ".concat(doc.code, " already Exists")));
  } else {
    next();
  }
});
var _default = exports["default"] = _mongoose["default"].model('coupon', couponSchema);