"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("dotenv/config");
var _stripe = _interopRequireDefault(require("stripe"));
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _checkAuthenticated = require("../../middleware/checkAuthenticated.js");
var _product = _interopRequireDefault(require("../../Models/product.js"));
var _lodash = _interopRequireDefault(require("lodash"));
var _order = _interopRequireDefault(require("../../Models/order.js"));
var _user = _interopRequireDefault(require("../../Models/user.js"));
var _nodemailer = _interopRequireDefault(require("../../utils/nodemailer.js"));
var _render = require("@react-email/render");
var _orderSuccess = _interopRequireDefault(require("../../React Email/orderSuccess.jsx"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var stripe = (0, _stripe["default"])(process.env.STRIPE_KEY);
var CLIENT_URL = process.env.CLIENT_URL;
var stripeWebHooks = (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var event, _paymentIntent$metada, payment_intent, paymentIntent, orderNumber, userId, order, cartObj, productsArray, foundProducts, reduceStock, result, object, customer, paymentMethod, newPaymentMethodId, newPaymentMethodFingerPrint, allPaymentMethods, data, fingerPrintArray;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          event = req.body;
          if (!(event.type === 'charge.succeeded')) {
            _context2.next = 23;
            break;
          }
          payment_intent = event.data.object.payment_intent;
          _context2.next = 6;
          return stripe.paymentIntents.retrieve(payment_intent);
        case 6:
          paymentIntent = _context2.sent;
          orderNumber = (_paymentIntent$metada = paymentIntent.metadata) === null || _paymentIntent$metada === void 0 ? void 0 : _paymentIntent$metada.orderNumber;
          userId = paymentIntent === null || paymentIntent === void 0 ? void 0 : paymentIntent.customer;
          _context2.next = 11;
          return _order["default"].findById(orderNumber);
        case 11:
          order = _context2.sent;
          cartObj = order === null || order === void 0 ? void 0 : order.cartObj;
          productsArray = Object.keys(cartObj);
          _context2.next = 16;
          return _product["default"].find({
            _id: {
              $in: productsArray
            }
          });
        case 16:
          foundProducts = _context2.sent;
          _context2.next = 19;
          return foundProducts.map(function (productObject) {
            var getCartVariationInfoArray = cartObj[productObject.id];
            getCartVariationInfoArray.map(function (variationDetail) {
              if (productObject !== null && productObject !== void 0 && productObject.variations) {
                if (productObject.variations.length < 3) {
                  var foundObj = {
                    price: null,
                    stock: null
                  };
                  var findOptionsforVariation1 = productObject.variations.find(function (item) {
                    return item.name === variationDetail.variation1.title;
                  });
                  var findOptionsforVariation2 = productObject.variations.find(function (item) {
                    return item.name === variationDetail.variation2.title;
                  });
                  var isStockChange = false;
                  var foundVariations = [findOptionsforVariation1, findOptionsforVariation2].map(function (variation, index) {
                    if (variation !== null && variation !== void 0 && variation.options) {
                      var foundOptionVariation = variation.options.get(variationDetail["variation".concat(index + 1)].id);
                      if (foundOptionVariation !== null && foundOptionVariation !== void 0 && foundOptionVariation.stock) {
                        variation.options.set(variationDetail["variation".concat(index + 1)].id, _objectSpread(_objectSpread({}, foundOptionVariation), {}, {
                          stock: foundOptionVariation.stock - variationDetail.quantity || 0
                        }));
                        isStockChange = true;
                      }
                    }
                  });
                  if (!isStockChange) {
                    console.log('stock didnt change for product: ', productObject.title, variationDetail);
                    productObject.stock = productObject.stock - variationDetail.quantity || 0;
                  }
                } else {
                  var findOptionsforVariation = productObject.variations[2].options;
                  if (findOptionsforVariation) {
                    var _variationDetail$vari;
                    var foundOptionVariation = findOptionsforVariation.get(variationDetail === null || variationDetail === void 0 || (_variationDetail$vari = variationDetail.variation2) === null || _variationDetail$vari === void 0 ? void 0 : _variationDetail$vari.id);
                    if (foundOptionVariation) {
                      var _variationDetail$vari2;
                      productObject.variations[2].options.set(variationDetail === null || variationDetail === void 0 || (_variationDetail$vari2 = variationDetail.variation2) === null || _variationDetail$vari2 === void 0 ? void 0 : _variationDetail$vari2.id, _objectSpread(_objectSpread({}, foundOptionVariation), {}, {
                        stock: foundOptionVariation.stock - variationDetail.quantity || 0
                      }));
                    } else {
                      console.log('didnt find variation, may have been deleted');
                    }
                  }
                }
              }
            });
            return productObject.save();
          });
        case 19:
          reduceStock = _context2.sent;
          result = Promise.all(_toConsumableArray(reduceStock)).then( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(res) {
              var _order$shipping_optio, _order$transaction_co, _order$shipping_optio2, _order$transaction_co2;
              var updateOrder, updateUser, props, emailHtml, sendEmail;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _order["default"].findOneAndUpdate({
                      _id: orderNumber
                    }, {
                      $unset: {
                        cartObj: ''
                      },
                      $set: {
                        status: 'received'
                      }
                    }, {
                      "new": true
                    });
                  case 2:
                    updateOrder = _context.sent;
                    _context.next = 5;
                    return _user["default"].findByIdAndUpdate(userId, {
                      $push: {
                        orders: orderNumber
                      }
                    }, {
                      upsert: true,
                      "new": true
                    });
                  case 5:
                    updateUser = _context.sent;
                    props = {
                      firstName: updateUser === null || updateUser === void 0 ? void 0 : updateUser.firstName,
                      orderNumber: orderNumber,
                      orderDate: order === null || order === void 0 || (_order$shipping_optio = order.shipping_option) === null || _order$shipping_optio === void 0 ? void 0 : _order$shipping_optio.delivery_date,
                      subtotal: parseFloat(order === null || order === void 0 || (_order$transaction_co = order.transaction_cost) === null || _order$transaction_co === void 0 ? void 0 : _order$transaction_co.subtotal).toFixed(2),
                      deliveryCost: parseFloat(order === null || order === void 0 || (_order$shipping_optio2 = order.shipping_option) === null || _order$shipping_optio2 === void 0 ? void 0 : _order$shipping_optio2.cost).toFixed(2),
                      total: parseFloat(order === null || order === void 0 || (_order$transaction_co2 = order.transaction_cost) === null || _order$transaction_co2 === void 0 ? void 0 : _order$transaction_co2.total).toFixed(2),
                      paymentType: 'paypal'
                    };
                    emailHtml = (0, _render.render)(<_orderSuccess.default {...props} />);
                    _context.next = 10;
                    return _nodemailer["default"].sendMail({
                      from: 'kevinjean321@gmail.com',
                      to: updateUser === null || updateUser === void 0 ? void 0 : updateUser.email,
                      subject: 'Thanks for your order!',
                      html: emailHtml
                    });
                  case 10:
                    sendEmail = _context.sent;
                  case 11:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x4) {
              return _ref2.apply(this, arguments);
            };
          }())["catch"](function (error) {
            console.log(error);
          });
          res.status(200).send({
            success: true
          });
          return _context2.abrupt("return");
        case 23:
          if (!(event.type == 'setup_intent.succeeded')) {
            _context2.next = 43;
            break;
          }
          object = event.data.object;
          customer = object.customer;
          _context2.next = 28;
          return stripe.paymentMethods.retrieve(object.payment_method);
        case 28:
          paymentMethod = _context2.sent;
          if (!(paymentMethod.type === 'card')) {
            _context2.next = 40;
            break;
          }
          newPaymentMethodId = paymentMethod.id;
          newPaymentMethodFingerPrint = paymentMethod.card.fingerprint;
          _context2.next = 34;
          return stripe.customers.listPaymentMethods(customer, {
            type: 'card'
          });
        case 34:
          allPaymentMethods = _context2.sent;
          data = allPaymentMethods.data;
          fingerPrintArray = [];
          data.forEach(function (item) {
            var fingerPrint = item.card.fingerprint;
            if (fingerPrint == newPaymentMethodFingerPrint && item.id != newPaymentMethodId) {
              fingerPrintArray.push({
                fingerPrint: fingerPrint,
                id: item.id
              });
            }
          });
          _context2.next = 40;
          return Promise.all([].concat(fingerPrintArray).map(function (_ref3) {
            var id = _ref3.id;
            return stripe.paymentMethods.detach(id);
          }));
        case 40:
          return _context2.abrupt("return", res.send({
            success: true
          }));
        case 43:
          res.status(200).send({
            success: true
          });
        case 44:
          _context2.next = 50;
          break;
        case 46:
          _context2.prev = 46;
          _context2.t0 = _context2["catch"](0);
          cosnole.error(_context2.t0);
          res.status(500).send({
            error: _context2.t0
          });
        case 50:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 46]]);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = exports["default"] = stripeWebHooks;