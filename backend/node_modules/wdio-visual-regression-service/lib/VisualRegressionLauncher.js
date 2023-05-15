'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _platform = require('platform');

var _wdioScreenshot = require('wdio-screenshot');

var _getUserAgent = require('./scripts/getUserAgent');

var _getUserAgent2 = _interopRequireDefault(_getUserAgent);

var _mapViewports = require('./modules/mapViewports');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VisualRegressionLauncher = function () {
  function VisualRegressionLauncher() {
    (0, _classCallCheck3.default)(this, VisualRegressionLauncher);

    this.currentSuite = null;
    this.currentTest = null;
    this.currentFeature = null;
    this.currentScenario = null;
    this.currentStep = null;
  }

  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */


  (0, _createClass3.default)(VisualRegressionLauncher, [{
    key: 'onPrepare',
    value: function onPrepare(config) {
      return _regenerator2.default.async(function onPrepare$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.validateConfig(config);
              this.compare = config.visualRegression.compare;
              _context.next = 4;
              return _regenerator2.default.awrap(this.runHook('onPrepare'));

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, null, this);
    }

    /**
     * Gets executed before test execution begins. At this point you can access
     * all global variables, such as `browser`.
     * It is the perfect place to define custom commands.
     * @param  {object} capabilities desiredCapabilities
     * @param  {[type]} specs        [description]
     * @return {Promise}
     */

  }, {
    key: 'before',
    value: function before(capabilities, specs) {
      var userAgent, _parsePlatform, name, version, ua;

      return _regenerator2.default.async(function before$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.validateConfig(browser.options);

              this.compare = browser.options.visualRegression.compare;
              this.viewportChangePause = _lodash2.default.get(browser.options, 'visualRegression.viewportChangePause', 100);
              this.viewports = _lodash2.default.get(browser.options, 'visualRegression.viewports');
              this.orientations = _lodash2.default.get(browser.options, 'visualRegression.orientations');
              _context2.next = 7;
              return _regenerator2.default.awrap(browser.execute(_getUserAgent2.default));

            case 7:
              userAgent = _context2.sent.value;
              _parsePlatform = (0, _platform.parse)(userAgent), name = _parsePlatform.name, version = _parsePlatform.version, ua = _parsePlatform.ua;


              this.context = {
                browser: {
                  name: name,
                  version: version,
                  userAgent: ua
                },
                desiredCapabilities: capabilities,
                specs: specs
              };

              browser.addCommand('checkElement', this.wrapCommand(browser, 'element', _wdioScreenshot.makeElementScreenshot));
              browser.addCommand('checkDocument', this.wrapCommand(browser, 'document', _wdioScreenshot.makeDocumentScreenshot));
              browser.addCommand('checkViewport', this.wrapCommand(browser, 'viewport', _wdioScreenshot.makeViewportScreenshot));

              _context2.next = 15;
              return _regenerator2.default.awrap(this.runHook('before', this.context));

            case 15:
            case 'end':
              return _context2.stop();
          }
        }
      }, null, this);
    }

    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */

  }, {
    key: 'beforeSuite',
    value: function beforeSuite(suite) {
      this.currentSuite = suite;
    }

    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */

  }, {
    key: 'afterSuite',
    value: function afterSuite(suite) {
      this.currentSuite = null;
    }

    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */

  }, {
    key: 'beforeTest',
    value: function beforeTest(test) {
      this.currentTest = test;
    }

    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     * @param {Object} test test details
     */

  }, {
    key: 'afterTest',
    value: function afterTest(test) {
      this.currentTest = null;
    }

    /**
     * Function to be executed before a feature starts in Cucumber.
     * @param  {Object} feature feature details
     */

  }, {
    key: 'beforeFeature',
    value: function beforeFeature(feature) {
      this.currentFeature = feature;
    }

    /**
     * Function to be executed after a feature ends in Cucumber.
     * @param  {Object} feature feature details
     */

  }, {
    key: 'afterFeature',
    value: function afterFeature(feature) {
      this.currentFeature = null;
    }

    /**
     * Function to be executed before a scenario starts in Cucumber.
     * @param  {Object} scenario scenario details
     */

  }, {
    key: 'beforeScenario',
    value: function beforeScenario(scenario) {
      this.currentScenario = scenario;
    }

    /**
     * Function to be executed after a scenario ends in Cucumber.
     * @param  {Object} scenario scenario details
     */

  }, {
    key: 'afterScenario',
    value: function afterScenario(scenario) {
      this.currentScenario = null;
    }

    /**
     * Function to be executed before a step starts in Cucumber.
     * @param  {Object} step step details
     */

  }, {
    key: 'beforeStep',
    value: function beforeStep(step) {
      this.currentStep = step;
    }

    /**
     * Function to be executed after a step ends in Cucumber.
     * @param  {Object} stepResult stepResult details
     */

  }, {
    key: 'afterStep',
    value: function afterStep(stepResult) {
      this.currentStep = null;
    }

    /**
     * Gets executed after all tests are done. You still have access to all global
     * variables from the test.
     * @param  {object} capabilities desiredCapabilities
     * @param  {[type]} specs        [description]
     * @return {Promise}
     */

  }, {
    key: 'after',
    value: function after(capabilities, specs) {
      return _regenerator2.default.async(function after$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _regenerator2.default.awrap(this.runHook('after', capabilities, specs));

            case 2:
            case 'end':
              return _context3.stop();
          }
        }
      }, null, this);
    }

    /**
     * Gets executed after all workers got shut down and the process is about to exit.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */

  }, {
    key: 'onComplete',
    value: function onComplete(exitCode, config, capabilities) {
      return _regenerator2.default.async(function onComplete$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _regenerator2.default.awrap(this.runHook('onComplete'));

            case 2:
            case 'end':
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'runHook',
    value: function runHook(hookName) {
      var _compare,
          _len,
          args,
          _key,
          _args5 = arguments;

      return _regenerator2.default.async(function runHook$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(typeof this.compare[hookName] === 'function')) {
                _context5.next = 5;
                break;
              }

              for (_len = _args5.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = _args5[_key];
              }

              _context5.next = 4;
              return _regenerator2.default.awrap((_compare = this.compare)[hookName].apply(_compare, args));

            case 4:
              return _context5.abrupt('return', _context5.sent);

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: 'validateConfig',
    value: function validateConfig(config) {
      if (!_lodash2.default.isPlainObject(config.visualRegression) || !_lodash2.default.has(config.visualRegression, 'compare')) {
        throw new Error('Please provide a visualRegression configuration with a compare method in your wdio-conf.js!');
      }
    }
  }, {
    key: 'wrapCommand',
    value: function wrapCommand(browser, type, command) {
      var _this = this;

      var baseContext = {
        type: type,
        browser: this.context.browser,
        desiredCapabilities: this.context.desiredCapabilities
      };

      var runHook = this.runHook.bind(this);

      var getTestDetails = function getTestDetails() {
        return _this.getTestDetails();
      };

      var resolutionKeySingle = browser.isMobile ? 'orientation' : 'viewport';
      var resolutionKeyPlural = browser.isMobile ? 'orientations' : 'viewports';
      var resolutionMap = browser.isMobile ? _mapViewports.mapOrientations : _mapViewports.mapViewports;

      var viewportChangePauseDefault = this.viewportChangePause;
      var resolutionDefault = browser.isMobile ? this.orientations : this.viewports;

      return function async() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var url, elementSelector, options, exclude, hide, remove, resolutions, viewportChangePause, results;
        return _regenerator2.default.async(function async$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return _regenerator2.default.awrap(browser.getUrl());

              case 2:
                url = _context8.sent;
                elementSelector = type === 'element' ? args[0] : undefined;
                options = _lodash2.default.isPlainObject(args[args.length - 1]) ? args[args.length - 1] : {};
                exclude = options.exclude, hide = options.hide, remove = options.remove;
                resolutions = _lodash2.default.get(options, resolutionKeyPlural, resolutionDefault);
                viewportChangePause = _lodash2.default.get(options, 'viewportChangePause', viewportChangePauseDefault);
                _context8.next = 10;
                return _regenerator2.default.awrap(resolutionMap(browser, viewportChangePause, resolutions, function takeScreenshot(resolution) {
                  var meta, screenshotContext, screenshotContextCleaned, base64Screenshot;
                  return _regenerator2.default.async(function takeScreenshot$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          meta = _lodash2.default.pickBy((0, _defineProperty3.default)({
                            url: url,
                            element: elementSelector,
                            exclude: exclude,
                            hide: hide,
                            remove: remove
                          }, resolutionKeySingle, resolution), _lodash2.default.identity);
                          screenshotContext = (0, _extends3.default)({}, baseContext, getTestDetails(), {
                            meta: meta,
                            options: options
                          });
                          screenshotContextCleaned = _lodash2.default.pickBy(screenshotContext, _lodash2.default.identity);
                          _context6.next = 5;
                          return _regenerator2.default.awrap(runHook('beforeScreenshot', screenshotContextCleaned));

                        case 5:
                          _context6.next = 7;
                          return _regenerator2.default.awrap(command.apply(undefined, [browser].concat(args)));

                        case 7:
                          base64Screenshot = _context6.sent;
                          _context6.next = 10;
                          return _regenerator2.default.awrap(runHook('afterScreenshot', screenshotContextCleaned, base64Screenshot));

                        case 10:
                          return _context6.abrupt('return', [screenshotContextCleaned, base64Screenshot]);

                        case 11:
                        case 'end':
                          return _context6.stop();
                      }
                    }
                  }, null, this);
                }, function processScreenshot(screenshotContextCleaned, base64Screenshot) {
                  return _regenerator2.default.async(function processScreenshot$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return _regenerator2.default.awrap(runHook('processScreenshot', screenshotContextCleaned, base64Screenshot));

                        case 2:
                          return _context7.abrupt('return', _context7.sent);

                        case 3:
                        case 'end':
                          return _context7.stop();
                      }
                    }
                  }, null, this);
                }));

              case 10:
                results = _context8.sent;
                return _context8.abrupt('return', results);

              case 12:
              case 'end':
                return _context8.stop();
            }
          }
        }, null, this);
      };
    }
  }, {
    key: 'getTestDetails',
    value: function getTestDetails() {
      return _lodash2.default.pickBy({
        // mocha
        suite: this.currentSuite,
        test: this.currentTest,
        // cucumber
        feature: this.currentFeature,
        scenario: this.currentScenario,
        step: this.currentStep
      }, _lodash2.default.identity);
    }
  }]);
  return VisualRegressionLauncher;
}();

exports.default = VisualRegressionLauncher;