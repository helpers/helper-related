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
    related('verb', function (err, res) {
      res.should.match(/\[verb\]/);
      cb();
    });
  });

  it('should get an array of package.json files:', function (cb) {
    related(['remarkable', 'micromatch'], function (err, res) {
      res.should.match(/\[remarkable\]/);
      res.should.match(/\[micromatch\]/);
      cb();
    });
  });

  it('should remove a name passed on `options.remove`:', function (cb) {
    var list = ['remarkable', 'micromatch', 'verb', 'assemble'];
    related(list, {remove: 'verb'}, function (err, res) {
      res.should.match(/\[assemble\]/);
      res.should.not.match(/\[verb\]/);
      res.should.match(/\[remarkable\]/);
      res.should.match(/\[micromatch\]/);
      cb();
    });
  });

  it('should remove an array of names passed on `options.remove`:', function (cb) {
    var list = ['remarkable', 'micromatch', 'verb', 'assemble'];
    related(list, {remove: ['verb', 'micromatch']}, function (err, res) {
      res.should.match(/\[assemble\]/);
      res.should.not.match(/\[verb\]/);
      res.should.match(/\[remarkable\]/);
      res.should.not.match(/\[micromatch\]/);
      cb();
    });
  });

  it('should truncate the description to the given number of words:', function (cb) {
    related(['remarkable', 'micromatch'], {words: 10}, function (err, res) {
      res.should.equal([
        '* [micromatch](https://github.com/jonschlinkert/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative… [more](https://github.com/jonschlinkert/micromatch)',
        '* [remarkable](https://github.com/jonschlinkert/remarkable): Markdown parser, done right. 100% Commonmark support, extensions, syntax plugins,… [more](https://github.com/jonschlinkert/remarkable)'
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
