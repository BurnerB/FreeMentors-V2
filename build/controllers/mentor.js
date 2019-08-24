"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _responses = _interopRequireDefault(require("../helpers/responses"));

var _mentorModel = _interopRequireDefault(require("../models/mentorModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Mentor =
/*#__PURE__*/
function () {
  function Mentor() {
    _classCallCheck(this, Mentor);
  }

  _createClass(Mentor, null, [{
    key: "getAllMentors",
    value: function () {
      var _getAllMentors = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var mentors;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _mentorModel["default"].getAllMentors();

              case 3:
                mentors = _context.sent;

                if (mentors) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", _responses["default"].handleError(404, 'No Mentors found', res));

              case 6:
                // console.log(user);
                mentors.forEach(function (mentor) {
                  delete mentor.password;
                });
                return _context.abrupt("return", _responses["default"].success(200, mentors, res));

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _responses["default"].catchError(500, _context.t0.toString(), res));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 10]]);
      }));

      function getAllMentors(_x, _x2) {
        return _getAllMentors.apply(this, arguments);
      }

      return getAllMentors;
    }()
  }, {
    key: "getSpecificMentors",
    value: function () {
      var _getSpecificMentors = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var mentorId, mentor, password, noA;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                mentorId = req.params.mentorId;
                _context2.next = 4;
                return _mentorModel["default"].findById(mentorId);

              case 4:
                mentor = _context2.sent;

                if (mentor) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", _responses["default"].handleError(404, 'No Mentor with that ID found', res));

              case 7:
                password = mentor.password, noA = _objectWithoutProperties(mentor, ["password"]);
                return _context2.abrupt("return", _responses["default"].success(200, noA, res));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _responses["default"].catchError(500, _context2.t0.toString(), res));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 11]]);
      }));

      function getSpecificMentors(_x3, _x4) {
        return _getSpecificMentors.apply(this, arguments);
      }

      return getSpecificMentors;
    }()
  }]);

  return Mentor;
}();

var _default = Mentor;
exports["default"] = _default;