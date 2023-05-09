'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _CropDimension = require('./CropDimension');

var _CropDimension2 = _interopRequireDefault(_CropDimension);

var _getBase64ImageSize = require('./getBase64ImageSize');

var _getBase64ImageSize2 = _interopRequireDefault(_getBase64ImageSize);

var _image = require('./image');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function normalizeRetinaScreenshot(browser, screenDimensions, base64Screenshot) {
  var size, imageSizeMax, imageSizeMin, viewportSizeMax, viewportSizeMin, isImageScaled, normalizedScreenshot;
  return _regenerator2.default.async(function normalizeRetinaScreenshot$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // check if image dimensions are different to viewport as browsers like firefox scales images automatically down
          size = (0, _getBase64ImageSize2.default)(base64Screenshot);
          imageSizeMax = Math.max(size.width, size.height);
          imageSizeMin = Math.min(size.width, size.height);
          viewportSizeMax = screenDimensions.applyScaleFactor(Math.max(screenDimensions.getViewportWidth(), screenDimensions.getViewportHeight()));
          viewportSizeMin = screenDimensions.applyScaleFactor(Math.min(screenDimensions.getViewportWidth(), screenDimensions.getViewportHeight()));
          isImageScaled = imageSizeMax !== viewportSizeMax && imageSizeMin !== viewportSizeMin;

          if (!isImageScaled) {
            _context.next = 11;
            break;
          }

          _context.next = 9;
          return _regenerator2.default.awrap((0, _image.scaleImage)(base64Screenshot, 1 / screenDimensions.getPixelRatio()));

        case 9:
          normalizedScreenshot = _context.sent;
          return _context.abrupt('return', normalizedScreenshot);

        case 11:
          return _context.abrupt('return', base64Screenshot);

        case 12:
        case 'end':
          return _context.stop();
      }
    }
  }, null, this);
}

function normalizeIOSScreenshot(browser, screenDimensions, base64Screenshot) {
  var toolbarHeight, addressbarHeight, viewportHeight, viewportWidth, isIpad, isIphone, barsShown, barsHeight, size, deviceInLandscape, screenshotInLandscape, rotation, cropDimensions, croppedBase64Screenshot;
  return _regenerator2.default.async(function normalizeIOSScreenshot$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          toolbarHeight = 44; // bottom toolbar has always a fixed height of 44px

          addressbarHeight = 44; // bottom toolbar has always a fixed height of 44px

          viewportHeight = screenDimensions.applyScaleFactor(screenDimensions.getViewportHeight());
          viewportWidth = screenDimensions.applyScaleFactor(screenDimensions.getViewportWidth());

          // all iPad's have 1024..

          isIpad = screenDimensions.getScreenHeight() === 1024 || screenDimensions.getScreenWidth() === 1024;
          isIphone = !isIpad;

          // detect if status bar + navigation bar is shown

          barsShown = viewportHeight < screenDimensions.getScreenHeight();
          barsHeight = 0;


          if (barsShown) {
            // calculate height of status + addressbar
            barsHeight = screenDimensions.getScreenHeight() - viewportHeight;

            if (isIphone && barsHeight > addressbarHeight) {
              // iPhone's have also sometimes toolbar at the bottom when navigation bar is shown, need to consider that
              barsHeight -= toolbarHeight;
            }
          }

          size = (0, _getBase64ImageSize2.default)(base64Screenshot);
          deviceInLandscape = screenDimensions.getScreenWidth() > screenDimensions.getScreenHeight();
          screenshotInLandscape = size.width > size.height;
          rotation = deviceInLandscape === screenshotInLandscape ? 0 : 270;

          if (!(barsHeight > 0 || rotation > 0)) {
            _context2.next = 19;
            break;
          }

          // crop only when necessary
          cropDimensions = new _CropDimension2.default(viewportWidth, viewportHeight, 0, barsHeight, true, rotation);
          _context2.next = 17;
          return _regenerator2.default.awrap((0, _image.cropImage)(base64Screenshot, cropDimensions));

        case 17:
          croppedBase64Screenshot = _context2.sent;
          return _context2.abrupt('return', croppedBase64Screenshot);

        case 19:
          return _context2.abrupt('return', base64Screenshot);

        case 20:
        case 'end':
          return _context2.stop();
      }
    }
  }, null, this);
}

exports.default = function normalizeSreenshot(browser, screenDimensions, base64Screenshot) {
  var normalizedScreenshot;
  return _regenerator2.default.async(function normalizeSreenshot$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          normalizedScreenshot = base64Screenshot;

          // check if we could have a retina image

          if (!(screenDimensions.getPixelRatio() > 1)) {
            _context3.next = 5;
            break;
          }

          _context3.next = 4;
          return _regenerator2.default.awrap(normalizeRetinaScreenshot(browser, screenDimensions, normalizedScreenshot));

        case 4:
          normalizedScreenshot = _context3.sent;

        case 5:
          if (!(browser.isMobile && browser.isIOS)) {
            _context3.next = 9;
            break;
          }

          _context3.next = 8;
          return _regenerator2.default.awrap(normalizeIOSScreenshot(browser, screenDimensions, normalizedScreenshot));

        case 8:
          normalizedScreenshot = _context3.sent;

        case 9:
          return _context3.abrupt('return', normalizedScreenshot);

        case 10:
        case 'end':
          return _context3.stop();
      }
    }
  }, null, this);
};