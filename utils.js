'use strict';

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('ansi-green', 'green');
require('arr-filter', 'filter');
require('async-array-reduce', 'reduce');
require('extend-shallow', 'extend');
require('get-pkgs', 'getPkgs');
require('get-value', 'get');
require('is-valid-glob', 'isValidGlob');
require('success-symbol', 'success');
require = fn;

utils.arrayify = function(val) {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
};

utils.last = function(arr) {
  return arr[arr.length - 1];
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
