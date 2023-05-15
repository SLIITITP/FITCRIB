'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CropDimension = function () {
  function CropDimension(width, height, x, y) {
    var top = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
    var rotation = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    (0, _classCallCheck3.default)(this, CropDimension);

    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.top = top;
    this.rotation = rotation;
  }

  (0, _createClass3.default)(CropDimension, [{
    key: 'getWidth',
    value: function getWidth() {
      return this.width;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.height;
    }
  }, {
    key: 'getX',
    value: function getX() {
      return this.x;
    }
  }, {
    key: 'getY',
    value: function getY() {
      return this.y;
    }
  }, {
    key: 'getGravity',
    value: function getGravity() {
      return this.top ? 'NorthWest' : 'SouthWest';
    }
  }, {
    key: 'getRotation',
    value: function getRotation() {
      return this.rotation;
    }
  }]);
  return CropDimension;
}();

exports.default = CropDimension;