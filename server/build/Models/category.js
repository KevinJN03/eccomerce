"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Schema = _mongoose["default"].Schema;
var CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // products: [{ type: Schema.Types.String }],
  men: [{
    type: Schema.Types.ObjectId,
    ref: 'product'
  }],
  women: [{
    type: Schema.Types.ObjectId,
    ref: 'product'
  }]
}, {
  strictPopulate: false
});
var _default = exports["default"] = _mongoose["default"].model('category', CategorySchema);