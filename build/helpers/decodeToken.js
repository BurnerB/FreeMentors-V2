"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Decoded =
/*#__PURE__*/
function () {
  function Decoded() {
    _classCallCheck(this, Decoded);
  }

  _createClass(Decoded, null, [{
    key: "decodeToken",
    value: function decodeToken(payload) {
      var token = payload.split(' ')[1];

      var decoded = _jsonwebtoken["default"].verify(token, process.env.JWT_KEY);

      return decoded;
    }
  }]);

  return Decoded;
}();

var _default = Decoded;
exports["default"] = _default;