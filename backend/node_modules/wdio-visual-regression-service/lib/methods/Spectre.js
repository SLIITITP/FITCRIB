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

var _BaseCompare2 = require('./BaseCompare');

var _BaseCompare3 = _interopRequireDefault(_BaseCompare2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _nodeclientSpectre = require('nodeclient-spectre');

var _nodeclientSpectre2 = _interopRequireDefault(_nodeclientSpectre);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)('wdio-visual-regression-service:Spectre');
var runtimeConfigName = 'spectre-run';

var Spectre = function (_BaseCompare) {
  (0, _inherits3.default)(Spectre, _BaseCompare);

  function Spectre() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, Spectre);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Spectre.__proto__ || (0, _getPrototypeOf2.default)(Spectre)).call(this));

    _this.fuzzLevel = _lodash2.default.get(options, 'fuzzLevel', 30);
    _this.spectreURL = options.url;
    _this.project = options.project;
    _this.suite = options.suite;
    _this.test = options.test;
    _this.browser = options.browser;
    _this.size = options.size;
    _this.spectreClient = new _nodeclientSpectre2.default(_this.spectreURL);
    return _this;
  }

  (0, _createClass3.default)(Spectre, [{
    key: 'onPrepare',
    value: function onPrepare() {
      var creationOptions, result;
      return _regenerator2.default.async(function onPrepare$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              creationOptions = 'Api-Url: ' + this.spectreURL + ', Project: ' + this.project + ', Suite: ' + this.suite;

              log(creationOptions + ' - Creating testrun');
              _context.next = 4;
              return _regenerator2.default.awrap(this.spectreClient.createTestrun(this.project, this.suite));

            case 4:
              result = _context.sent;

              log(creationOptions + ' - Testrun created - Run-Id: #' + result.id);
              this.saveRuntimeConfig(runtimeConfigName, result);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'processScreenshot',
    value: function processScreenshot(context, base64Screenshot) {
      var runDetails, testrunID, test, browser, size, fuzzLevel, url, uploadName, result;
      return _regenerator2.default.async(function processScreenshot$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator2.default.awrap(this.getRuntimeConfig(runtimeConfigName));

            case 2:
              runDetails = _context2.sent;
              testrunID = runDetails.id;
              test = this.test(context);
              browser = this.browser(context);
              size = this.size(context);
              fuzzLevel = _lodash2.default.get(context, 'options.fuzzLevel', this.fuzzLevel) + '%';
              url = _lodash2.default.get(context, 'meta.url', undefined);
              uploadName = 'Run-Id: #' + testrunID + ', Test: ' + test + ', Url: ' + url + ', Browser: ' + browser + ', Size: ' + size + ', Fuzz-Level: ' + fuzzLevel;

              log(uploadName + ' - Starting upload');

              _context2.next = 13;
              return _regenerator2.default.awrap(this.spectreClient.submitScreenshot(test, browser, size, base64Screenshot, testrunID, '', url, fuzzLevel));

            case 13:
              result = _context2.sent;

              log(uploadName + ' - Upload successful');

              if (!result.pass) {
                _context2.next = 20;
                break;
              }

              log(uploadName + ' - Image is within tolerance or the same');
              return _context2.abrupt('return', this.createResultReport(result.diff, result.pass, true));

            case 20:
              log(uploadName + ' - Image is different! ' + result.diff + '%');
              return _context2.abrupt('return', this.createResultReport(result.diff, result.pass, true));

            case 22:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'onComplete',
    value: function onComplete() {
      return _regenerator2.default.async(function onComplete$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator2.default.awrap(this.cleanUpRuntimeConfigs());

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);
  return Spectre;
}(_BaseCompare3.default);

exports.default = Spectre;