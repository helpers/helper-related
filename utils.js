'use strict';

var utils = require('lazy-cache')(require);
var fn = require;

require = utils;
require('arr-union', 'union');
require('extend-shallow', 'extend');
require('markdown-utils', 'mdu');
require('engine');
require('reflinks');
require = fn;

/**
 * Utils
 */

utils.render = function(str, context, options) {
  var ctx = utils.extend({}, options, context);
  var engine = utils.engine();

  if (typeof ctx.truncate !== 'function') {
    ctx.truncate = utils.truncate;
  }

  engine.helper('truncate', ctx.truncate);
  engine.helper('link_github', githubLink);
  engine.helper('link_npm',  npmLink);
  return engine.render(str, ctx);
};

/**
 * Convert `[foo](bar)` to something like `- [foo](bar): visit the homepage!`
 *
 * @param {String} `link`
 * @param {Object} `options`
 * @param {Object} `ctx`
 * @return {String}
 * @api public
 */

function toBullet(pkg, options) {
  var opts = utils.extend({}, options);
  if (typeof opts.toBullet === 'function') {
    return opts.toBullet(pkg, opts);
  }
  var opts = utils.extend({href: pkg.homepage}, opts);
  var url = `https://www.npmjs.com/package/${pkg.name}`;

  var bullet = '';
  bullet += npmLink(pkg.name, pkg, opts) + ': ';
  bullet += utils.truncate(pkg.description, opts) + ' | ';
  bullet += githubLink('homepage', pkg, opts);
  return utils.mdu.li(bullet, 0);
}

function githubLink(name, pkg, options) {
  var opts = utils.extend({}, options);
  if (typeof opts.githubLink === 'function') {
    return opts.githubLink(name, pkg, opts);
  }
  var desc = pkg.description;
  if (typeof opts.description === 'string') {
    desc = opts.description;
  }
  if (opts.description === false) {
    desc = '';
  }
  return utils.mdu.link('homepage', pkg.homepage, desc);
}

function npmLink(name, pkg, options) {
  var opts = utils.extend({}, options);
  var url = `https://www.npmjs.com/package/${pkg.name}`;
  if (typeof opts.githubLink !== 'function') {
    return utils.mdu.link('npm', url);
  }
  return utils.mdu.link('npm', url);
}

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

utils.isString = function(val) {
  return val && typeof val === 'string';
};

utils.filter = function(arr, names) {
  names = utils.arrayify(names);
  return arr.filter(function(ele) {
    return names.indexOf(ele) === -1;
  });
};

utils.truncate = function(str, options) {
  if (!utils.isString(str)) {
    return '';
  }
  // ensure helper context is available
  var ctx = utils.extend({}, this);
  var opts = utils.extend({}, options, ctx);
  if (opts.words || !opts.chars) {
    return utils.truncateWords(str, opts);
  }
  return utils.truncateString(str, opts);
};

utils.truncateWords = function(str, options) {
  var opts = utils.extend({words: 15}, options);
  var originalLength = str.length;
  var words = str.split(' ').slice(0, opts.words);
  var res = words.join(' ');

  if (res.length < originalLength) {
    return utils.ellipsis(res.replace(/^\W+|\W+$/g, ''), opts.homepage);
  }
  return res;
};

utils.truncateString = function(str, options) {
  var opts = utils.extend({chars: 50}, options);
  var originalLength = str.length;
  var regex = new RegExp('.{1,' + opts.chars + '}(\\s+|$)|\\S+?(\\s+|$)', 'g');
  var lines = str.match(regex) || [];
  var res = lines[0];
  if (res.length < originalLength) {
    return utils.ellipsis(res.replace(/^\W+|\W+$/g, ''), opts.homepage);
  }
  return res;
};

utils.ellipsis = function(str, href) {
  return str + (href ? '… [more](' + href + ')' : '…');
};

/**
 * Expose utils
 */

module.exports = utils;
