'use strict';

/**
 * Lazily required module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('arr-filter', 'filter');
require('async-array-reduce', 'reduce');
require('extend-shallow', 'extend');
require('get-pkgs', 'getPkgs');
require('is-valid-glob', 'isValidGlob');
require('get-value', 'get');
require = fn;

utils.last = function (arr) {
  return arr[arr.length - 1];
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
