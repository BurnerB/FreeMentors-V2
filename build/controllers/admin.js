"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _responses = _interopRequireDefault(require("../helpers/responses"));

var _mentorModel = _interopRequireDefault(require("../models/mentorModel"));

var _usersModel = _interopRequireDefault(require("../models/usersModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Admin =
/*#__PURE__*/
function () {
  function Admin() {
    _classCallCheck(this, Admin);
  }

  _createClass(Admin, null, [{
    key: "makeMentor",
    value: function () {
      var _makeMentor = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var userId, mentor, user, newMentor;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                userId = req.params.userId;
                _context.next = 4;
                return _mentorModel["default"].findById(userId);

              case 4:
                mentor = _context.sent;

                if (!mentor) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", _responses["default"].handleError(400, 'User is already a mentor', res));

              case 7:
                _context.next = 9;
                return _usersModel["default"].findById(userId);

              case 9:
                user = _context.sent;

                if (user) {
                  _context.next = 12;
                  break;
                }

                return _context.abrupt("return", _responses["default"].handleError(404, 'User with that Id not found', res));

              case 12:
                _context.next = 14;
                return _mentorModel["default"].makeMentor(user);

              case 14:
                newMentor = _context.sent;

                if (!newMentor) {
                  _context.next = 17;
                  break;
                }

                return _context.abrupt("return", _responses["default"].success(200, {
                  message: 'User account changed to mentor'
                }, res));

              case 17:
                _context.next = 22;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _responses["default"].catchError(500, _context.t0.toString(), res));

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 19]]);
      }));

      function makeMentor(_x, _x2) {
        return _makeMentor.apply(this, arguments);
      }

      return makeMentor;
    }()
  }]);

  return Admin;
}();

var _default = Admin;
exports["default"] = _default;