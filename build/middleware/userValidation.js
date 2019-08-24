"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _responses = _interopRequireDefault(require("../helpers/responses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validations =
/*#__PURE__*/
function () {
  function Validations() {
    _classCallCheck(this, Validations);
  }

  _createClass(Validations, null, [{
    key: "validateSignup",
    value: function () {
      var _validateSignup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var schema, _Joi$validate, error;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                schema = {
                  firstName: _joi["default"].string().trim().min(3).max(15).regex(/^[a-zA-Z]*$/).required().error(function () {
                    return 'Firstname is a required field with a min of 3 chars and no special chars or numbers';
                  }),
                  lastName: _joi["default"].string().trim().min(3).max(15).regex(/^[a-zA-Z]*$/).required().error(function () {
                    return 'Lastname is a required field with a min of 3 chars and no special chars or numbers';
                  }),
                  email: _joi["default"].string().trim().email({
                    minDomainSegments: 2
                  }).required().error(function () {
                    return 'Email is a required field and must be valid';
                  }),
                  password: _joi["default"].string().trim().min(5).max(15).alphanum().required().error(function () {
                    return 'Password is a required field with a min of 5 chars and no special chars';
                  }),
                  address: _joi["default"].string().min(5).max(20).required().error(function () {
                    return 'Address is a required field with a min of 5 chars and no special chars';
                  }),
                  bio: _joi["default"].string().trim().max(200).required().error(function () {
                    return 'Bio is a required field with a maximum of 200 chars';
                  }),
                  occupation: _joi["default"].string().trim().min(3).max(15).alphanum().required().error(function () {
                    return 'Occupation is a required field with minimum of 3 chars maximum of 15 chars';
                  }),
                  expertise: _joi["default"].string().trim().min(3).max(15).alphanum().required().error(function () {
                    return 'Expertise is a required field with a minimum of 3 chars maximum of 15 chars';
                  })
                };
                _Joi$validate = _joi["default"].validate(req.body, schema), error = _Joi$validate.error;

                if (!error) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", _responses["default"].validationError(400, error.details[0].message, res));

              case 5:
                next();
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _responses["default"].catchError(500, _context.t0.toString(), res));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function validateSignup(_x, _x2, _x3) {
        return _validateSignup.apply(this, arguments);
      }

      return validateSignup;
    }()
  }, {
    key: "validateLogin",
    value: function () {
      var _validateLogin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var schema, _Joi$validate2, error;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                schema = {
                  email: _joi["default"].string().trim().email({
                    minDomainSegments: 2
                  }).required().error(function () {
                    return 'Email is a required field and must be valid';
                  }),
                  password: _joi["default"].string().trim().min(5).max(15).alphanum().required().error(function () {
                    return 'Password is a required field with a min of 5 chars and no special chars';
                  })
                };
                _Joi$validate2 = _joi["default"].validate(req.body, schema), error = _Joi$validate2.error;

                if (!error) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt("return", _responses["default"].validationError(400, error.details[0].message, res));

              case 5:
                next();
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _responses["default"].catchError(500, _context2.t0.toString(), res));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      function validateLogin(_x4, _x5, _x6) {
        return _validateLogin.apply(this, arguments);
      }

      return validateLogin;
    }()
  }]);

  return Validations;
}();

var _default = Validations;
exports["default"] = _default;