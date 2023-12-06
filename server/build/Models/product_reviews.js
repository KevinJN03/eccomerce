"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var ProductReviewSchema = new Schema({
  author: {
    type: Schema.Types.String,
    required: true
  },
  rating: {
    type: Schema.Types.Number,
    required: true
  },
  comment: {
    type: Schema.Types.String,
    required: true,
    minlength: [10, 'your review must be more than 10 characters long']
  }
});
var _default = exports["default"] = _mongoose["default"].model('product_review', ProductReviewSchema);