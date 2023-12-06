"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLogout = exports.update_single = exports.updatePreferences = exports.updateDefaultAddress = exports.signUp_user = exports.setUpPaypal = exports.setUpKlarna = exports.saveCustomerCard = exports.logoutUser = exports.loginUser = exports.get_single_user = exports.get_all_users = exports.getPaymentMethods = exports.getOrders = exports.getAllUserData = exports.editAddress = exports.dummy_data = exports.delete_user = exports.delete_many_user = exports.deletePaymentMethod = exports.deleteAddress = exports.create_user = exports.checkUser = exports.changeDetails = exports.changeDefaultMethod = exports.addUserAddress = exports.addPaymentMethod = void 0;
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _user = _interopRequireDefault(require("../Models/user.js"));
var _multer = _interopRequireDefault(require("multer"));
var _fileFilter = _interopRequireDefault(require("../Upload/fileFilter.js"));
var _sharpify = _interopRequireDefault(require("../Upload/sharpify.js"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _s3Service = _interopRequireWildcard(require("../s3Service.js"));
require("dotenv/config");
var _expressValidator = require("express-validator");
var _timezone = _interopRequireDefault(require("dayjs/plugin/timezone.js"));
var _utc = _interopRequireDefault(require("dayjs/plugin/utc.js"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _passport = _interopRequireDefault(require("../utils/passport.js"));
var _checkAuthenticated = require("../middleware/checkAuthenticated.js");
var _address = _interopRequireDefault(require("../Models/address.js"));
var _addressValidator = _interopRequireDefault(require("../utils/addressValidator.js"));
var _errorRegenerator = _interopRequireDefault(require("../utils/errorRegenerator.js"));
var _uuid = require("uuid");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _stripe = _interopRequireDefault(require("stripe"));
var _order = _interopRequireDefault(require("../Models/order.js"));
var _libphonenumberJs = require("libphonenumber-js");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /* eslint-disable import/prefer-default-export */
var stripe = (0, _stripe["default"])(process.env.STRIPE_KEY);
var CLIENT_URL = process.env.CLIENT_URL;
var SALT_ROUNDS = process.env.SALT_ROUNDS;
_dayjs["default"].extend(_utc["default"]);
_dayjs["default"].extend(_timezone["default"]);
var handleProfilePhoto = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(file, id) {
    var compressImg, profileImg, updateUser;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!file) {
            _context.next = 11;
            break;
          }
          _context.next = 3;
          return (0, _sharpify["default"])(file, 'profile');
        case 3:
          compressImg = _context.sent;
          compressImg.id = id;
          _context.next = 7;
          return (0, _s3Service["default"])([compressImg], true);
        case 7:
          profileImg = "".concat(process.env.UPLOAD_URL, "/user/").concat(id, ".").concat(compressImg.format);
          _context.next = 10;
          return _user["default"].findByIdAndUpdate(id, {
            profileImg: profileImg
          }, {
            upsert: true,
            "new": true
          });
        case 10:
          updateUser = _context.sent;
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function handleProfilePhoto(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var get_all_users = exports.get_all_users = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var users;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _user["default"].find();
        case 2:
          users = _context2.sent;
          res.status(200).send(users);
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());
// test
var dummy_data = exports.dummy_data = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res, next) {
    var dummyUsers, bulkCreate;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          dummyUsers = [{
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'password123',
            dob: new Date('1990-01-15'),
            interest: 'Menswear'
          }, {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'janesmith@example.com',
            password: 'securepassword',
            dob: new Date('1985-05-20'),
            interest: 'Womenswear'
          }, {
            firstName: 'Alice',
            lastName: 'Johnson',
            email: 'alice@example.com',
            password: 'mysecretpassword',
            dob: new Date('1995-09-10'),
            interest: 'Menswear'
          }, {
            firstName: 'Ella',
            lastName: 'Brown',
            email: 'ella@example.com',
            password: 'mypassword123',
            dob: new Date('1988-11-30'),
            interest: 'Womenswear'
          }];
          _context3.next = 3;
          return _user["default"].insertMany(dummyUsers);
        case 3:
          bulkCreate = _context3.sent;
          res.send(bulkCreate);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());
var delete_user = exports.delete_user = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res, next) {
    var id, user;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.next = 3;
          return _user["default"].findByIdAndDelete(id);
        case 3:
          user = _context4.sent;
          _context4.next = 6;
          return (0, _s3Service.s3Delete)('user', id);
        case 6:
          res.status(200).json({
            msg: 'user Deleted',
            user: user
          });
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}());
var delete_many_user = exports.delete_many_user = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res, next) {
    var id, idArr, deleteUserImage, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          idArr = id.split(',');
          deleteUserImage = idArr.map(function (item) {
            (0, _s3Service.s3Delete)('user', item);
          });
          _context5.next = 5;
          return Promise.all([_user["default"].deleteMany({
            _id: idArr
          }), deleteUserImage]);
        case 5:
          result = _context5.sent;
          res.status(200).send(result);
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x12, _x13, _x14) {
    return _ref5.apply(this, arguments);
  };
}());
var storage = _multer["default"].memoryStorage();
var upload = (0, _multer["default"])({
  storage: storage,
  fileFilter: _fileFilter["default"],
  limits: {
    fileSize: 1000000000,
    files: 6
  }
});
var create_user = exports.create_user = [upload.single('file'), (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res, next) {
    var file, _req$body, password, firstName, lastName, dob, address, mobile, email, interest, hashPassword, user, id;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          file = req.file;
          _req$body = req.body, password = _req$body.password, firstName = _req$body.firstName, lastName = _req$body.lastName, dob = _req$body.dob, address = _req$body.address, mobile = _req$body.mobile, email = _req$body.email, interest = _req$body.interest;
          _context6.next = 4;
          return _bcryptjs["default"].hash(password, 10);
        case 4:
          hashPassword = _context6.sent;
          _context6.next = 7;
          return _user["default"].create({
            password: hashPassword,
            firstName: firstName,
            lastName: lastName,
            dob: dob,
            address: [address],
            mobile: mobile,
            email: email,
            interest: interest
          });
        case 7:
          user = _context6.sent;
          id = user.id;
          _context6.next = 11;
          return handleProfilePhoto(file, id);
        case 11:
          res.status(201).send(user);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x15, _x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}())];
