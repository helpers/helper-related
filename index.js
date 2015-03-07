/*!
 * helper-related <https://github.com/jonschlinkert/helper-related>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var chalk = require('chalk');
var async = require('async');
var symbol = require('log-symbols');
var mdu = require('markdown-utils');
var get = require('get-pkgs');

module.exports = function (options) {
  options = options || {};
  var linkify = options.linkify || toLink;

  return function related(repos, patterns, cb) {
    if (typeof patterns === 'function') {
      cb = patterns;
      patterns = '*';
    }

    if (typeof repos !== 'string' && !Array.isArray(repos)) {
      throw new TypeError('helper-related expects a string or array.');
    }

    if (options && options.silent !== true) {
      var msg = '  related helper: getting related projects from npm.';
      console.log(); // blank line
      console.log('  ' + symbol.success + chalk.gray(msg));
    }

    get(repos, patterns, function (err, pkgs) {
      if (err) {
        console.error(chalk.red('helper-related: %j'), err);
        return cb(err);
      }
      async.mapSeries(pkgs, function (pkg, next) {
        next(null, linkify(pkg, pkgs.length));
      }, function (err, arr) {
        if (err) {
          console.error(chalk.red('helper-related: %j'), err);
          return cb(err);
        }
        cb(null, arr.join('\n'));
      });

    });
  };
};

function toLink(pkg, num) {
  var link = mdu.link(pkg.name, pkg.homepage) + ': '+ pkg.description;
  if (num <= 1) {
    return link;
  }
  return mdu.listitem(link);
}
