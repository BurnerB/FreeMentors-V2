"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _mentor = _interopRequireDefault(require("../controllers/mentor"));

var _userValidation = _interopRequireDefault(require("../middleware/userValidation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/auth/signup', _userValidation["default"].validateSignup, _user["default"].registerUser);
router.post('/auth/signin', _userValidation["default"].validateLogin, _user["default"].userLogin);
router.get('/mentors', _mentor["default"].getAllMentors);
router.get('/mentors/:mentorId', _mentor["default"].getSpecificMentors);
var _default = router;
exports["default"] = _default;