'use strict';

require('mocha');
require('should');
const assert = require('assert');
const templates = require('templates');
const helper = require('..');
var related, app;

describe('related helper', function() {
  this.slow(500);

  beforeEach(function() {
    related = helper({verbose: false, description: ''});
  });

  it('should get a package.json from npm:', function(cb) {
    this.timeout(2000);
    related('micromatch', function(err, res) {
      assert(/\[micromatch\]/.test(res));
      cb();
    });
  });

  it('should get an array of package.json files:', function(cb) {
    this.timeout(2000);
    related(['micromatch', 'assemble'], function(err, res) {
      assert(/\[micromatch\]/.test(res));
      assert(/\[assemble\]/.test(res));
      cb();
    });
  });

  it('should not fail when no names are passed', function(cb) {
    this.timeout(2000);
    related(function(err, res) {
      assert.equal(res, '');
      cb();
    });
  });

  it('should skip repos that don\'t exist', function(cb) {
    this.timeout(2000);
    related(['fooosooo'], function(err, res) {
      assert.equal(res, '');
      cb();
    });
  });

  it('should remove a name passed on `options.remove`:', function(cb) {
    this.timeout(2000);
    var list = ['assemble', 'verb', 'remarkable', 'snippet'];
    related(list, {remove: 'remarkable'}, function(err, res) {
      assert(/\[assemble\]/.test(res));
      assert(!/\[remarkable\]/.test(res));
      assert(/\[verb\]/.test(res));
      assert(/\[snippet\]/.test(res));
      cb();
    });
  });

  it('should remove an array of names passed on `options.remove`:', function(cb) {
    this.timeout(2000);
    var list = ['assemble', 'verb', 'remarkable', 'snippet'];
    related(list, {remove: ['remarkable', 'verb']}, function(err, res) {
      assert(/\[assemble\]/.test(res));
      assert(!/\[remarkable\]/.test(res));
      assert(!/\[verb\]/.test(res));
      assert(/\[snippet\]/.test(res));
      cb();
    });
  });

  it('should truncate description to 15 words by default', function(cb) {
    this.timeout(2000);
    related(['snapdragon', 'verb'], function(err, res) {
      assert.equal(res, [
        '- [snapdragon](https://www.npmjs.com/package/snapdragon): Easy-to-use plugin system for creating powerful, fast and versatile parsers and compilers, with built-in source-map… [more](https://github.com/here-be/snapdragon) | [homepage](https://github.com/here-be/snapdragon "Easy-to-use plugin system for creating powerful, fast and versatile parsers and compilers, with built-in source-map support.")',
        '- [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://github.com/verbose/verb) | [homepage](https://github.com/verbose/verb "Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used on hundreds of projects of all sizes to generate everything from API docs to readmes.")',
      ].join('\n'));
      cb();
    });
  });

  it('should truncate the description to the given number of words:', function(cb) {
    this.timeout(2000);
    related(['verb', 'snippet'], {words: 10}, function(err, res) {
      assert.equal(res, [
        '- [snippet](https://www.npmjs.com/package/snippet): CLI and API for easily creating, reusing, sharing and generating… [more](https://github.com/jonschlinkert/snippet) | [homepage](https://github.com/jonschlinkert/snippet "CLI and API for easily creating, reusing, sharing and generating snippets of code from the command line.")',
        '- [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy… [more](https://github.com/verbose/verb) | [homepage](https://github.com/verbose/verb "Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used on hundreds of projects of all sizes to generate everything from API docs to readmes.")',
      ].join('\n'));
      cb();
    });
  });

  it('should truncate description to 15 when truncate:true', function(cb) {
    this.timeout(2000);
    related(['snapdragon', 'verb'], function(err, res) {
      assert.deepEqual(res, [
        '- [snapdragon](https://www.npmjs.com/package/snapdragon): Easy-to-use plugin system for creating powerful, fast and versatile parsers and compilers, with built-in source-map… [more](https://github.com/here-be/snapdragon) | [homepage](https://github.com/here-be/snapdragon "Easy-to-use plugin system for creating powerful, fast and versatile parsers and compilers, with built-in source-map support.")',
        '- [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://github.com/verbose/verb) | [homepage](https://github.com/verbose/verb "Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used on hundreds of projects of all sizes to generate everything from API docs to readmes.")',
      ].join('\n'));
      cb();
    });
  });

  it('should support custom template functions', function(cb) {
    this.timeout(2000);
    var options = {
      template: function(pkg, options) {
        return `+ [${pkg.name}](https://www.npmjs.com/package/${pkg.name})`;
      }
    };
    related(['snapdragon', 'verb'], options, function(err, res) {
      assert.deepEqual(res, [
        '+ [snapdragon](https://www.npmjs.com/package/snapdragon)',
        '+ [verb](https://www.npmjs.com/package/verb)',
      ].join('\n'));
      cb();
    });
  });

  it('should support custom template strings', function(cb) {
    this.timeout(2000);
    var options = {
      template: '++ [<%= name %>](https://www.npmjs.com/package/<%= name %>)'
    };
    related(['snapdragon', 'verb'], options, function(err, res) {
      assert.deepEqual(res, [
        '++ [snapdragon](https://www.npmjs.com/package/snapdragon)',
        '++ [verb](https://www.npmjs.com/package/verb)',
      ].join('\n'));
      cb();
    });
  });

  it('should not truncate description when `options.words` is Infinity', function(cb) {
    this.timeout(2000);
    related(['micromatch', 'assemble'], {words: Infinity}, function(err, res) {
      assert(res.length > 100);
      assert(/\- \[assemble\]/.test(res));
      assert(/\- \[micromatch\]/.test(res));
      cb();
    });
  });

  it('should throw an error:', function() {
    assert.throws(function() {
      related();
    }, 'expected a callback function');
  });
});

