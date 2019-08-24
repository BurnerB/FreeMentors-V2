"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Responses =
/*#__PURE__*/
function () {
  function Responses() {
    _classCallCheck(this, Responses);
  }

  _createClass(Responses, null, [{
    key: "authsuccess",
    value: function authsuccess(statusCode, message, data, res) {
      res.status(statusCode).json({
        status: statusCode,
        message: message,
        data: data
      });
    } // static handleSuccess(statusCode, message, data, res) {
    //   res.status(statusCode).json({
    //     status: statusCode,
    //     message,
    //     data,
    //   });
    // }

  }, {
    key: "success",
    value: function success(statusCode, message, res) {
      res.status(statusCode).json({
        status: statusCode,
        data: message
      });
    }
  }, {
    key: "handleError",
    value: function handleError(statusCode, message, res) {
      res.status(statusCode).json({
        status: statusCode,
        error: message
      });
    }
  }, {
    key: "validationError",
    value: function validationError(statusCode, data, res) {
      res.status(statusCode).json({
        status: statusCode,
        error: data
      });
    }
  }, {
    key: "catchError",
    value: function catchError(statusCode, data, res) {
      res.status(statusCode).json({
        status: statusCode,
        error: data
      });
    }
  }]);

  return Responses;
}();

var _default = Responses;
exports["default"] = _default;