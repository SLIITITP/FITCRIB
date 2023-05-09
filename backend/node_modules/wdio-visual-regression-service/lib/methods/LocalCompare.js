'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _nodeResembleJs = require('node-resemble-js');

var _nodeResembleJs2 = _interopRequireDefault(_nodeResembleJs);

var _BaseCompare2 = require('./BaseCompare');

var _BaseCompare3 = _interopRequireDefault(_BaseCompare2);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)('wdio-visual-regression-service:LocalCompare');

var LocalCompare = function (_BaseCompare) {
  (0, _inherits3.default)(LocalCompare, _BaseCompare);

  function LocalCompare() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck3.default)(this, LocalCompare);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LocalCompare.__proto__ || (0, _getPrototypeOf2.default)(LocalCompare)).call(this));

    _this.getScreenshotFile = options.screenshotName;
    _this.getReferencefile = options.referenceName;
    _this.getDiffFile = options.diffName;
    _this.misMatchTolerance = _lodash2.default.get(options, 'misMatchTolerance', 0.01);
    _this.ignoreComparison = _lodash2.default.get(options, 'ignoreComparison', 'nothing');
    return _this;
  }

  (0, _createClass3.default)(LocalCompare, [{
    key: 'processScreenshot',
    value: function processScreenshot(context, base64Screenshot) {
      var screenshotPath, referencePath, referenceExists, captured, ignoreComparison, compareData, isSameDimensions, misMatchPercentage, misMatchTolerance, diffPath, png;
      return _regenerator2.default.async(function processScreenshot$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              screenshotPath = this.getScreenshotFile(context);
              referencePath = this.getReferencefile(context);
              _context.next = 4;
              return _regenerator2.default.awrap(_fsExtra2.default.outputFile(screenshotPath, base64Screenshot, 'base64'));

            case 4:
              _context.next = 6;
              return _regenerator2.default.awrap(_fsExtra2.default.exists(referencePath));

            case 6:
              referenceExists = _context.sent;

              if (!referenceExists) {
                _context.next = 32;
                break;
              }

              log('reference exists, compare it with the taken now');
              captured = new Buffer(base64Screenshot, 'base64');
              ignoreComparison = _lodash2.default.get(context, 'options.ignoreComparison', this.ignoreComparison);
              _context.next = 13;
              return _regenerator2.default.awrap(this.compareImages(referencePath, captured, ignoreComparison));

            case 13:
              compareData = _context.sent;
              isSameDimensions = compareData.isSameDimensions;
              misMatchPercentage = Number(compareData.misMatchPercentage);
              misMatchTolerance = _lodash2.default.get(context, 'options.misMatchTolerance', this.misMatchTolerance);
              diffPath = this.getDiffFile(context);

              if (!(misMatchPercentage > misMatchTolerance)) {
                _context.next = 26;
                break;
              }

              log('Image is different! ' + misMatchPercentage + '%');
              png = compareData.getDiffImage().pack();
              _context.next = 23;
              return _regenerator2.default.awrap(this.writeDiff(png, diffPath));

            case 23:
              return _context.abrupt('return', this.createResultReport(misMatchPercentage, false, isSameDimensions));

            case 26:
              log('Image is within tolerance or the same');
              _context.next = 29;
              return _regenerator2.default.awrap(_fsExtra2.default.remove(diffPath));

            case 29:
              return _context.abrupt('return', this.createResultReport(misMatchPercentage, true, isSameDimensions));

            case 30:
              _context.next = 36;
              break;

            case 32:
              log('first run - create reference file');
              _context.next = 35;
              return _regenerator2.default.awrap(_fsExtra2.default.outputFile(referencePath, base64Screenshot, 'base64'));

            case 35:
              return _context.abrupt('return', this.createResultReport(0, true, true));

            case 36:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }

    /**
     * Compares two images with resemble
     * @param  {Buffer|string} reference path to reference file or buffer
     * @param  {Buffer|string} screenshot path to file or buffer to compare with reference
     * @return {{misMatchPercentage: Number, isSameDimensions:Boolean, getImageDataUrl: function}}
     */

  }, {
    key: 'compareImages',
    value: function compareImages(reference, screenshot) {
      var ignore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      return _regenerator2.default.async(function compareImages$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regenerator2.default.awrap(new _promise2.default(function (resolve) {
                var image = (0, _nodeResembleJs2.default)(reference).compareTo(screenshot);

                switch (ignore) {
                  case 'colors':
                    image.ignoreColors();
                    break;
                  case 'antialiasing':
                    image.ignoreAntialiasing();
                    break;
                }

                image.onComplete(function (data) {
                  resolve(data);
                });
              }));

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }

    /**
     * Writes provided diff by resemble as png
     * @param  {Stream} png node-png file Stream.
     * @return {Promise}
     */

  }, {
    key: 'writeDiff',
    value: function writeDiff(png, filepath) {
      return _regenerator2.default.async(function writeDiff$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator2.default.awrap(new _promise2.default(function (resolve, reject) {
                var chunks = [];
                png.on('data', function (chunk) {
                  chunks.push(chunk);
                });
                png.on('end', function () {
                  var buffer = Buffer.concat(chunks);

                  _promise2.default.resolve().then(function () {
                    return _fsExtra2.default.outputFile(filepath, buffer.toString('base64'), 'base64');
                  }).then(function () {
                    return resolve();
                  }).catch(reject);
                });
                png.on('error', function (err) {
                  return reject(err);
                });
              }));

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }]);
  return LocalCompare;
}(_BaseCompare3.default);

exports.default = LocalCompare;