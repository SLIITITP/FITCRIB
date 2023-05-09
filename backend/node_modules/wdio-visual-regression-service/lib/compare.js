'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _LocalCompare = require('./methods/LocalCompare');

Object.defineProperty(exports, 'LocalCompare', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_LocalCompare).default;
  }
});

var _SaveScreenshot = require('./methods/SaveScreenshot');

Object.defineProperty(exports, 'SaveScreenshot', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SaveScreenshot).default;
  }
});

var _Spectre = require('./methods/Spectre');

Object.defineProperty(exports, 'Spectre', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Spectre).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }