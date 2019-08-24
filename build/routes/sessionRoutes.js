"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _session = _interopRequireDefault(require("../controllers/session"));

var _sessionValidation = _interopRequireDefault(require("../middleware/sessionValidation"));

var _authToken = _interopRequireDefault(require("../middleware/authToken"));

var _mentor = _interopRequireDefault(require("../middleware/mentor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/sessions', _authToken["default"], _sessionValidation["default"].validateSessions, _session["default"].requestSession);
router.patch('/sessions/:sessionId/accept', [_authToken["default"], _mentor["default"]], _session["default"].chooseSession);
router.patch('/sessions/:sessionId/reject', [_authToken["default"], _mentor["default"]], _session["default"].chooseSession);
router.get('/sessions', [_authToken["default"]], _session["default"].getallSessions);
var _default = router;
exports["default"] = _default;