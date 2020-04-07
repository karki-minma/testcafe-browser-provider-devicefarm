"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var AWS = _interopRequireWildcard(require("aws-sdk"));

var _seleniumWebdriver = require("selenium-webdriver");

var _chrome = require("selenium-webdriver/chrome");

var _firefox = require("selenium-webdriver/firefox");

var _safari = require("selenium-webdriver/safari");

var _edge = require("selenium-webdriver/edge");

var _ie = require("selenium-webdriver/ie");

var _fs = require("fs");

var optionSetterMaps = {
  chrome: function chrome(builder, caps) {
    return builder.setChromeOptions(new _chrome.Options(caps));
  },
  firefox: function firefox(builder, caps) {
    return builder.setFirefoxOptions(new _firefox.Options(caps));
  },
  safari: function safari(builder, caps) {
    return builder.setSafariOptions(new _safari.Options(caps));
  },
  MicrosoftEdge: function MicrosoftEdge(builder, caps) {
    return builder.setEdgeOptions(new _edge.Options(caps));
  },
  'internet explorer': function internetExplorer(builder, caps) {
    return builder.setIeOptions(new _ie.Options(caps));
  }
};
var _process$env = process.env,
    AWS_ACCESS_KEY_ID = _process$env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY = _process$env.AWS_SECRET_ACCESS_KEY,
    _process$env$AWS_REGI = _process$env.AWS_REGION,
    AWS_REGION = _process$env$AWS_REGI === void 0 ? 'us-west-2' : _process$env$AWS_REGI;
