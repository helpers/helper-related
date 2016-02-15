'use strict';

var utils = require('./utils');

function relatedHelper(config) {
  config = config || {};
  var configProp = config.configProp || 'metadata';

  if (utils.isValidGlob(config)) {
    related.apply(null, arguments);
    return;
  }

  function related(repos, options, cb) {
    if (typeof repos === 'function') {
      cb = repos;
      repos = null;
      options = {};
    }

    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    if (typeof cb !== 'function') {
      throw new Error('expected a callback function');
    }

    var opts = utils.extend({}, config, options);

    // allow a prop-string to be passed: eg: `related("a.b.c")`,
    // so that `get()` can resolve the value from the context
    if (this && this.context && typeof repos === 'string') {
      opts = utils.extend({}, this.options, opts);
      try {
        var ctx = utils.extend({}, this.app.cache.data, this.context);
        var res = utils.get(ctx, [configProp, repos].join('.'));
        if (res) repos = res;
      } catch (err) {

      }
    }

    if (!repos) {
      cb(null, '');
      return;
    }

    if (typeof repos !== 'string' && !Array.isArray(repos)) {
      cb(new TypeError('helper-related expects a string or array.'));
      return;
    }

    var words = opts.words || opts.truncate;
    var link = typeof opts.linkify === 'function'
      ? opts.linkify
      : linkify;

    if (typeof opts.remove !== 'undefined') {
      repos = utils.filter(repos, function(name) {
        return utils.arrayify(opts.remove).indexOf(name) === -1;
      });
    }

    if (opts.verbose) {
      spinner('creating related links from npm data');
    }

    utils.getPkgs(repos, function(err, pkgs) {
      if (err) {
        if (err.message !== 'document not found') {
          cb(err);
          return;
        }
        pkgs = [];
      }

      pkgs = pkgs.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });

      pkgs = pkgs.filter(Boolean);

      utils.reduce(pkgs, [], function(acc, pkg, next) {
        var bullet = link(pkg, pkgs.length, words);
        next(null, acc.concat(bullet));
      }, function(err, arr) {
        if (err) {
          cb(err);
          return;
        }

        if (opts.verbose) {
          stopSpinner(utils.green(utils.success) + ' created list of related links from npm data\n');
        }
        cb(null, arr.join('\n'));
      });
    });
  }
  return related;
}

function spinner(msg) {
  var arr = ['|', '/', '-', '\\', '-'];
  var len = arr.length, i = 0;
  spinner.timer = setInterval(function() {
    process.stdout.clearLine();
    process.stdout.cursorTo(1);
    process.stdout.write('\u001b[0G ' + arr[i++ % len] + ' ' + msg);
  }, 200);
}

function stopSpinner(msg) {
  process.stdout.clearLine();
  process.stdout.cursorTo(1);
  process.stdout.write('\u001b[2K' + msg);
  clearInterval(spinner.timer);
}

function toLink(config, options) {
  options = options || {};
  var url = options.url || 'https://www.npmjs.com/package/';
  var name = config.name;
  var count = options.count || 0;
  var repo = url + name;

  var res = '';
  res += link(name, repo);
  res += truncate(config.description, repo, options.wordLimit);
  res += ' | ';
  res += link('homepage', config.homepage.replace(/#readme$/, ''));

  if (count <= 1) return res;
  return '* ' + res;
}

function linkify(pkg, num, words) {
  return toLink(pkg, {count: num, wordLimit: words});
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

/**
 * Expose `relatedHelper`
 */

module.exports = relatedHelper;
