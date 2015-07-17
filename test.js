/*!
 * helper-related <https://github.com/helpers/helper-related>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var related = require('./')();

describe('related', function () {
  it('should get a package.json from npm:', function (cb) {
    this.timeout(10000)
    related('always-thunk', function (err, res) {
      res.should.match(/\[always-thunk\]/);
      cb();
    });
  });

  it('should get an array of package.json files:', function (cb) {
    this.timeout(10000)
    related(['always-thunk', 'promise2thunk'], function (err, res) {
      res.should.match(/\[always-thunk\]/);
      res.should.match(/\[promise2thunk\]/);
      cb();
    });
  });

  it('should remove a name passed on `options.remove`:', function (cb) {
    this.timeout(10000)
    var list = ['promise2thunk', 'always-callback', 'make-callback', 'ip-filter'];
    related(list, {remove: 'make-callback'}, function (err, res) {
      res.should.match(/\[promise2thunk\]/);
      res.should.not.match(/\[make-callback\]/);
      res.should.match(/\[always-callback\]/);
      res.should.match(/\[ip-filter\]/);
      cb();
    });
  });

  it('should remove an array of names passed on `options.remove`:', function (cb) {
    this.timeout(10000)
    var list = ['promise2thunk', 'always-callback', 'make-callback', 'ip-filter'];
    related(list, {remove: ['make-callback', 'always-callback']}, function (err, res) {
      res.should.match(/\[promise2thunk\]/);
      res.should.not.match(/\[make-callback\]/);
      res.should.not.match(/\[always-callback\]/);
      res.should.match(/\[ip-filter\]/);
      cb();
    });
  });

  it('should truncate description to 15 words by default', function (cb) {
    this.timeout(10000)
    related(['is-es6-generators', 'always-callback'], function (err, res) {
      res.should.equal([
        '* [always-callback](https://github.com/tunnckocore/always-callback): Create callback api for given sync function. Guarantee that given function (sync or async, no… [more](https://github.com/tunnckocore/always-callback)',
        '* [is-es6-generators](https://github.com/tunnckocore/is-es6-generators): Check whether a value is a `Generator` or `GeneratorFunction`. The `co` way, more strict checking.… [more](https://github.com/tunnckocore/is-es6-generators)'
      ].join('\n'));
      cb();
    });
  });

  it('should truncate the description to the given number of words:', function (cb) {
    this.timeout(10000)
    related(['always-callback', 'ip-filter'], {words: 10}, function (err, res) {
      res.should.equal([
        '* [always-callback](https://github.com/tunnckocore/always-callback): Create callback api for given sync function. Guarantee that given… [more](https://github.com/tunnckocore/always-callback)',
        '* [ip-filter](https://github.com/tunnckocore/ip-filter): Filter valid IPv4 or IPv6 IP against glob pattern, array,… [more](https://github.com/tunnckocore/ip-filter)'
      ].join('\n'));
      cb();
    });
  });

  it('should truncate description to 15 when truncate:true', function (cb) {
    this.timeout(10000)
    related(['is-es6-generators', 'always-callback'], {truncate: true}, function (err, res) {
      res.should.equal([
        '* [always-callback](https://github.com/tunnckocore/always-callback): Create callback api for given sync function. Guarantee that given function (sync or async, no… [more](https://github.com/tunnckocore/always-callback)',
        '* [is-es6-generators](https://github.com/tunnckocore/is-es6-generators): Check whether a value is a `Generator` or `GeneratorFunction`. The `co` way, more strict checking.… [more](https://github.com/tunnckocore/is-es6-generators)'
      ].join('\n'));
      cb();
    });
  });

  it('should not truncate description when truncate:false', function (cb) {
    this.timeout(10000)
    related(['micromatch', 'assemble'], {truncate: false}, function (err, res) {
      res.should.equal([
        '* [assemble](http://assemble.io): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt, Less.js / lesscss.org, Topcoat, Web Experience Toolkit, and hundreds of other projects to build sites, themes, components, documentation, blogs and gh',
        '* [micromatch](https://github.com/jonschlinkert/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. Just use `micromatch.isMatch()` instead of `minimatch()`, or use `micromatch()` instead of `multimatch()`.'
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
