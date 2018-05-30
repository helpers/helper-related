'use strict';

const utils = require('./utils');
const defaults = {
  spinnerStart: 'creating related links from npm data',
  spinnerStop: 'created related links from npm data',
  template: function(pkg, options) {
    const opts = Object.assign({description: ''}, options);
    const defaultTemplate = '- [<%= name %>](https://www.npmjs.com/package/<%= name %>): <%= truncate(description, 15) %> | <%= link_github(name, obj) %>';
    const str = opts.template || defaultTemplate;
    return utils.render(str, pkg, opts);
  }
};

function relatedList(config) {
  return function(names, options, cb) {
    if (typeof names === 'function') {
      cb = names;
      options = {};
      names = null;
    }
    if (typeof options === 'function') {
      cb = options;
      options = {};
    }

    const app = this || {};
    const opts = Object.assign({}, defaults, config, options, app.options);
    const ctx = Object.assign({}, app.context, opts.context);

    if (typeof opts.template === 'string') {
      const tmpl = opts.template;
      opts.template = function(pkg, options) {
        return utils.render(tmpl, pkg, options);
      };
    }

    names = utils.filter(utils.arrayify(names), opts.remove);
    names = utils.union([], names, opts.names, ctx.names);
    names.sort();

    if (names.length === 0) {
      cb(null, '');
      return;
    }

    utils.reflinks(names, opts, function(err, res) {
      if (err) {
        cb(err);
        return;
      }
      cb(null, toList(res.links, opts, ctx, names.length));
    });
  };
}

function toList(links, options, ctx, len) {
  const opts = Object.assign({}, options);
  if (typeof opts.toList === 'function') {
    return opts.toList(links, opts, ctx);
  }
  if (len === 1 && links && links[0]) {
    return links[0].replace(/^[-*+ ]+/, '');
  }
  return links.join('\n');
}

/**
 * Expose `relatedList`
 */

module.exports = relatedList;
