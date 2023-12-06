"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var MainCategory = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'category'
  }]
});
var _default = exports["default"] = _mongoose["default"].model('mainCategory', MainCategory);