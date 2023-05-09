'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _BaseStrategy2 = require('./BaseStrategy');

var _BaseStrategy3 = _interopRequireDefault(_BaseStrategy2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1px x 3 for retina
var NAV_SHADOW_CONST = 5;
// shadow is cast from top nav bar and bottom nav bar
var NAV_SHADOW_CONST_COMBINED = NAV_SHADOW_CONST * 2;

exports.consts = {
  NAV_SHADOW_CONST: NAV_SHADOW_CONST,
  NAV_SHADOW_CONST_COMBINED: NAV_SHADOW_CONST_COMBINED
};

var TrimAndMergeScreenshotStrategy = function (_BaseStrategy) {
  (0, _inherits3.default)(TrimAndMergeScreenshotStrategy, _BaseStrategy);

  function TrimAndMergeScreenshotStrategy() {
    (0, _classCallCheck3.default)(this, TrimAndMergeScreenshotStrategy);
    return (0, _possibleConstructorReturn3.default)(this, (TrimAndMergeScreenshotStrategy.__proto__ || (0, _getPrototypeOf2.default)(TrimAndMergeScreenshotStrategy)).apply(this, arguments));
  }

  (0, _createClass3.default)(TrimAndMergeScreenshotStrategy, [{
    key: 'hasNextHorizontalScrollPosition',
    value: function hasNextHorizontalScrollPosition() {
      var width = this.area.endX - this.area.startX;
      return width > this.index.x * this.screenDimensions.getViewportWidth() + this.screenDimensions.getViewportWidth();
    }
  }, {
    key: 'hasNextVerticalScrollPosition',
    value: function hasNextVerticalScrollPosition() {
      var height = this.area.endY - this.area.startY;
      return height > this.index.y * this.screenDimensions.getViewportHeight() + this.screenDimensions.getViewportHeight();
    }
  }, {
    key: 'getScrollPosition',
    value: function getScrollPosition() {
      var viewportWidth = this.screenDimensions.getViewportWidth();
      var viewportHeight = this.screenDimensions.getViewportHeight() - NAV_SHADOW_CONST_COMBINED;
      if (this.index.y === 0 && !this.hasNextVerticalScrollPosition()) {
        viewportHeight = this.screenDimensions.getViewportHeight();
      }

      return {
        x: this.area.startX + this.index.x * viewportWidth,
        y: this.area.startY + this.index.y * viewportHeight,
        indexX: this.index.x,
        indexY: this.index.y
      };
    }
  }, {
    key: 'getCropDimensions',
    value: function getCropDimensions() {
      var viewportWidth = this.screenDimensions.getViewportWidth();
      var viewportHeight = this.screenDimensions.getViewportHeight();

      var _area = this.area,
          startX = _area.startX,
          startY = _area.startY,
          endX = _area.endX,
          endY = _area.endY;
      var _index = this.index,
          x = _index.x,
          y = _index.y;


      var wantedWidth = endX - startX - x * viewportWidth;
      var width = wantedWidth > viewportWidth ? viewportWidth : wantedWidth;

      var viewPortHeightMinusNavs = viewportHeight - NAV_SHADOW_CONST_COMBINED;
      var wantedHeight = endY - startY - y * viewPortHeightMinusNavs;
      var height = wantedHeight > viewPortHeightMinusNavs ? viewportHeight : wantedHeight;

      var finalHeight = void 0,
          topTrim = void 0;
      if (y === 0 && !this.hasNextVerticalScrollPosition()) {
        // First AND Last
        // Do not trim top or bottom
        topTrim = 0;
        finalHeight = height;
      } else if (y === 0) {
        // First BUT NOT Last
        // Do not trim top, but do trim bottom
        topTrim = 0;
        finalHeight = height - NAV_SHADOW_CONST;
      } else if (!this.hasNextVerticalScrollPosition()) {
        // Last BUT NOT First
        // Do not trim bottom, but do trim top
        topTrim = NAV_SHADOW_CONST;
        finalHeight = height - NAV_SHADOW_CONST;
      } else {
        // Neither First Nor Last
        // Trim both top and bottom
        topTrim = NAV_SHADOW_CONST;
        finalHeight = height - NAV_SHADOW_CONST_COMBINED;
      }

      return this.createCropDimensions(width, finalHeight, 0, topTrim, true, 0);
    }
  }]);
  return TrimAndMergeScreenshotStrategy;
}(_BaseStrategy3.default);

exports.default = TrimAndMergeScreenshotStrategy;