var AWS_DATAFARM_ARN = 'arn:aws:devicefarm:us-west-2:072497722989:testgrid-project:c6592ed1-5504-4bb1-b932-9f08813e2640';
var _default = {
  // Multiple browsers support
  isMultiBrowser: false,
  openedBrowsers: {},
  seleniumServer: null,
  heartbeatHandler: {},
  heartbeatInterval: Number(process.env.SELENIUM_HEARTBEAT) || 10e3,
  capabilities: process.env.SELENIUM_CAPABILITIES || 'capabilities.json',
  getHubUrl: function getHubUrl() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var awsParams, deviceFarm, params, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              awsParams = {
                region: AWS_REGION,
                accessKeyId: AWS_ACCESS_KEY_ID,
                secretAccessKey: AWS_SECRET_ACCESS_KEY,
                projectArn: AWS_DATAFARM_ARN,
                expiresInSeconds: 300 // 5 Minutes

              };
              deviceFarm = new AWS.DeviceFarm(awsParams);
              params = {
                expiresInSeconds: awsParams.expiresInSeconds,
                projectArn: awsParams.projectArn
              };
              _context.next = 5;
              return deviceFarm.createTestGridUrl(params).promise();

            case 5:
              data = _context.sent;
              return _context.abrupt("return", data.url);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },

  /**
   * Open the browser with the given parameters
   * @param {number} id id of the opened browser
   * @param {string} pageUrl url to navigate to after creating browser
   * @param {string} browserName browser string in format 'browserName[@version][:platform]'
   */
  openBrowser: function openBrowser(id, pageUrl, browserName) {
    var _this = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var browserNameString, browserFormalName, version, platform, builder, optionSetter, caps, browser;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (browserName) {
                _context2.next = 2;
                break;
              }

              throw new Error('Unsupported browser!');

            case 2:
              browserNameString = browserName.match(/([^@:]+)/);
              browserFormalName = browserNameString[1].trim();
              version = browserName.match(/@([^:]+)/);
              platform = browserName.match(/:(.+)/);
              version = version ? version[1] : undefined; // eslint-disable-line no-undefined

              platform = platform ? platform[1] : undefined; // eslint-disable-line no-undefined

              builder = new _seleniumWebdriver.Builder().forBrowser(browserFormalName, version, platform).usingServer(_this.seleniumServer);
              optionSetter = optionSetterMaps[browserFormalName];

              if (optionSetter && (0, _fs.existsSync)(_this.capabilities)) {
                caps = JSON.parse((0, _fs.readFileSync)(_this.capabilities))[browserName.trim()];
                if (caps) optionSetter(builder, caps);
              }

              _context2.next = 13;
              return builder.build();

            case 13:
              browser = _context2.sent;
              _context2.next = 16;
              return browser.get(pageUrl);

            case 16:
              _this.openedBrowsers[id] = browser;
              if (_this.heartbeatInterval > 0) _this.startHeartbeat(id, browser);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  sleep: function sleep(time) {
    return new _promise["default"](function (resolve) {
      setTimeout(function () {
        resolve();
      }, time);
    });
  },
  startHeartbeat: function startHeartbeat(id, browser) {
    var _this2 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this2.heartbeatHandler[id] = true;

            case 1:
              if (!_this2.heartbeatHandler[id]) {
                _context3.next = 13;
                break;
              }

              _context3.prev = 2;
              _context3.next = 5;
              return browser.getTitle();

            case 5:
              _context3.next = 9;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](2);

            case 9:
              _context3.next = 11;
              return _this2.sleep(_this2.heartbeatInterval);

            case 11:
              _context3.next = 1;
              break;

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 7]]);
    }))();
  },
  stopHeartbeat: function stopHeartbeat(id) {
    this.heartbeatHandler[id] = false;
  },
  closeBrowser: function closeBrowser(id) {
    var _this3 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (_this3.heartbeatInterval > 0) _this3.stopHeartbeat(id);
              _context4.next = 3;
              return _this3.openedBrowsers[id].quit();

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  },
  // Optional - implement methods you need, remove other methods
  // Initialization
  init: function init() {
    var _this4 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _this4.getHubUrl();

            case 2:
              _this4.seleniumServer = _context5.sent;

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }))();
  },
  dispose: function dispose() {
    var _this5 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var id;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.t0 = _regenerator["default"].keys(_this5.openedBrowsers);

            case 1:
              if ((_context6.t1 = _context6.t0()).done) {
                _context6.next = 13;
                break;
              }

              id = _context6.t1.value;
              if (_this5.heartbeatInterval > 0) _this5.stopHeartbeat(id);
              _context6.prev = 4;
              _context6.next = 7;
              return _this5.openedBrowsers[id].quit();

            case 7:
              _context6.next = 11;
              break;

            case 9:
              _context6.prev = 9;
              _context6.t2 = _context6["catch"](4);

            case 11:
              _context6.next = 1;
              break;

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[4, 9]]);
    }))();
  },
  // Optional methods for multi-browser support
  getBrowserList: function getBrowserList() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              throw new Error('Not implemented!');

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  },
  isValidBrowserName: function isValidBrowserName()
  /* browserName */
  {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", true);

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }))();
  },
  // Extra methods
  canResizeWindowToDimensions: function canResizeWindowToDimensions()
  /* browserId, width, height */
  {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", true);

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }))();
  },
  resizeWindow: function resizeWindow(id, width, height
  /*, currentWidth, currentHeight*/
  ) {
    var _this6 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _this6.openedBrowsers[id].manage().window().setRect({
                width: width,
                height: height
              });

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }))();
  },
  maximizeWindow: function maximizeWindow(id) {
    var _this7 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _this7.openedBrowsers[id].manage().window().maximize();

            case 2:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }))();
  },
  takeScreenshot: function takeScreenshot(id, screenshotPath
  /*, pageWidth, pageHeight*/
  ) {
    var _this8 = this;

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
      var screenshot;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _this8.openedBrowsers[id].takeScreenshot(screenshotPath);

            case 2:
              screenshot = _context12.sent;
              (0, _fs.writeFileSync)(screenshotPath, screenshot, 'base64');

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }))();
  },
  isLocalBrowser: function isLocalBrowser() {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", false);

            case 1:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }))();
  }
};
exports["default"] = _default;
module.exports = exports.default;