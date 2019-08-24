"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sessions = _interopRequireDefault(require("../db/sessions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SessionModel =
/*#__PURE__*/
function () {
  function SessionModel(mentorId, menteeId, questions, menteeEmail) {
    _classCallCheck(this, SessionModel);

    this.sessionId = _sessions["default"].length + 1;
    this.mentorId = mentorId;
    this.menteeId = menteeId;
    this.questions = questions;
    this.menteeEmail = menteeEmail;
    this.status = 'pending';
  }

  _createClass(SessionModel, [{
    key: "requestSession",
    value: function () {
      var _requestSession = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var session, obj;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                session = {
                  sessionId: this.sessionId,
                  mentorId: this.mentorId,
                  menteeId: this.menteeId,
                  questions: this.questions,
                  menteeEmail: this.menteeEmail,
                  status: this.status
                };
                obj = _sessions["default"].find(function (o) {
                  return o.mentorId === _this.mentorId && o.menteeId === _this.menteeId;
                });

                if (obj) {
                  _context.next = 5;
                  break;
                }

                _sessions["default"].push(session);

                return _context.abrupt("return", session);

              case 5:
                return _context.abrupt("return", false);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function requestSession() {
        return _requestSession.apply(this, arguments);
      }

      return requestSession;
    }()
  }], [{
    key: "findById",
    value: function () {
      var _findById = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(sessionId) {
        var obj;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                obj = _sessions["default"].find(function (o) {
                  return o.sessionId === parseInt(sessionId);
                });

                if (obj) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", false);

              case 3:
                return _context2.abrupt("return", obj);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function findById(_x) {
        return _findById.apply(this, arguments);
      }

      return findById;
    }()
  }, {
    key: "wasRequested",
    value: function () {
      var _wasRequested = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(sessionId, mentorId) {
        var obj;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                obj = _sessions["default"].find(function (o) {
                  return o.sessionId === parseInt(sessionId) && o.mentorId === parseInt(mentorId);
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

      function wasRequested(_x2, _x3) {
        return _wasRequested.apply(this, arguments);
      }

      return wasRequested;
    }()
  }, {
    key: "acceptSession",
    value: function () {
      var _acceptSession = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(session) {
        var accepted;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(session.status !== 'pending')) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", [false, session]);

              case 2:
                accepted = {
                  sessionId: session.sessionId,
                  mentorId: session.mentorId,
                  menteeId: session.menteeId,
                  questions: session.questions,
                  menteeEmail: session.menteeEmail,
                  status: 'accepted'
                };

                _sessions["default"].splice(session.sessionId - 1, 1, accepted);

                return _context4.abrupt("return", accepted);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function acceptSession(_x4) {
        return _acceptSession.apply(this, arguments);
      }

      return acceptSession;
    }()
  }, {
    key: "rejectSession",
    value: function () {
      var _rejectSession = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(session) {
        var rejected;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(session.status !== 'pending')) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", [false, session]);

              case 2:
                rejected = {
                  sessionId: session.sessionId,
                  mentorId: session.mentorId,
                  menteeId: session.menteeId,
                  questions: session.questions,
                  menteeEmail: session.menteeEmail,
                  status: 'rejected'
                };

                _sessions["default"].splice(session.sessionId - 1, 1, rejected);

                return _context5.abrupt("return", rejected);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function rejectSession(_x5) {
        return _rejectSession.apply(this, arguments);
      }

      return rejectSession;
    }()
  }, {
    key: "getUserSessions",
    value: function () {
      var _getUserSessions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(menteeId) {
        var obj;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                obj = _sessions["default"].filter(function (o) {
                  return o.menteeId === parseInt(menteeId);
                });

                if (obj) {
                  _context6.next = 3;
                  break;
                }

                return _context6.abrupt("return", false);

              case 3:
                return _context6.abrupt("return", obj);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function getUserSessions(_x6) {
        return _getUserSessions.apply(this, arguments);
      }

      return getUserSessions;
    }()
  }, {
    key: "getMentorSessions",
    value: function () {
      var _getMentorSessions = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(mentorId) {
        var obj;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                obj = _sessions["default"].filter(function (o) {
                  return o.mentorId === parseInt(mentorId);
                });

                if (obj) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", false);

              case 3:
                return _context7.abrupt("return", obj);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function getMentorSessions(_x7) {
        return _getMentorSessions.apply(this, arguments);
      }

      return getMentorSessions;
    }()
  }]);

  return SessionModel;
}();

var _default = SessionModel;
exports["default"] = _default;