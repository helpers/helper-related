/*!
 * helper-related <https://github.com/helpers/helper-related>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var chalk = require('chalk');
var async = require('async');
var symbol = require('log-symbols');
var extend = require('extend-shallow');
var get = require('get-pkgs');

module.exports = function (options) {
  options = options || {};

  return function related(repos, opts, cb) {
    if (typeof repos !== 'string' && !Array.isArray(repos)) {
      throw new TypeError('helper-related expects a string or array.');
    }

    if (typeof opts === 'function') {
      cb = opts;
      opts = {};
    }

    opts = extend({}, options, opts);
    var linkify = opts.linkify || toLink;
    if (opts && opts.silent !== true) message();
    var words = opts.words || opts.truncate;

    get(repos, '*', function (err, pkgs) {
      if (err) {
        console.error(chalk.red('helper-related: %j'), err);
        return cb(err);
      }

      pkgs = pkgs.sort(function (a, b) {
        var aname = a.name.charAt(0);
        var bname = b.name.charAt(0);
        return aname > bname
          ? 1 : aname < bname
          ? -1 : 0;
      });

      async.reduce(pkgs, [], function (acc, pkg, next) {
        next(null, acc.concat(linkify(pkg, pkgs.length, words)));
      }, function (err, arr) {
        if (err) return cb(err);
        cb(null, arr.join('\n'));
      });
    });
  };
};

function toLink(pkg, num, words) {
  var res = '';
  res += link(pkg.name, pkg.homepage);
  res += ': ';
  res += truncate(pkg.description, pkg.homepage, words);
  if (num <= 1) return res;
  return '* ' + res;
}

function link(anchor, href, title) {
  title = title ? ' "' + title + '"' : '';
  return '[' + anchor + '](' + href + title + ')';
}

function truncate(str, url, words) {
  if (!str || words === false) return '';
  var arr = str.split(' ');
  var len = words || arr.length;
  var max = len <= 15 ? len : 15;
  var res = arr.slice(0, max).join(' ');

  if (res.length < str.length) {
    res += '… [more](' + url + ')';
  }
  return res;
}

function message() {
  var msg = ' related helper: getting related projects from npm.';
  console.log(); // blank line
  console.log('  ' + symbol.success + chalk.gray(msg));
}
