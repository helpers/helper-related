'use strict';

var red = require('ansi-red');
var gray = require('ansi-gray');
var green = require('ansi-green');
var filter = require('arr-filter');
var success = require('success-symbol');
var reduce = require('async-array-reduce');
var extend = require('extend-shallow');
var getPkgs = require('get-pkgs');
var get = require('get-value');


function helperRelated(options) {
  options = options || {};
  var configProp = options.configProp || 'metadata';

  return function related(repos, opts, cb) {
    if (typeof repos !== 'string' && !Array.isArray(repos)) {
      throw new TypeError('helper-related expects a string or array.');
    }

    if (typeof opts === 'function') {
      cb = opts; opts = {};
    }

    // allow a prop-string to be passed: eg: `related("some.list")`,
    // so that `get()` can resolve the value from the context
    if (this && this.context && typeof repos === 'string') {
      var res = get(this.context, [configProp, repos].join('.'));
      if (res) repos = res;
    }

    opts = extend({}, options, opts);
    var linkify = typeof opts.linkify === 'function' ? opts.linkify : toLink;
    var words = opts.words || opts.truncate;

    if (typeof opts.remove !== 'undefined') {
      repos = filter(repos, function (name) {
        return arrayify(opts.remove).indexOf(name) === -1;
      });
    }

    // hide message if `silent` is enabled
    message(options);

    getPkgs(repos, '*', function (err, pkgs) {
      if (err) {
        console.error(red('helper-related: %j'), err);
        return cb(err);
      }

      pkgs = pkgs.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });

      reduce(pkgs, [], function (acc, pkg, next) {
        next(null, acc.concat(linkify(pkg, pkgs.length, words)));
      }, function (err, arr) {
        if (err) return cb(err);
        cb(null, arr.join('\n'));
      });
    });
  };
}

function toLink(pkg, num, words) {
  var homepage = pkg.homepage.replace(/#readme$/, '');
  var npm = 'https://www.npmjs.com/package/' + pkg.name;
  var res = '';
  res += link(pkg.name, npm);
  res += truncate(pkg.description, npm, words);
  res += ' | ' + link('homepage', homepage);
  if (num <= 1) return res;
  return '* ' + res;
}

function link(anchor, href, title) {
  title = title ? ' "' + title + '"' : '';
  return '[' + anchor + '](' + href + title + ')';
}

function truncate(description, link, words) {
  if (!description.length) return '';
  var arr = description.split(' ');
  var res = '';
  var max = 15;

  if (arr.length === 1) {
    return ': ' + arr[0];
  }
  if (words === false) {
    max = undefined;
  }
  if (typeof words === 'number') {
    max = words;
  }

  res = arr.slice(0, max).join(' ');

  if (res.length < description.length) {
    res += '… [more](' + link + ')';
  }
  return ': ' + res;
}

function arrayify(val) {
  return Array.isArray(val) ? val : [val];
}

function message(options) {
  if (!options || options && options.silent !== true) {
    var msg = 'helper-related: getting related projects from npm.';
    console.log(); // blank line
    console.log('  ' + green(success) + '  ' + gray(msg));
  }
}

/**
 * Expose `helperRelated`
 */

module.exports = helperRelated;
