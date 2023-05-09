'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _BaseCompare2 = require('./BaseCompare');

var _BaseCompare3 = _interopRequireDefault(_BaseCompare2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)('wdio-visual-regression-service:SaveScreenshot');

var SaveScreenshot = function (_BaseCompare) {
  (0, _inherits3.default)(SaveScreenshot, _BaseCompare);

  function SaveScreenshot() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, SaveScreenshot);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SaveScreenshot.__proto__ || (0, _getPrototypeOf2.default)(SaveScreenshot)).call(this));

    _this.getScreenshotFile = options.screenshotName;
    return _this;
  }

  (0, _createClass3.default)(SaveScreenshot, [{
    key: 'processScreenshot',
    value: function processScreenshot(context, base64Screenshot) {
      var screenshotPath;
      return _regenerator2.default.async(function processScreenshot$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              screenshotPath = this.getScreenshotFile(context);


              log('create screenshot file at ' + screenshotPath);
              _context.next = 4;
              return _regenerator2.default.awrap(_fsExtra2.default.outputFile(screenshotPath, base64Screenshot, 'base64'));

            case 4:
              return _context.abrupt('return', this.createResultReport(0, true, true));

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);
  return SaveScreenshot;
}(_BaseCompare3.default);

exports.default = SaveScreenshot;