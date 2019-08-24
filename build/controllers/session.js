"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _responses = _interopRequireDefault(require("../helpers/responses"));

var _sessionModel = _interopRequireDefault(require("../models/sessionModel"));

var _mentorModel = _interopRequireDefault(require("../models/mentorModel"));

var _decodeToken = _interopRequireDefault(require("../helpers/decodeToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Sessions =
/*#__PURE__*/
function () {
  function Sessions() {
    _classCallCheck(this, Sessions);
  }

  _createClass(Sessions, null, [{
    key: "requestSession",
    value: function () {
      var _requestSession = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, mentorId, questions, decoded, userId, email, newSession, session;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, mentorId = _req$body.mentorId, questions = _req$body.questions; // console.log(questions);

                _context.next = 4;
                return _mentorModel["default"].findById(mentorId);

              case 4:
                if (_context.sent) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return", _responses["default"].handleError(404, 'No Mentor with that ID found', res));

              case 6:
                decoded = _decodeToken["default"].decodeToken(req.headers.authorization);
                userId = decoded.userId, email = decoded.email;
                newSession = new _sessionModel["default"](parseInt(mentorId), userId, questions, email); // console.log(newSession);

                _context.next = 11;
                return newSession.requestSession();

              case 11:
                session = _context.sent;

                if (session) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt("return", _responses["default"].handleError(400, 'Session already requested with this mentor', res));

              case 14:
                return _context.abrupt("return", _responses["default"].success(201, session, res));

              case 17:
                _context.prev = 17;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _responses["default"].catchError(500, _context.t0.message, res));

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 17]]);
      }));

      function requestSession(_x, _x2) {
        return _requestSession.apply(this, arguments);
      }

      return requestSession;
    }()
  }, {
    key: "chooseSession",
    value: function () {
      var _chooseSession = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var sessionId, decoded, userId, sessionExist, accepted, rejected;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                sessionId = req.params.sessionId;
                decoded = _decodeToken["default"].decodeToken(req.headers.authorization);
                userId = decoded.userId;
                _context2.next = 6;
                return _sessionModel["default"].wasRequested(sessionId, userId);

              case 6:
                sessionExist = _context2.sent;

                if (sessionExist) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", _responses["default"].handleError(404, 'You have no requested session with that ID', res));

              case 9:
                if (!/accept/.test(req.url)) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 12;
                return _sessionModel["default"].acceptSession(sessionExist);

              case 12:
                accepted = _context2.sent;

                if (!(accepted[0] === false)) {
                  _context2.next = 15;
                  break;
                }

                return _context2.abrupt("return", _responses["default"].handleError(400, "Session already ".concat(accepted[1].status), res));

              case 15:
                return _context2.abrupt("return", _responses["default"].success(200, accepted, res));

              case 16:
                if (!/reject/.test(req.url)) {
                  _context2.next = 23;
                  break;
                }

                _context2.next = 19;
                return _sessionModel["default"].rejectSession(sessionExist);

              case 19:
                rejected = _context2.sent;

                if (!(rejected[0] === false)) {
                  _context2.next = 22;
                  break;
                }

                return _context2.abrupt("return", _responses["default"].handleError(400, "Session already ".concat(rejected[1].status), res));

              case 22:
                return _context2.abrupt("return", _responses["default"].success(200, rejected, res));

              case 23:
                _context2.next = 28;
                break;

              case 25:
                _context2.prev = 25;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", _responses["default"].catchError(500, _context2.t0.message, res));

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 25]]);
      }));

      function chooseSession(_x3, _x4) {
        return _chooseSession.apply(this, arguments);
      }

      return chooseSession;
    }()
  }, {
    key: "getallSessions",
    value: function () {
      var _getallSessions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var decoded, userId, isMentor, sessions, _sessions;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                decoded = _decodeToken["default"].decodeToken(req.headers.authorization);
                userId = decoded.userId, isMentor = decoded.isMentor; // console.log(decoded);

                if (!(isMentor === false)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 6;
                return _sessionModel["default"].getUserSessions(userId);

              case 6:
                sessions = _context3.sent;

                if (sessions) {
                  _context3.next = 9;
                  break;
                }

                return _context3.abrupt("return", _responses["default"].handleError(404, 'You have no requested sessions', res));

              case 9:
                return _context3.abrupt("return", _responses["default"].success(200, sessions, res));

              case 10:
                if (!(isMentor === true)) {
                  _context3.next = 17;
                  break;
                }

                _context3.next = 13;
                return _sessionModel["default"].getMentorSessions(userId);

              case 13:
                _sessions = _context3.sent;

                if (_sessions) {
                  _context3.next = 16;
                  break;
                }

                return _context3.abrupt("return", _responses["default"].handleError(404, 'You have no sessions requested', res));

              case 16:
                return _context3.abrupt("return", _responses["default"].success(200, _sessions, res));

              case 17:
                _context3.next = 22;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", _responses["default"].catchError(500, _context3.t0.message, res));

              case 22:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 19]]);
      }));

      function getallSessions(_x5, _x6) {
        return _getallSessions.apply(this, arguments);
      }

      return getallSessions;
    }()
  }]);

  return Sessions;
}();

var _default = Sessions;
exports["default"] = _default;