"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUserAgent;

/**
 * Reads the userAgent sent by your browser.
 * @return {string} userAgent string
 */
function getUserAgent() {
  return window.navigator.userAgent;
}