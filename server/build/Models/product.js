"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var Schema = _mongoose["default"].Schema;
var variationSchema = new Schema({
  name: {
    type: String
  },
  options: {
    type: Schema.Types.Map
  },
  "default": Boolean,
  quantityHeader: Object,
  priceHeader: Object,
  combine: Schema.Types.Boolean,
  on: Boolean,
  name2: String
}, {
  strict: false,
  virtuals: true
});
variationSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
variationSchema.set('toJSON', {
  virtuals: true
});
var productSchema = new Schema({
  title: {
    type: Schema.Types.String,
    maxlength: [140, 'Title must be under 140 characters']
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true
  },
  price: {
    type: Schema.Types.Mixed
  },
  stock: {
    type: Schema.Types.Number
  },
  gender: {
    type: Schema.Types.String,
    "enum": {
      values: ['men', 'women'],
      message: ['{VALUE} is not support, only men or women is allowed']
    }
  },
  detail: {
    type: Schema.Types.Array,
    required: true,
    maxlength: [400, 'Details must be under 200 characters']
  },
  // color: [{ type: Schema.Types.String }],
  // size: { type: Schema.Types.Array, default: [] },
  variations: [variationSchema],
  images: {
    type: Schema.Types.Array,
    "default": []
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'product_review'
  }],
  delivery: [{
    type: Schema.Types.ObjectId,
    ref: 'deliveryProfile'
  }]
}, {
  strict: false,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
});
productSchema.virtual('id');
productSchema.virtual('minVariationPrice', {
  localField: 'id',
  foreignField: 'id'
}).get(function () {
  var minVariationPrice = 10000000;
  var variations = this.variations;
  variations.map(function (item) {
    if (item.priceHeader.on) {
      var options = item.options;
      var _iterator = _createForOfIteratorHelper(options),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];
          minVariationPrice = Math.min(minVariationPrice, value === null || value === void 0 ? void 0 : value.price);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  });
  if (minVariationPrice == 10000000) {
    return null;
  }
  return parseFloat(minVariationPrice).toFixed(2);
});
productSchema.virtual('isSizePresent').get(function () {
  var variations = this.variations;
  var isPresent = false;
  variations.map(function (variation) {
    if (variation.name == 'Size') {
      isPresent = true;
    }
  });
  return isPresent;
});
productSchema.virtual('isColorPresent').get(function () {
  var variations = this.variations;
  var isPresent = false;
  variations.map(function (variation) {
    if (variation.name == 'Colour') {
      isPresent = true;
    }
  });
  return isPresent;
});
var _default = exports["default"] = _mongoose["default"].model('product', productSchema);