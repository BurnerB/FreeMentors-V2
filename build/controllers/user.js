"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _usersModel = _interopRequireDefault(require("../models/usersModel"));

var _responses = _interopRequireDefault(require("../helpers/responses"));

var _tokenGen = _interopRequireDefault(require("../helpers/tokenGen"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Authentication =
/*#__PURE__*/
function () {
  function Authentication() {
    _classCallCheck(this, Authentication);
  }

  _createClass(Authentication, null, [{
    key: "registerUser",
    value: function () {
      var _registerUser = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, firstName, lastName, email, password, address, bio, occupation, expertise, salt, hashedPassword, newUser, registeredUser, token;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, firstName = _req$body.firstName, lastName = _req$body.lastName, email = _req$body.email, password = _req$body.password, address = _req$body.address, bio = _req$body.bio, occupation = _req$body.occupation, expertise = _req$body.expertise;
                _context.next = 4;
                return _bcrypt["default"].genSalt(10);

              case 4:
                salt = _context.sent;
                _context.next = 7;
                return _bcrypt["default"].hash(password, salt);

              case 7:
                hashedPassword = _context.sent;
                newUser = new _usersModel["default"](firstName, lastName, email, hashedPassword, address, bio, occupation, expertise); // const modifiedUser = (JSON.parse(JSON.stringify(newUser)));

                _context.next = 11;
                return newUser.registerUser();

              case 11:
                registeredUser = _context.sent;

                if (registeredUser) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", _responses["default"].handleError(409, 'The email has already been used to register', res));

              case 14:
                _context.next = 16;
                return _tokenGen["default"].genToken(registeredUser);

              case 16:
                token = _context.sent;
                return _context.abrupt("return", _responses["default"].authsuccess(201, 'User created successfully', {
                  token: token
                }, res));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _responses["default"].catchError(500, _context.t0.message, res));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
      }));

      function registerUser(_x, _x2) {
        return _registerUser.apply(this, arguments);
      }

      return registerUser;
    }()
  }, {
    key: "userLogin",
    value: function () {
      var _userLogin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, user, token;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 4;
                return _usersModel["default"].findByEmail(email);

              case 4:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 10;
                  break;
                }

                if (!_bcrypt["default"].compareSync(password, user.password)) {
                  _context2.next = 9;
                  break;
                }

                token = _tokenGen["default"].genToken(user);
                return _context2.abrupt("return", _responses["default"].authsuccess(200, 'User is successfully logged in', {
                  token: token
                }, res));

              case 9:
                return _context2.abrupt("return", _responses["default"].handleError(401, 'Incorrect password Email combination', res));

              case 10:
                return _context2.abrupt("return", _responses["default"].handleError(404, 'Email not found, sign up to create an account', res));

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _responses["default"].catchError(500, _context2.t0.toString(), res));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 13]]);
      }));

      function userLogin(_x3, _x4) {
        return _userLogin.apply(this, arguments);
      }

      return userLogin;
    }()
  }]);

  return Authentication;
}();

var _default = Authentication;
exports["default"] = _default;