'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _ScreenshotStrategyManager = require('../utils/ScreenshotStrategyManager');

var _ScreenshotStrategyManager2 = _interopRequireDefault(_ScreenshotStrategyManager);

var _getScreenDimensions = require('../scripts/getScreenDimensions');

var _getScreenDimensions2 = _interopRequireDefault(_getScreenDimensions);

var _virtualScroll = require('../scripts/virtualScroll');

var _virtualScroll2 = _interopRequireDefault(_virtualScroll);

var _pageHeight = require('../scripts/pageHeight');

var _pageHeight2 = _interopRequireDefault(_pageHeight);

var _generateUUID = require('../utils/generateUUID');

var _generateUUID2 = _interopRequireDefault(_generateUUID);

var _saveBase64Image = require('../utils/saveBase64Image');

var _saveBase64Image2 = _interopRequireDefault(_saveBase64Image);

var _image = require('../utils/image');

var _ScreenDimension = require('../utils/ScreenDimension');

var _ScreenDimension2 = _interopRequireDefault(_ScreenDimension);

var _normalizeScreenshot = require('../utils/normalizeScreenshot');

var _normalizeScreenshot2 = _interopRequireDefault(_normalizeScreenshot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)('wdio-screenshot:makeAreaScreenshot');
var tmpDir = _path2.default.join(__dirname, '..', '..', '.tmp');

function storeScreenshot(browser, screenDimensions, cropDimensions, base64Screenshot, filePath) {
  var normalizedBase64Screenshot, croppedBase64Screenshot;
  return _regenerator2.default.async(function storeScreenshot$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _regenerator2.default.awrap((0, _normalizeScreenshot2.default)(browser, screenDimensions, base64Screenshot));

        case 2:
          normalizedBase64Screenshot = _context.sent;

          log('crop screenshot with width: %s, height: %s, offsetX: %s, offsetY: %s', cropDimensions.getWidth(), cropDimensions.getHeight(), cropDimensions.getX(), cropDimensions.getY());

          _context.next = 6;
          return _regenerator2.default.awrap((0, _image.cropImage)(normalizedBase64Screenshot, cropDimensions));

        case 6:
          croppedBase64Screenshot = _context.sent;
          _context.next = 9;
          return _regenerator2.default.awrap((0, _saveBase64Image2.default)(filePath, croppedBase64Screenshot));

        case 9:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
}

exports.default = function makeAreaScreenshot(browser, startX, startY, endX, endY) {
  var _this = this;

  var screenDimensions, screenDimension, screenshotStrategy, uuid, dir, cropImages, screenshotPromises, loop, _screenshotStrategy$g, x, y, indexX, indexY, base64Screenshot, cropDimensions, filePath, _ref, _ref2, mergedBase64Screenshot;

  return _regenerator2.default.async(function makeAreaScreenshot$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          log('requested a screenshot for the following area: %j', { startX: startX, startY: startY, endX: endX, endY: endY });

          _context4.next = 3;
          return _regenerator2.default.awrap(browser.execute(_getScreenDimensions2.default));

        case 3:
          screenDimensions = _context4.sent.value;

          log('detected screenDimensions %j', screenDimensions);
          screenDimension = new _ScreenDimension2.default(screenDimensions, browser);
          screenshotStrategy = _ScreenshotStrategyManager2.default.getStrategy(browser, screenDimension);

          screenshotStrategy.setScrollArea(startX, startY, endX, endY);

          uuid = (0, _generateUUID2.default)();
          dir = _path2.default.join(tmpDir, uuid);
          _context4.prev = 10;
          _context4.next = 13;
          return _regenerator2.default.awrap(_fsExtra2.default.ensureDir(dir));

        case 13:
          cropImages = [];
          screenshotPromises = [];


          log('set page height to %s px', screenDimension.getDocumentHeight());
          _context4.next = 18;
          return _regenerator2.default.awrap(browser.execute(_pageHeight2.default, screenDimension.getDocumentHeight() + 'px'));

        case 18:
          loop = false;

        case 19:
          _screenshotStrategy$g = screenshotStrategy.getScrollPosition(), x = _screenshotStrategy$g.x, y = _screenshotStrategy$g.y, indexX = _screenshotStrategy$g.indexX, indexY = _screenshotStrategy$g.indexY;

          log('scroll to coordinates x: %s, y: %s for index x: %s, y: %s', x, y, indexX, indexY);

          _context4.next = 23;
          return _regenerator2.default.awrap(browser.execute(_virtualScroll2.default, x, y, false));

        case 23:
          _context4.next = 25;
          return _regenerator2.default.awrap(browser.pause(100));

        case 25:

          log('take screenshot');
          _context4.next = 28;
          return _regenerator2.default.awrap(browser.screenshot());

        case 28:
          base64Screenshot = _context4.sent.value;
          cropDimensions = screenshotStrategy.getCropDimensions();
          filePath = _path2.default.join(dir, indexY + '-' + indexX + '.png');


          screenshotPromises.push(storeScreenshot(browser, screenDimension, cropDimensions, base64Screenshot, filePath));

          if (!Array.isArray(cropImages[indexY])) {
            cropImages[indexY] = [];
          }

          cropImages[indexY][indexX] = filePath;

          loop = screenshotStrategy.hasNextScrollPosition();
          screenshotStrategy.moveToNextScrollPosition();

        case 36:
          if (loop) {
            _context4.next = 19;
            break;
          }

        case 37:
          _context4.next = 39;
          return _regenerator2.default.awrap(_promise2.default.all([_promise2.default.resolve().then(function _callee() {
            var mergedBase64Screenshot;
            return _regenerator2.default.async(function _callee$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return _regenerator2.default.awrap(_promise2.default.all(screenshotPromises));

                  case 2:
                    log('merge images togehter');
                    _context2.next = 5;
                    return _regenerator2.default.awrap((0, _image.mergeImages)(cropImages));

                  case 5:
                    mergedBase64Screenshot = _context2.sent;

                    log('remove temp dir');
                    _context2.next = 9;
                    return _regenerator2.default.awrap(_fsExtra2.default.remove(dir));

                  case 9:
                    return _context2.abrupt('return', mergedBase64Screenshot);

                  case 10:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, null, _this);
          }), _promise2.default.resolve().then(function _callee2() {
            return _regenerator2.default.async(function _callee2$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    log('reset page height');
                    _context3.next = 3;
                    return _regenerator2.default.awrap(browser.execute(_pageHeight2.default, ''));

                  case 3:

                    log('revert scroll to x: %s, y: %s', 0, 0);
                    _context3.next = 6;
                    return _regenerator2.default.awrap(browser.execute(_virtualScroll2.default, 0, 0, true));

                  case 6:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, null, _this);
          })]));

        case 39:
          _ref = _context4.sent;
          _ref2 = (0, _slicedToArray3.default)(_ref, 1);
          mergedBase64Screenshot = _ref2[0];
          return _context4.abrupt('return', mergedBase64Screenshot);

        case 45:
          _context4.prev = 45;
          _context4.t0 = _context4['catch'](10);
          _context4.prev = 47;
          _context4.next = 50;
          return _regenerator2.default.awrap(_fsExtra2.default.remove(dir));

        case 50:
          _context4.next = 54;
          break;

        case 52:
          _context4.prev = 52;
          _context4.t1 = _context4['catch'](47);

        case 54:
          throw _context4.t0;

        case 55:
        case 'end':
          return _context4.stop();
      }
    }
  }, null, this, [[10, 45], [47, 52]]);
};