describe('helper', function() {
  this.slow(500);

  beforeEach(function() {
    app = templates({verbose: false});
    app.engine('hbs', require('engine-handlebars'));
    app.engine('md', require('engine-base'));

    // custom view collections
    app.create('pages', {engine: 'hbs'});
    app.create('posts', {engine: 'md'});

    // add helper
    app.asyncHelper('related', helper(app.options));
  });

  it('should work with handlebars:', function(cb) {
    this.timeout(2000);
    app.page('abc', {content: 'foo {{related list}} bar'})
      .render({list: ['micromatch']}, function(err, res) {
        if (err) return cb(err);
        res.content.should.match(/\[micromatch\]/);
        cb();
      });
  });

  it('should use global options', function(cb) {
    this.timeout(2000);
    app.option('remove', ['flflflfl']);
    app.page('abc', {content: 'foo {{related list}} bar'})
      .render({list: ['micromatch', 'flflflfl']}, function(err, res) {
        if (err) return cb(err);
        res.content.should.match(/\[micromatch\]/);
        cb();
      });
  });

  it('should work with engine-base:', function(cb) {
    this.timeout(2000);
    app.post('xyz', {content: 'foo <%= related(list) %> bar'})
      .render({list: ['micromatch']}, function(err, res) {
        if (err) return cb(err);
        res.content.should.match(/\[micromatch\]/);
        cb();
      });
  });

  it('should use custom templates', function(cb) {
    this.timeout(2000);
    app.data('reflinkTemplate', '<%= name %>++++https://www.npmjs.com/package/<%= name %>');
    app.post('xyz', {content: 'foo <%= related(list, {template: reflinkTemplate}) %> bar'})
      .render({list: ['micromatch']}, function(err, res) {
        if (err) return cb(err);
        assert.equal(res.content, 'foo micromatch++++https://www.npmjs.com/package/micromatch bar');
        cb();
      });
  });

  it('should use custom templates from package.json config options', function(cb) {
    this.timeout(2000);
    app.data({
      verb: {options: {reflinks: {template: '<%= name %>++++https://www.npmjs.com/package/<%= name %>'}}}
    });
    app.post('xyz', {content: 'foo <%= related(list, {template: verb.options.reflinks.template}) %> bar'})
      .render({list: ['micromatch']}, function(err, res) {
        if (err) return cb(err);
        assert.equal(res.content, 'foo micromatch++++https://www.npmjs.com/package/micromatch bar');
        cb();
      });
  });

  it('should work using values from the context:', function(cb) {
    this.timeout(2000);

    app.data('list', ['micromatch']);
    app.post('xyz', {content: 'foo <%= related(list) %> bar'})
      .render(function(err, res) {
        if (err) return cb(err);
        res.content.should.match(/\[micromatch\]/);
        cb();
      });
  });
});
