"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _relativeTime = _interopRequireDefault(require("dayjs/plugin/relativeTime.js"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_dayjs["default"].extend(_relativeTime["default"]);
var Schema = _mongoose["default"].Schema;
var UserSchema = new Schema({
  firstName: {
    type: String,
    required: 'First Name is required. Please enter your first Name.'
  },
  lastName: {
    type: String,
    required: 'Last Name is required. Please enter your Last Name.'
  },
  email: {
    type: String,
    required: 'Email is required. Please enter your Email.',
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 10
  },
  dob: {
    type: Date,
    required: 'DOB is required. Please enter date of birth.',
    // max: '2003-09-09',
    validate: {
      validator: function validator(v) {
        var today = (0, _dayjs["default"])();
        var difference = today.diff((0, _dayjs["default"])(v), 'year');
        return difference >= 18;
      },
      message: 'Must be 18 years old or older.'
    }
  },
  interest: {
    type: String,
    "enum": {
      values: ['menswear', 'womenswear'],
      message: '{VALUE} is not support, only Menswear or Womenswear is allowed.'
    },
    required: 'Interest is required. Please enter your Interest.'
  },
  profileImg: String,
  address: [{
    type: Schema.Types.ObjectId,
    ref: 'address'
  }],
  default_address: {
    shipping_address: {
      type: Schema.Types.ObjectId,
      ref: 'address'
    },
    billing_address: {
      type: Schema.Types.ObjectId,
      ref: 'address'
    }
  },
  payment_methods: [{
    logo: {
      type: Schema.Types.String
    },
    alt: {
      type: Schema.Types.String
    },
    description: {
      type: Schema.Types.String
    },
    text: {
      type: Schema.Types.String
    },
    index: {
      type: Schema.Types.Number
    }
  }],
  orders: [{
    type: Schema.Types.String,
    ref: 'order'
  }],
  mobile: {
    type: Schema.Types.String
  },
  contact_preferences: {
    discount_newDrops: {
      email: {
        type: Schema.Types.Boolean,
        "default": false
      },
      text: {
        type: Schema.Types.Boolean,
        "default": false
      }
    },
    stockAlert: {
      email: {
        type: Schema.Types.Boolean,
        "default": false
      }
    }
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
UserSchema.virtual('id').get(function () {
  return this._id.toHexString();
});
var _default = exports["default"] = _mongoose["default"].model('Users', UserSchema);