"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _responses = _interopRequireDefault(require("../helpers/responses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

function auth(req, res, next) {
  var token = req.headers.authorization;
  var jwtToken = req.headers.authorization.split(' ')[1];

  if (!token || !jwtToken) {
    return _responses["default"].handleError(401, 'ACCESS DENIED! No token provided', res);
  }

  try {
    var decoded = _jsonwebtoken["default"].verify(jwtToken, process.env.JWT_KEY);

    if (!decoded) {
      return _responses["default"].handleError(400, 'Invalid or expired token', res);
    } // console.log(req);


    req.locals = decoded; // console.log(req.locals);

    next();
  } catch (error) {
    return _responses["default"].catchError(500, error.toString(), res);
  }
}

var _default = auth;
exports["default"] = _default;