var signUp_user = exports.signUp_user = [(0, _expressValidator.check)('email', 'Please enter a valid email address.').trim().escape().notEmpty().custom( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(value) {
    var findUser;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _user["default"].findOne({
            email: value
          });
        case 2:
          findUser = _context7.sent;
          if (!findUser) {
            _context7.next = 5;
            break;
          }
          throw new Error('User Already Exists. Please try using a different email address.');
        case 5:
          return _context7.abrupt("return", true);
        case 6:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x18) {
    return _ref7.apply(this, arguments);
  };
}()), (0, _expressValidator.check)('password', 'Password must be between 10 to 20 characters.').trim().notEmpty().escape().trim().isLength({
  min: 10,
  max: 20
}), (0, _expressValidator.check)('firstName', 'Please enter an valid first name.').trim().escape().notEmpty(), (0, _expressValidator.check)('lastName', 'Please enter an valid last name.').trim().escape().notEmpty(), (0, _expressValidator.check)('email', 'Please enter a valid email.').trim().escape().notEmpty().isEmail(), (0, _expressValidator.check)('dob', 'Please enter an valid date').custom(function (value) {
  var userDob = (0, _dayjs["default"])(value);
  var todayDate = (0, _dayjs["default"])();
  var difference = todayDate.diff(userDob, 'year');
  if (difference < 18) {
    throw new Error('You must be 18 or older to use Glamo.');
  }
  return true;
}), (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res, next) {
    var _req$body2, firstName, email, password, lastName, result, newResult, salt, hashPassword, user;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _req$body2 = req.body, firstName = _req$body2.firstName, email = _req$body2.email, password = _req$body2.password, lastName = _req$body2.lastName;
          result = (0, _expressValidator.validationResult)(req);
          if (result.isEmpty()) {
            _context8.next = 6;
            break;
          }
          newResult = {};
          result.errors.map(function (_ref9) {
            var path = _ref9.path,
              msg = _ref9.msg;
            newResult[path] = msg;
          });
          return _context8.abrupt("return", res.status(400).send(newResult));
        case 6:
          salt = _bcryptjs["default"].genSaltSync(parseInt(SALT_ROUNDS));
          hashPassword = _bcryptjs["default"].hashSync(password, salt);
          _context8.next = 10;
          return _user["default"].create(_objectSpread(_objectSpread({}, req.body), {}, {
            password: hashPassword
          }));
        case 10:
          user = _context8.sent;
          _context8.next = 13;
          return stripe.customers.create({
            id: user.id,
            name: "".concat(firstName, " ").concat(lastName),
            email: email
          });
        case 13:
          res.status(200).send({
            msg: 'user created',
            user: user
          });
        case 14:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x19, _x20, _x21) {
    return _ref8.apply(this, arguments);
  };
}())];
var get_single_user = exports.get_single_user = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res, next) {
    var id, user;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id;
          _context9.next = 3;
          return _user["default"].findById(id);
        case 3:
          user = _context9.sent;
          if (!user) {
            res.status(404).send('User Not Found');
          } else {
            res.status(200).send(user);
          }
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x22, _x23, _x24) {
    return _ref10.apply(this, arguments);
  };
}());
var update_single = exports.update_single = [upload.single('file'), (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res, next) {
    var id, file, user;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          id = req.params.id;
          file = req.file;
          _context10.next = 4;
          return _user["default"].updateOne({
            _id: id
          }, req.body, {
            "new": true,
            upsert: true,
            runValidators: true
          });
        case 4:
          user = _context10.sent;
          _context10.next = 7;
          return handleProfilePhoto(file, id);
        case 7:
          res.status(200).send(user);
        case 8:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function (_x25, _x26, _x27) {
    return _ref11.apply(this, arguments);
  };
}())];
var loginUser = exports.loginUser = [(0, _expressValidator.check)('email', 'Please enter a valid email address.').trim().isEmail().custom( /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(email) {
    var result;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return _user["default"].findOne({
            email: email
          });
        case 3:
          result = _context11.sent;
          if (findUser) {
            _context11.next = 6;
            break;
          }
          throw new Error('User does not exist.');
        case 6:
          return _context11.abrupt("return", true);
        case 9:
          _context11.prev = 9;
          _context11.t0 = _context11["catch"](0);
        case 11:
        case "end":
          return _context11.stop();
      }
    }, _callee11, null, [[0, 9]]);
  }));
  return function (_x28) {
    return _ref12.apply(this, arguments);
  };
}()), (0, _expressValidator.check)('password', 'Please enter a valid password between 10 to 20 characters.').trim().notEmpty().escape().trim().isLength({
  min: 10,
  max: 20
}), (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res, next) {
    var result, newResult;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          result = (0, _expressValidator.validationResult)(req);
          if (result.isEmpty()) {
            _context12.next = 5;
            break;
          }
          newResult = {};
          result.errors.map(function (_ref14) {
            var path = _ref14.path,
              msg = _ref14.msg;
            newResult[path] = msg;
          });
          return _context12.abrupt("return", res.status(400).send(newResult));
        case 5:
          _passport["default"].authenticate('local', function (err, user, info) {
            if (err) {
              next(err);
            }
            if (!user) {
              return res.status(400).send({
                password: 'The password is invalid. Please try again.'
              });
            }
            req.logIn(user, function (error) {
              if (error) {
                return next(err);
              }
              return res.status(200).redirect('/api/user/check');
            });
          })(req, res, next);
        case 6:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function (_x29, _x30, _x31) {
    return _ref13.apply(this, arguments);
  };
}())];
var userLogout = exports.userLogout = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res, next) {
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          if (req.isAuthenticated()) {
            req.logout();
          }
          return _context13.abrupt("return", res.status(200).redirect('/api/user/check'));
        case 2:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function (_x32, _x33, _x34) {
    return _ref15.apply(this, arguments);
  };
}());
var checkUser = exports.checkUser = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res, next) {
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          return _context14.abrupt("return", res.status(200).send({
            user: req.user,
            authenticated: req.isAuthenticated()
          }));
        case 1:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function (_x35, _x36, _x37) {
    return _ref16.apply(this, arguments);
  };
}());
var logoutUser = exports.logoutUser = (0, _expressAsyncHandler["default"])(function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    return res.status(200).clearCookie('connect.sid').send({
      msg: 'Successfully logout user.',
      authenticated: false
    });
  });
});
var getAllUserData = exports.getAllUserData = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res, next) {
    var user;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return _user["default"].findById(req.session.passport.user, {
            password: 0
          }).populate('address').exec();
        case 2:
          user = _context15.sent;
          res.send({
            user: user
          });
        case 4:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function (_x38, _x39, _x40) {
    return _ref17.apply(this, arguments);
  };
}())];
//change default address
var changeDetails = exports.changeDetails = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res, next) {
    var body, user;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          body = req.body;
          _context16.next = 3;
          return _user["default"].findByIdAndUpdate(req.session.passport.user, body, {
            select: {
              password: 0
            },
            returnDocument: 'after',
            runValidators: true
          });
        case 3:
          user = _context16.sent;
          res.redirect(303, '/api/user/check');
        case 5:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function (_x41, _x42, _x43) {
    return _ref18.apply(this, arguments);
  };
}())];
var addUserAddress = exports.addUserAddress = [_checkAuthenticated.checkAuthenticated, _addressValidator["default"], (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res, next) {
    var result, newResult, userId, address, _yield$Promise$all, _yield$Promise$all2, newAddress, user;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          result = (0, _expressValidator.validationResult)(req);
          if (result.isEmpty()) {
            _context17.next = 4;
            break;
          }
          newResult = (0, _errorRegenerator["default"])(result);
          return _context17.abrupt("return", res.status(400).send(newResult));
        case 4:
          userId = req.session.passport.user;
          address = new _address["default"](_objectSpread(_objectSpread({}, req.body), {}, {
            userId: userId
          }));
          _context17.next = 8;
          return Promise.all([address.save(), _user["default"].findByIdAndUpdate(userId, {
            $push: {
              address: address._id
            }
          }, {
            runValidators: true,
            "new": true,
            select: {
              password: 0
            }
          }).populate('address').exec()]);
        case 8:
          _yield$Promise$all = _context17.sent;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          newAddress = _yield$Promise$all2[0];
          user = _yield$Promise$all2[1];
          if (!(user.address.length == 1)) {
            _context17.next = 16;
            break;
          }
          user.default_address = {
            billing_address: address.id,
            shipping_address: address.id
          };
          _context17.next = 16;
          return user.save();
        case 16:
          res.status(200).send({
            success: true,
            address: user.address,
            default_address: user.default_address
          });
        case 17:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function (_x44, _x45, _x46) {
    return _ref19.apply(this, arguments);
  };
}())];
var deleteAddress = exports.deleteAddress = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res, next) {
    var id, userId, _yield$Promise$all3, _yield$Promise$all4, address, user;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          id = req.params.id;
          userId = req.session.passport.user;
          _context18.next = 4;
          return Promise.all([_address["default"].findByIdAndDelete(id), _user["default"].findByIdAndUpdate(userId, {
            $pull: {
              address: id
            }
          }, {
            runValidators: true,
            "new": true,
            select: {
              password: 0
            }
          }).populate('address').exec()]);
        case 4:
          _yield$Promise$all3 = _context18.sent;
          _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 2);
          address = _yield$Promise$all4[0];
          user = _yield$Promise$all4[1];
          if (!(user.default_address.shipping_address == address.id)) {
            _context18.next = 12;
            break;
          }
          user.default_address = {
            shipping_address: null,
            billing_address: null
          };
          _context18.next = 12;
          return user.save();
        case 12:
          res.status(200).send({
            success: true,
            address: user.address
          });
        case 13:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function (_x47, _x48, _x49) {
    return _ref20.apply(this, arguments);
  };
}())];
var editAddress = exports.editAddress = [_checkAuthenticated.checkAuthenticated, _addressValidator["default"], (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res, next) {
    var _req$body3, _req$body4;
    var result, id, newResult, user, isUserAddress, parseNumber;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          result = (0, _expressValidator.validationResult)(req);
          id = req.params.id;
          if (result.isEmpty()) {
            _context19.next = 5;
            break;
          }
          newResult = (0, _errorRegenerator["default"])(result);
          return _context19.abrupt("return", res.status(400).send(newResult));
        case 5:
          _context19.next = 7;
          return _user["default"].findById(req.session.passport.user, {
            address: 1
          });
        case 7:
          user = _context19.sent;
          isUserAddress = user.address.some(function (item) {
            return item.toString() == id;
          });
          if (isUserAddress) {
            _context19.next = 11;
            break;
          }
          return _context19.abrupt("return", res.status(404).send({
            notFound: true
          }));
        case 11:
          parseNumber = (0, _libphonenumberJs.parsePhoneNumberFromString)((_req$body3 = req.body) === null || _req$body3 === void 0 ? void 0 : _req$body3.mobile, (_req$body4 = req.body) === null || _req$body4 === void 0 ? void 0 : _req$body4.country);
          if (!isUserAddress) {
            _context19.next = 16;
            break;
          }
          _context19.next = 15;
          return _address["default"].findByIdAndUpdate(id, _objectSpread(_objectSpread({}, req.body), {}, {
            mobile: parseNumber === null || parseNumber === void 0 ? void 0 : parseNumber.number
          }), {
            "new": true
          });
        case 15:
          return _context19.abrupt("return", res.redirect(303, '/api/user/userData'));
        case 16:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return function (_x50, _x51, _x52) {
    return _ref21.apply(this, arguments);
  };
}())];
var updatePreferences = exports.updatePreferences = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(req, res, next) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee20$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          userId = req.session.passport.user;
          _context20.next = 3;
          return _user["default"].findByIdAndUpdate(userId, {
            contact_preferences: req.body
          }, {
            "new": true,
            upsert: true
          });
        case 3:
          user = _context20.sent;
          res.status(200).send({
            msg: 'User contact preferences successfully updates'
          });
        case 5:
        case "end":
          return _context20.stop();
      }
    }, _callee20);
  }));
  return function (_x53, _x54, _x55) {
    return _ref22.apply(this, arguments);
  };
}())];
var updateDefaultAddress = exports.updateDefaultAddress = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res, next) {
    var body, property, value, userId, user;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          body = req.body;
          property = Object.keys(body)[0];
          value = Object.values(body)[0];
          userId = req.session.passport.user;
          _context21.next = 6;
          return _user["default"].findByIdAndUpdate(userId, {
            $set: _defineProperty({}, "default_address.".concat(property), value)
          }, {
            "new": true,
            upsert: true,
            select: {
              default_address: 1
            }
          });
        case 6:
          user = _context21.sent;
          return _context21.abrupt("return", res.status(200).send({
            msg: "succussfully update user default ".concat(property.replaceAll('_', ' '), "."),
            default_address: user.default_address
          }));
        case 8:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return function (_x56, _x57, _x58) {
    return _ref23.apply(this, arguments);
  };
}())];
var addPaymentMethod = exports.addPaymentMethod = [_checkAuthenticated.checkAuthenticated, (0, _expressValidator.check)('logo').escape().trim(), (0, _expressValidator.check)('description').escape().trim(), (0, _expressValidator.check)('alt').escape().trim(), (0, _expressValidator.check)('text').escape().trim(), (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(req, res, next) {
    var userId, user;
    return _regeneratorRuntime().wrap(function _callee22$(_context22) {
      while (1) switch (_context22.prev = _context22.next) {
        case 0:
          userId = req.session.passport.user;
          _context22.next = 3;
          return _user["default"].findByIdAndUpdate(userId, {
            $push: {
              payment_methods: _objectSpread({
                id: new _mongoose["default"].Types.ObjectId()
              }, req.body)
            }
          }, {
            upsert: true,
            "new": true,
            select: {
              payment_methods: 1
            }
          });
        case 3:
          user = _context22.sent;
          res.status(200).send({
            msg: 'payment method successfully added',
            payment_methods: user.payment_methods
          });
        case 5:
        case "end":
          return _context22.stop();
      }
    }, _callee22);
  }));
  return function (_x59, _x60, _x61) {
    return _ref24.apply(this, arguments);
  };
}())];
var deletePaymentMethod = exports.deletePaymentMethod = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(req, res, next) {
    var id, userId;
    return _regeneratorRuntime().wrap(function _callee23$(_context23) {
      while (1) switch (_context23.prev = _context23.next) {
        case 0:
          id = req.params.id;
          userId = req.session.passport.user;
          _context23.next = 4;
          return stripe.paymentMethods.detach(id);
        case 4:
          res.redirect(303, '/api/user/payment-method/all');
          // const user = await User.findByIdAndUpdate(
          //   userId,
          //   {
          //     $pull: {
          //       payment_methods: { _id: id },
          //     },
          //   },
          //   { upsert: true, new: true, select: { payment_methods: 1 } },
          // );
          // console.log({ payment_methods: user.payment_methods });
          // res.status(200).send({
          //   msg: 'payment method successfully added',
          //   payment_methods: user.payment_methods,
          // });
        case 5:
        case "end":
          return _context23.stop();
      }
    }, _callee23);
  }));
  return function (_x62, _x63, _x64) {
    return _ref25.apply(this, arguments);
  };
}())];
var changeDefaultMethod = exports.changeDefaultMethod = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res, next) {
    var id, userId, customer;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          id = req.params.id;
          userId = req.session.passport.user;
          _context24.next = 4;
          return stripe.customers.update(userId, {
            invoice_settings: {
              default_payment_method: id
            }
          });
        case 4:
          customer = _context24.sent;
          res.redirect(303, '/api/user/payment-method/all');
        case 6:
        case "end":
          return _context24.stop();
      }
    }, _callee24);
  }));
  return function (_x65, _x66, _x67) {
    return _ref26.apply(this, arguments);
  };
}())];
var saveCustomerCard = exports.saveCustomerCard = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(req, res, next) {
    var userId, findCustomer, allCustomers, checkExists, setupIntent, customer;
    return _regeneratorRuntime().wrap(function _callee25$(_context25) {
      while (1) switch (_context25.prev = _context25.next) {
        case 0:
          userId = req.session.passport.user;
          _context25.next = 3;
          return stripe.customers.list();
        case 3:
          findCustomer = _context25.sent;
          allCustomers = findCustomer.data;
          checkExists = allCustomers.some(function (item) {
            return item.id == userId;
          });
          setupIntent = null;
          if (!checkExists) {
            _context25.next = 13;
            break;
          }
          _context25.next = 10;
          return stripe.setupIntents.create({
            customer: userId,
            payment_method_types: ['card']
          });
        case 10:
          setupIntent = _context25.sent;
          _context25.next = 19;
          break;
        case 13:
          _context25.next = 15;
          return stripe.customers.create({
            id: userId,
            name: "".concat(req.user.firstName, " ").concat(req.user.lastName),
            email: req.user.email
          });
        case 15:
          customer = _context25.sent;
          _context25.next = 18;
          return stripe.setupIntents.create({
            customer: userId,
            payment_method_types: ['card']
          });
        case 18:
          setupIntent = _context25.sent;
        case 19:
          res.send({
            success: true,
            id: setupIntent.id,
            client_secret: setupIntent.client_secret
          });
        case 20:
        case "end":
          return _context25.stop();
      }
    }, _callee25);
  }));
  return function (_x68, _x69, _x70) {
    return _ref27.apply(this, arguments);
  };
}())];
var getPaymentMethods = exports.getPaymentMethods = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(req, res, next) {
    var _customer$invoice_set;
    var userId, paymentMethods, customer, defaultPaymentMethod, newMethodsArray;
    return _regeneratorRuntime().wrap(function _callee26$(_context26) {
      while (1) switch (_context26.prev = _context26.next) {
        case 0:
          userId = req.session.passport.user;
          _context26.next = 3;
          return stripe.paymentMethods.list({
            customer: req.session.passport.user
          });
        case 3:
          paymentMethods = _context26.sent;
          _context26.next = 6;
          return stripe.customers.retrieve(userId);
        case 6:
          customer = _context26.sent;
          defaultPaymentMethod = (_customer$invoice_set = customer.invoice_settings) === null || _customer$invoice_set === void 0 ? void 0 : _customer$invoice_set.default_payment_method;
          newMethodsArray = paymentMethods.data.map(function (method) {
            if (method.type === 'card') {
              var _method$card = method === null || method === void 0 ? void 0 : method.card,
                brand = _method$card.brand,
                exp_month = _method$card.exp_month,
                exp_year = _method$card.exp_year,
                last4 = _method$card.last4,
                funding = _method$card.funding;
              var newMonth = '0' + exp_month;
              return {
                id: method.id,
                brand: brand[0].toUpperCase() + brand.slice(1),
                exp_month: newMonth.slice(-2),
                exp_year: exp_year,
                last4: last4,
                type: 'card',
                funding: funding[0].toUpperCase() + funding.slice(1),
                name: method.billing_details.name
              };
            }
            if (method.type === 'paypal') {
              return {
                id: method.id,
                type: method.type,
                text: 'PayPal'
              };
            }
            return {
              id: method.id,
              type: method.type,
              text: method.type
            };
          }).sort(function (a, b) {
            if (a.id === defaultPaymentMethod) {
              return -1;
            }
            if (b.id === defaultPaymentMethod) {
              return +1;
            }
            return 0;
          });
          return _context26.abrupt("return", res.status(200).send({
            success: true,
            paymentMethods: newMethodsArray
          }));
        case 10:
        case "end":
          return _context26.stop();
      }
    }, _callee26);
  }));
  return function (_x71, _x72, _x73) {
    return _ref28.apply(this, arguments);
  };
}())];
var setUpPaypal = exports.setUpPaypal = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(req, res, next) {
    var userId, session;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          userId = req.session.passport.user;
          _context27.next = 3;
          return stripe.checkout.sessions.create({
            payment_method_types: ['paypal'],
            mode: 'setup',
            customer: userId,
            success_url: "".concat(CLIENT_URL, "/my-account/payment-methods/"),
            cancel_url: "".concat(CLIENT_URL, "/my-account/payment-methods/cancel?session_id={CHECKOUT_SESSION_ID}")
          });
        case 3:
          session = _context27.sent;
          res.send({
            success: true,
            url: session.url
          });
        case 5:
        case "end":
          return _context27.stop();
      }
    }, _callee27);
  }));
  return function (_x74, _x75, _x76) {
    return _ref29.apply(this, arguments);
  };
}())];
var setUpKlarna = exports.setUpKlarna = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(req, res, next) {
    var userId, _req$user, email, firstName, lastName, name, paymentMethod, attachPaymentMethod;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          userId = req.session.passport.user; // const session = await stripe.checkout.sessions.create({
          //   payment_method_types: ['klarna','afterpay_clearpay'],
          //   shipping_address_collection: { allowed_countries: ['GB', 'US'] },
          //   line_items: [
          //     {
          //       price_data: {
          //         currency: 'gbp',
          //         product_data: {
          //           name: 'Setup Klarna For Future Use',
          //         },
          //          unit_amount:100,
          //       },
          //       quantity: 1,
          //     },
          //   ],
          //   mode: 'payment',
          //   customer: userId,
          //   success_url: `${CLIENT_URL}/my-account/payment-methods/`,
          //   cancel_url: `${CLIENT_URL}/my-account/payment-methods/cancel?session_id={CHECKOUT_SESSION_ID}`,
          // });
          // res.send({ success: true, url: session.url });
          _req$user = req.user, email = _req$user.email, firstName = _req$user.firstName, lastName = _req$user.lastName;
          name = "".concat(firstName, " ").concat(lastName);
          _context28.next = 5;
          return stripe.paymentMethods.create({
            type: 'afterpay_clearpay',
            billing_details: {
              address: {
                line1: 'null',
                country: 'GB',
                postal_code: 'null'
              },
              name: name,
              email: email
            }
            // klarna: {
            //   dob: {
            //     day: 22,
            //     month: 3,
            //     year: 2002,
            //   },
            // },
          });
        case 5:
          paymentMethod = _context28.sent;
          _context28.next = 8;
          return stripe.paymentMethods.attach(paymentMethod.id, {
            customer: userId
          });
        case 8:
          attachPaymentMethod = _context28.sent;
          res.status(200).send({
            success: true
          });
        case 10:
        case "end":
          return _context28.stop();
      }
    }, _callee28);
  }));
  return function (_x77, _x78, _x79) {
    return _ref30.apply(this, arguments);
  };
}())];
var getOrders = exports.getOrders = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(req, res, next) {
    var userId, getUserOrder;
    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          userId = req.session.passport.user; // const getUserOrder = await User.findOne({ _id: userId }, null, {
          //   projection: { orders: 1 },
          //   populate: 'orders',
          // });
          _context29.next = 3;
          return _order["default"].find({
            customer: userId
          }, null, {
            lean: true
          }).populate('items.product').exec();
        case 3:
          getUserOrder = _context29.sent;
          return _context29.abrupt("return", res.status(200).send({
            success: true,
            orders: getUserOrder
          }));
        case 5:
        case "end":
          return _context29.stop();
      }
    }, _callee29);
  }));
  return function (_x80, _x81, _x82) {
    return _ref31.apply(this, arguments);
  };
}())];