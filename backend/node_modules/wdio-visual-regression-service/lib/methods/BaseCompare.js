'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var log = (0, _debug2.default)('wdio-visual-regression-service:BaseCompare');
var runtimeConfigPath = __dirname;

var BaseCompare = function () {
  function BaseCompare() {
    (0, _classCallCheck3.default)(this, BaseCompare);

    this.configs = new _map2.default();
  }

  /**
   * Gets executed once before all workers get launched.
   */


  (0, _createClass3.default)(BaseCompare, [{
    key: 'onPrepare',
    value: function onPrepare() {
      return _regenerator2.default.async(function onPrepare$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', _promise2.default.resolve());

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }

    /**
     * Gets executed before the tests starts.
     */

  }, {
    key: 'before',
    value: function before(context) {
      return _regenerator2.default.async(function before$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', _promise2.default.resolve());

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }

    /**
     * Gets executed immediately before the screenshot is taken.
     */

  }, {
    key: 'beforeScreenshot',
    value: function beforeScreenshot(context) {
      return _regenerator2.default.async(function beforeScreenshot$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', _promise2.default.resolve());

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }

    /**
     * Gets executed after the screenshot is taken.
     */

  }, {
    key: 'afterScreenshot',
    value: function afterScreenshot(context, base64Screenshot) {
      return _regenerator2.default.async(function afterScreenshot$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt('return', _promise2.default.resolve());

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, null, this);
    }

    /**
     * You can do here your image comparison magic.
     */

  }, {
    key: 'processScreenshot',
    value: function processScreenshot(context, base64Screenshot) {
      return _regenerator2.default.async(function processScreenshot$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt('return', _promise2.default.resolve());

            case 1:
            case 'end':
              return _context5.stop();
          }
        }
      }, null, this);
    }

    /**
     * Gets executed after all tests are done. You still have access to all global
     * variables from the test.
     */

  }, {
    key: 'after',
    value: function after() {
      return _regenerator2.default.async(function after$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt('return', _promise2.default.resolve());

            case 1:
            case 'end':
              return _context6.stop();
          }
        }
      }, null, this);
    }

    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     */

  }, {
    key: 'onComplete',
    value: function onComplete() {
      return _regenerator2.default.async(function onComplete$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt('return', _promise2.default.resolve());

            case 1:
            case 'end':
              return _context7.stop();
          }
        }
      }, null, this);
    }

    /**
     * Prepare runtime config for worker process
     */

  }, {
    key: 'saveRuntimeConfig',
    value: function saveRuntimeConfig(name, config) {
      var file;
      return _regenerator2.default.async(function saveRuntimeConfig$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              file = this.getRuntimeConfigFileName(name);

              log('Save runtime config ' + name + ' to file ' + file);
              _context8.next = 4;
              return _regenerator2.default.awrap(_fsExtra2.default.writeJson(file, config, {
                spaces: 2
              }));

            case 4:
              this.configs.set(name, config);

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, null, this);
    }

    /**
    * Read prepared runtime config from launcher process
    */

  }, {
    key: 'getRuntimeConfig',
    value: function getRuntimeConfig(name) {
      var file, config;
      return _regenerator2.default.async(function getRuntimeConfig$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (!this.configs.has(name)) {
                _context9.next = 3;
                break;
              }

              log('Read runtime config ' + name + ' from cache');
              return _context9.abrupt('return', this.configs.get(name));

            case 3:
              // otherwise read from fs
              file = this.getRuntimeConfigFileName(name);

              log('Read runtime config ' + name + ' from file ' + file);
              _context9.next = 7;
              return _regenerator2.default.awrap(_fsExtra2.default.readJson(file));

            case 7:
              config = _context9.sent;

              // and cache the result
              this.configs.set(name, config);
              return _context9.abrupt('return', config);

            case 10:
            case 'end':
              return _context9.stop();
          }
        }
      }, null, this);
    }

    /**
    * Remove runtime config
    */

  }, {
    key: 'removeRuntimeConfig',
    value: function removeRuntimeConfig(name) {
      var file;
      return _regenerator2.default.async(function removeRuntimeConfig$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              // delete from fs
              file = this.getRuntimeConfigFileName(name);

              log('Remove runtime config ' + name + ' file ' + file);
              _context10.next = 4;
              return _regenerator2.default.awrap(_fsExtra2.default.remove(file));

            case 4:
              // delete from cache
              this.configs.delete(name);

            case 5:
            case 'end':
              return _context10.stop();
          }
        }
      }, null, this);
    }

    /**
     * Removes all created runtime configs
     */

  }, {
    key: 'cleanUpRuntimeConfigs',
    value: function cleanUpRuntimeConfigs() {
      var _this = this;

      var names;
      return _regenerator2.default.async(function cleanUpRuntimeConfigs$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              // clean up all saved config files
              names = [].concat((0, _toConsumableArray3.default)(this.configs.keys()));
              _context11.next = 3;
              return _regenerator2.default.awrap(_promise2.default.all(names.map(function (n) {
                return _this.removeRuntimeConfig(n);
              })));

            case 3:
            case 'end':
              return _context11.stop();
          }
        }
      }, null, this);
    }

    /**
     * Builds a non-conflicting file name for this webdriverio run
     */

  }, {
    key: 'getRuntimeConfigFileName',
    value: function getRuntimeConfigFileName(name) {
      // launcher and runner gets the same arguments, so let's use them to build a hash to determine different calls
      var hash = require("crypto").createHash('md5').update(process.argv.slice(2).join("")).digest('hex').substring(0, 4);
      // try to use process id to generate a unique file name for each webdriverio instance
      var runner = global.browser != null;
      var pid = !process.hasOwnProperty("ppid") ? null : runner ? process.ppid : process.pid;
      // generate file name suffix
      var suffix = [hash, pid].filter(Boolean).join("-");
      return _path2.default.join(runtimeConfigPath, name + '-' + suffix + '.json');
    }
  }, {
    key: 'createResultReport',
    value: function createResultReport(misMatchPercentage, isWithinMisMatchTolerance, isSameDimensions) {
      return {
        misMatchPercentage: misMatchPercentage,
        isWithinMisMatchTolerance: isWithinMisMatchTolerance,
        isSameDimensions: isSameDimensions,
        isExactSameImage: misMatchPercentage === 0
      };
    }
  }]);
  return BaseCompare;
}();

exports.default = BaseCompare;