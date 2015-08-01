/*!
 * helper-related <https://github.com/helpers/helper-related>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var related = require('./')();

describe('related', function () {
  it('should get a package.json from npm:', function (cb) {
    this.timeout(10000);
    related('micromatch', function (err, res) {
      res.should.match(/\[micromatch\]/);
      cb();
    });
  });

  it('should get an array of package.json files:', function (cb) {
    this.timeout(10000);
    related(['micromatch', 'assemble'], function (err, res) {
      res.should.match(/\[micromatch\]/);
      res.should.match(/\[assemble\]/);
      cb();
    });
  });

  it('should remove a name passed on `options.remove`:', function (cb) {
    this.timeout(10000);
    var list = ['assemble', 'verb', 'remarkable', 'snippet'];
    related(list, {remove: 'remarkable'}, function (err, res) {
      res.should.match(/\[assemble\]/);
      res.should.not.match(/\[remarkable\]/);
      res.should.match(/\[verb\]/);
      res.should.match(/\[snippet\]/);
      cb();
    });
  });

  it('should remove an array of names passed on `options.remove`:', function (cb) {
    this.timeout(10000);
    var list = ['assemble', 'verb', 'remarkable', 'snippet'];
    related(list, {remove: ['remarkable', 'verb']}, function (err, res) {
      res.should.match(/\[assemble\]/);
      res.should.not.match(/\[remarkable\]/);
      res.should.not.match(/\[verb\]/);
      res.should.match(/\[snippet\]/);
      cb();
    });
  });

  it('should truncate description to 15 words by default', function (cb) {
    this.timeout(10000);
    related(['snapdragon', 'verb'], function (err, res) {
      res.should.equal([
        '* [snapdragon](https://www.npmjs.com/package/snapdragon): snapdragon is an extremely pluggable, powerful and easy-to-use parser-renderer factory. | [homepage](https://github.com/jonschlinkert/snapdragon)',
        '* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Extremely powerful, easy to use, can generate anything from API… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/assemble/verb)',
      ].join('\n'));
      cb();
    });
  });

  it('should truncate the description to the given number of words:', function (cb) {
    this.timeout(10000);
    related(['verb', 'snippet'], {words: 10}, function (err, res) {
      res.should.equal([
        '* [snippet](https://www.npmjs.com/package/snippet): CLI and API for easily creating, reusing, sharing and generating… [more](https://www.npmjs.com/package/snippet) | [homepage](https://github.com/jonschlinkert/snippet)',
        '* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Extremely powerful, easy to use,… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/assemble/verb)',
      ].join('\n'));
      cb();
    });
  });

  it('should truncate description to 15 when truncate:true', function (cb) {
    this.timeout(10000);
    related(['snapdragon', 'verb'], {truncate: true}, function (err, res) {
      res.should.equal([
        '* [snapdragon](https://www.npmjs.com/package/snapdragon): snapdragon is an extremely pluggable, powerful and easy-to-use parser-renderer factory. | [homepage](https://github.com/jonschlinkert/snapdragon)',
        '* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Extremely powerful, easy to use, can generate anything from API… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/assemble/verb)',
      ].join('\n'));
      cb();
    });
  });

  it('should not truncate description when truncate:false', function (cb) {
    this.timeout(10000);
    related(['micromatch', 'assemble'], {truncate: false}, function (err, res) {
      res.should.equal([
        '* [assemble](https://www.npmjs.com/package/assemble): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt, Less.js / lesscss.org, Topcoat, Web Experience Toolkit, and hundreds of other projects to build sites, themes, components, documentation, blogs and gh | [homepage](http://assemble.io)',
        '* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. Just use `micromatch.isMatch()` instead of `minimatch()`, or use `micromatch()` instead of `multimatch()`. | [homepage](https://github.com/jonschlinkert/micromatch)',
      ].join('\n'));
      cb();
    });
  });

  it('should throw an error:', function () {
    (function () {
      related();
    }).should.throw('helper-related expects a string or array.');
  });
});
