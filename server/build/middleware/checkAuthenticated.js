"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkAuthenticated = void 0;
var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var checkAuthenticated = exports.checkAuthenticated = (0, _expressAsyncHandler["default"])(function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // req.session.destroy();
  return res.status(401).clearCookie('connect.sid').send({
    msg: 'User is not Authenticated'
  });
});