"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _responses = _interopRequireDefault(require("../helpers/responses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function Mentor(req, res, next) {
  // console.log(req.locals.isAdmin);
  if (!req.locals.isMentor) {
    return _responses["default"].handleError(403, 'ACCESS DENIED! Not a Mentor', res);
  }

  next();
}

var _default = Mentor;
exports["default"] = _default;