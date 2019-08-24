"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _admin = _interopRequireDefault(require("../controllers/admin"));

var _authToken = _interopRequireDefault(require("../middleware/authToken"));

var _admin2 = _interopRequireDefault(require("../middleware/admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.patch('/user/:userId', [_authToken["default"], _admin2["default"]], _admin["default"].makeMentor);
var _default = router;
exports["default"] = _default;