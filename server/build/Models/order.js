"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Schema = _mongoose["default"].Schema;
var enum_states = {
  values: ['received', 'shipped', 'delivered', 'cancelled', 'processing'],
  message: 'enum validator failed value `VALUE`, please ensure value is of any of the following: received, shipped, delivered, cancelled, '
};
var OrderSchema = new Schema({
  _id: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'product'
    },
    quantity: {
      type: Schema.Types.Number
    },
    isVariation1Present: {
      type: Schema.Types.Boolean
    },
    isVariation2Present: {
      type: Schema.Types.Boolean
    },
    isVariationCombine: {
      type: Schema.Types.Boolean
    },
    variation1: {
      type: Schema.Types.Mixed
    },
    variation2: {
      type: Schema.Types.Mixed
    },
    price: {
      type: Schema.Types.Number
    }
  }],
  createdAt: {
    type: Schema.Types.Date,
    "default": Date.now
  },
  status: {
    type: Schema.Types.String,
    "enum": enum_states,
    required: true
    // default: 'recieved',
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  shipping_address: {
    type: Schema.Types.Mixed
  },
  billing_address: {
    type: Schema.Types.Mixed
  },
  transaction_cost: {
    total: {
      type: Schema.Types.Number
    },
    subtotal: {
      type: Schema.Types.Number
    }
  },
  shipping_option: {
    cost: {
      type: Schema.Types.Number
    },
    delivery_date: {
      type: Schema.Types.String
    }
  },
  //   address: {
  //     type: Schema.Types.Mixed,
  //   },
  //   transaction_cost: { type: Schema.Types.Number },

  cartObj: {
    type: Schema.Types.Mixed,
    ref: 'product'
  },
  cartIds: [{
    type: Schema.Types.String
  }]
});
var _default = exports["default"] = _mongoose["default"].model('order', OrderSchema);