"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderDetails = exports.createPaymentIntent = void 0;
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
var _product = _interopRequireDefault(require("../Models/product.js"));
var _expressValidator = require("express-validator");
var _checkAuthenticated = require("../middleware/checkAuthenticated.js");
var _randomstring = _interopRequireDefault(require("randomstring"));
require("dotenv/config");
var _stripe = _interopRequireDefault(require("stripe"));
var _lodash = _interopRequireDefault(require("lodash"));
var _generateOrderNumber = _interopRequireDefault(require("../utils/generateOrderNumber.js"));
var _order = _interopRequireDefault(require("../Models/order.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /* eslint-disable import/prefer-default-export */
var stripe = (0, _stripe["default"])(process.env.STRIPE_KEY);

// export const create_order = [
//   checkAuthenticated,
//   asyncHandler(async (req, res, next) => {
//     const userId = req.session.passport.user;
//     const { cart, shipping } = req.body;
//     // make a map with all the cart item products
//     //
//     let cartPrice = 0;
//     const cartMap = new Map();
//     const cartObj = {};
//     cart.map(({ id, variationSelect, quantity }) => {
//       if (!cartMap.has(id)) {
//         const array = [{ ...variationSelect, quantity }];
//         cartObj[id] = array;
//         cartMap.set(id, array);
//       } else {
//         const getArray = cartMap.get(id);

//         getArray.push({ ...variationSelect, quantity });
//         cartMap.set(getArray);
//       }
//     });
//     const getAllCartProducts = await Promise.all(
//       Object.keys(cartObj).map((id) => {
//         const product = Product.findById(id);
//         return product;
//       }),
//     );
//     let isQuantityFixed = true;
//     const getResult = getAllCartProducts.map((product) => {
//       const getVariationSelectArray = cartObj[product.id];

//       getVariationSelectArray.map(({ color, size, quantity }) => {
//         if (product.isSizePresent) {
//           const findVariation = product.variations.find(
//             (item) => item.name === 'Size',
//           );

//           const getVariation = findVariation.options.get(size.id);
//           if (_.has(getVariation, 'price')) {
//             cartPrice += getVariation.price * quantity;
//             isQuantityFixed = false;
//           } else {
//             cartPrice += product.price.current * quantity;
//           }
//           return getVariation;
//         }

//         if (product.isColorPresent) {
//           const findVariation = product.variations.find(
//             (item) => item.name === 'Colour',
//           );

//           const getVariation = findVariation.options.get(color.id);

//           if (_.has(getVariation, 'price')) {
//             cartPrice += getVariation.price * quantity;
//             isQuantityFixed = false;
//           } else {
//             cartPrice += product.price.current * quantity;
//           }

//           return getVariation;
//         }
//       });
//     });
//     const calculatePrice = parseInt(cartPrice * 100);
//     /* use off_session inorder to allow klarna payment */
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: calculatePrice,
//       currency: 'gbp',
//       customer: userId,
//       // setup_future_usage: 'off_session',
//       shipping,
//       payment_method_types: ['card', 'paypal', 'klarna', 'afterpay_clearpay'],
//     });
//     console.log(paymentIntent);
//     res.status(200).send({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//       id: paymentIntent.id,
//     });
//   }),
// ];

var createPaymentIntent = exports.createPaymentIntent = [(0, _expressValidator.check)('cart').escape(), (0, _expressValidator.check)('shipping').escape(), (0, _expressValidator.check)('billing').escape(), _checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res, next) {
    var userId, _req$body, cart, shipping, deliveryOption, billing, deliveryDate, cartPrice, cartMap, cartObj, itemsArray, cartIds, productsArray, getAllCartProducts, isQuantityFixed, getResult, subTotal, parseCartPrice, calculatePrice, orderNumber, paymentIntent, orderObj, order;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          userId = req.session.passport.user;
          _req$body = req.body, cart = _req$body.cart, shipping = _req$body.shipping, deliveryOption = _req$body.deliveryOption, billing = _req$body.billing, deliveryDate = _req$body.deliveryDate; // make a map with all the cart item products
          //
          cartPrice = 0;
          cartMap = new Map();
          cartObj = {};
          itemsArray = [];
          cartIds = [];
          cart.map(function (_ref2) {
            var id = _ref2.id,
              variationSelect = _ref2.variationSelect,
              quantity = _ref2.quantity,
              isVariation1Present = _ref2.isVariation1Present,
              isVariation2Present = _ref2.isVariation2Present,
              isVariationCombine = _ref2.isVariationCombine,
              cartId = _ref2.cartId,
              price = _ref2.price;
            var obj = _objectSpread(_objectSpread({
              id: id
            }, variationSelect), {}, {
              quantity: quantity,
              isVariation1Present: isVariation1Present,
              isVariation2Present: isVariation2Present,
              isVariationCombine: isVariationCombine,
              price: price === null || price === void 0 ? void 0 : price.current
            });
            itemsArray.push(_objectSpread(_objectSpread({}, obj), {}, {
              product: id
            }));
            cartIds.push(cartId);
            if (!cartMap.has(id)) {
              obj.cartId = cartId;
              var array = [obj];
              cartObj[id] = array;
              cartMap.set(id, array);
            } else {
              obj.cartId = cartId;
              var getArray = cartMap.get(id);
              getArray.push(obj);
              cartMap.set(getArray);
            }
          });
          productsArray = Object.keys(cartObj);
          _context.next = 11;
          return _product["default"].find({
            _id: {
              $in: productsArray
            }
          });
        case 11:
          getAllCartProducts = _context.sent;
          isQuantityFixed = true;
          getResult = getAllCartProducts.map(function (product) {
            var getVariationSelectArray = cartObj[product.id];
            getVariationSelectArray.map(function (variationDetail) {
              if (product !== null && product !== void 0 && product.variations) {
                if (product.variations.length < 3) {
                  // console.log({ notCobine: true, variationDetail });

                  var foundObj = {
                    price: null,
                    stock: null
                  };
                  var findOptionsforVariation1 = product.variations.find(function (item) {
                    return item.name === variationDetail.variation1.title;
                  });
                  var findOptionsforVariation2 = product.variations.find(function (item) {
                    return item.name === variationDetail.variation2.title;
                  });
                  var findPrice_StockArray = [findOptionsforVariation1, findOptionsforVariation2].map(function (variation, index) {
                    if (variation !== null && variation !== void 0 && variation.options) {
                      var foundOptionVariation = variation.options.get(variationDetail["variation".concat(index + 1)].id);
                      if (_lodash["default"].has(foundOptionVariation, 'price')) {
                        foundObj.price = foundOptionVariation.price;
                      }
                      if (_lodash["default"].has(foundOptionVariation, 'stock')) {
                        foundObj.stock = foundOptionVariation.stock;
                      }
                    }
                  });
                  console.log({
                    foundObj: foundObj
                  });
                  if (foundObj.price) {
                    cartPrice += foundObj.price * (variationDetail === null || variationDetail === void 0 ? void 0 : variationDetail.quantity);
                  } else {
                    var _product$price;
                    console.log('variation wasnt present');
                    cartPrice += (product === null || product === void 0 || (_product$price = product.price) === null || _product$price === void 0 ? void 0 : _product$price.current) * variationDetail.quantity;
                  }
                } else {
                  console.log('this is a combineVariation');
                  var findOptionsforVariation = product.variations[2].options;
                  if (findOptionsforVariation) {
                    var _variationDetail$vari;
                    var foundOptionVariation = findOptionsforVariation.get(variationDetail === null || variationDetail === void 0 || (_variationDetail$vari = variationDetail.variation2) === null || _variationDetail$vari === void 0 ? void 0 : _variationDetail$vari.id);
                    if (foundOptionVariation) {
                      cartPrice += (foundOptionVariation === null || foundOptionVariation === void 0 ? void 0 : foundOptionVariation.price) * (variationDetail === null || variationDetail === void 0 ? void 0 : variationDetail.quantity);
                    } else {
                      console.log('didnt find variation, may have been deleted');
                    }
                  }
                }
              }
            });
          });
          subTotal = cartPrice;
          if (_lodash["default"].has(deliveryOption, 'cost')) {
            cartPrice += deliveryOption.cost;
          }
          parseCartPrice = parseFloat(cartPrice).toFixed(2);
          calculatePrice = parseInt(parseCartPrice.replace('.', ''));
          /* use off_session inorder to allow klarna payment */
          orderNumber = (0, _generateOrderNumber["default"])();
          console.log({
            calculatePrice: calculatePrice
          });
          _context.next = 22;
          return stripe.paymentIntents.create({
            metadata: {
              orderNumber: orderNumber,
              isQuantityFixed: isQuantityFixed
            },
            amount: calculatePrice,
            currency: 'gbp',
            customer: userId,
            // setup_future_usage: 'off_session',
            shipping: shipping,
            payment_method_types: ['card', 'paypal', 'klarna', 'afterpay_clearpay']
          });
        case 22:
          paymentIntent = _context.sent;
          orderObj = {
            _id: orderNumber,
            customer: userId,
            status: 'processing',
            shipping_address: shipping,
            billing_address: billing,
            transaction_cost: {
              total: parseCartPrice,
              subtotal: parseFloat(subTotal).toFixed(2)
            },
            shipping_option: {
              cost: deliveryOption === null || deliveryOption === void 0 ? void 0 : deliveryOption.cost,
              delivery_date: deliveryDate,
              name: deliveryOption === null || deliveryOption === void 0 ? void 0 : deliveryOption.name
            },
            items: itemsArray,
            cartObj: cartObj,
            cartIds: cartIds
          };
          _context.next = 26;
          return _order["default"].create(orderObj);
        case 26:
          order = _context.sent;
          // console.log({ order });
          res.status(200).send({
            success: true,
            clientSecret: paymentIntent.client_secret,
            orderNumber: orderNumber,
            id: paymentIntent.id
          });
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}())];
var getOrderDetails = exports.getOrderDetails = [_checkAuthenticated.checkAuthenticated, (0, _expressAsyncHandler["default"])( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res, next) {
    var userId, id, order;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          userId = req.session.passport.user;
          id = req.params.id;
          _context2.next = 4;
          return _order["default"].findById(id.toUpperCase()).populate('items.product', ['images', 'title', 'variations']);
        case 4:
          order = _context2.sent;
          if (!order) {
            _context2.next = 13;
            break;
          }
          if (!(order.customer.toString() === userId)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.status(200).send({
            order: order,
            success: false
          }));
        case 10:
          res.status(404).send({
            msg: 'You are not authorized.',
            success: false
          });
        case 11:
          _context2.next = 14;
          break;
        case 13:
          return _context2.abrupt("return", res.status(404).send({
            msg: 'Not Found',
            success: false
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}())];