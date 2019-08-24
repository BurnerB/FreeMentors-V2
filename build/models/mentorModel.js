"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../db/users"));

var _mentor = _interopRequireDefault(require("../db/mentor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MentorModel =
/*#__PURE__*/
function () {
  function MentorModel() {
    _classCallCheck(this, MentorModel);
  }

  _createClass(MentorModel, null, [{
    key: "makeMentor",
    value: function () {
      var _makeMentor = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(user) {
        var mentor;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mentor = {
                  userId: user.userId,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  password: user.password,
                  address: user.address,
                  bio: user.bio,
                  occupation: user.occupation,
                  expertise: user.expertise,
                  isMentor: true,
                  isAdmin: false
                };

                _users["default"].splice(user.userId - 1, 1, mentor);

                _mentor["default"].push(mentor);

                return _context.abrupt("return", mentor);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function makeMentor(_x) {
        return _makeMentor.apply(this, arguments);
      }

      return makeMentor;
    }()
  }, {
    key: "getAllMentors",
    value: function () {
      var _getAllMentors = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_mentor["default"].length === 0)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", false);

              case 2:
                return _context2.abrupt("return", _mentor["default"]);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getAllMentors() {
        return _getAllMentors.apply(this, arguments);
      }

      return getAllMentors;
    }()
  }, {
    key: "findById",
    value: function () {
      var _findById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(userId) {
        var obj;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                obj = _mentor["default"].find(function (o) {
                  return o.userId === parseInt(userId);
                });

                if (obj) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", false);

              case 3:
                return _context3.abrupt("return", obj);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function findById(_x2) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }]);

  return MentorModel;
}();

var _default = MentorModel;
exports["default"] = _default;