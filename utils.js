'use strict';

define(exports, 'engine', () => require('engine'));
define(exports, 'mdu', () => require('markdown-utils'));
define(exports, 'reflinks', () => require('reflinks'));
define(exports, 'union', () => require('arr-union'));

function define(obj, key, fn) {
  Reflect.defineProperty(obj, key, { get: fn });
}

exports.render = function(str, context, options) {
  const ctx = Object.assign({}, options, context);
  const engine = exports.engine();

  if (typeof ctx.truncate !== 'function') {
    ctx.truncate = exports.truncate;
  }

  engine.helper('truncate', ctx.truncate);
  engine.helper('link_github', githubLink);
  engine.helper('link_npm', npmLink);
  return engine.render(str, ctx);
};

function githubLink(name, pkg, options) {
  const opts = Object.assign({}, options);
  if (typeof opts.githubLink === 'function') {
    return opts.githubLink(name, pkg, opts);
  }
  let desc = pkg.description;
  if (typeof opts.description === 'string') {
    desc = opts.description;
  }
  if (opts.description === false) {
    desc = '';
  }
  return exports.mdu.link('homepage', pkg.homepage, desc);
}

function npmLink(name, pkg, options) {
  const opts = Object.assign({}, options);
  const url = `https://www.npmjs.com/package/${pkg.name}`;
  if (typeof opts.githubLink !== 'function') {
    return exports.mdu.link('npm', url);
  }
  return exports.mdu.link('npm', url);
}

exports.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

exports.isString = function(val) {
  return val && typeof val === 'string';
};

exports.filter = function(arr, names) {
  names = exports.arrayify(names);
  return arr.filter(function(ele) {
    return names.indexOf(ele) === -1;
  });
};

exports.truncate = function(str, options) {
  if (!exports.isString(str)) {
    return '';
  }
  // ensure helper context is available
  const ctx = Object.assign({}, this);
  const opts = Object.assign({}, options, ctx);
  if (opts.words || !opts.chars) {
    return exports.truncateWords(str, opts);
  }
  return exports.truncateString(str, opts);
};

exports.truncateWords = function(str, options) {
  const opts = Object.assign({words: 15}, options);
  const originalLength = str.length;
  const words = str.split(' ').slice(0, opts.words);
  const res = words.join(' ');

  if (res.length < originalLength) {
    return exports.ellipsis(res.replace(/^\W+|\W+$/g, ''), opts.homepage);
  }
  return res;
};

exports.truncateString = function(str, options) {
  const opts = Object.assign({chars: 50}, options);
  const originalLength = str.length;
  const regex = new RegExp('.{1,' + opts.chars + '}(\\s+|$)|\\S+?(\\s+|$)', 'g');
  const lines = str.match(regex) || [];
  const res = lines[0];
  if (res.length < originalLength) {
    return exports.ellipsis(res.replace(/^\W+|\W+$/g, ''), opts.homepage);
  }
  return res;
};

exports.ellipsis = function(str, href) {
  return str + (href ? '… [more](' + href + ')' : '…');
};

/**
 * Expose exports
 */

module.exports = exports;
