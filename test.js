/*!
 * helper-related <https://github.com/jonschlinkert/helper-related>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var related = require('./')();

describe('related', function () {
  it('should get a package.json from npm:', function (done) {
    related('verb', function (err, res) {
      res.should.match(/\[verb\]/);
      done();
    });
  });

  it('should get an array of package.json files:', function (done) {
    related(['remarkable', 'micromatch'], function (err, res) {
      res.should.match(/\[remarkable\]/);
      res.should.match(/\[micromatch\]/);
      done();
    });
  });

  it('should filter package properties using glob patterns:', function (done) {
    related(['verb', 'assemble'], ['hom*'], function (err, res) {
      res.should.match(/https:\/\//);
      done();
    });
  });

  it('should filter package properties using glob patterns:', function (done) {
    related(['verb', 'assemble'], ['name'], function (err, res) {
      res.should.not.match(/https:\/\//);
      done();
    });
  });

  it('should throw an error:', function () {
    (function () {
      related();
    }).should.throw('helper-related expects a string or array.');
  });
});
