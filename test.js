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
  it('should get a package.json from npm', function (cb) {
    related('verb', function (err, res) {
      res.should.match(/\[verb\]/);
      cb();
    });
  });

  it('should get an array of package.json files', function (cb) {
    related(['remarkable', 'micromatch'], function (err, res) {
      res.should.match(/\[remarkable\]/);
      res.should.match(/\[micromatch\]/);
      cb();
    });
  });

  it('should truncate description to 15 words by default', function (cb) {
    related(['micromatch', 'assemble'], function (err, res) {
      res.should.equal([
        '* [assemble](http://assemble.io): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt,… [more](http://assemble.io)',
        '* [micromatch](https://github.com/jonschlinkert/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. Just… [more](https://github.com/jonschlinkert/micromatch)'
      ].join('\n'));
      cb();
    });
  });

  it('should truncate description to given number of words (words:10)', function (cb) {
    related(['remarkable', 'micromatch'], {words: 10}, function (err, res) {
      res.should.equal([
        '* [micromatch](https://github.com/jonschlinkert/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative… [more](https://github.com/jonschlinkert/micromatch)',
        '* [remarkable](https://github.com/jonschlinkert/remarkable): Markdown parser, done right. 100% Commonmark support, extensions, syntax plugins,… [more](https://github.com/jonschlinkert/remarkable)'
      ].join('\n'));
      cb();
    });
  });

  it('should truncate description to 15 when truncate:true', function (cb) {
    related(['micromatch', 'assemble'], function (err, res) {
      res.should.equal([
        '* [assemble](http://assemble.io): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt,… [more](http://assemble.io)',
        '* [micromatch](https://github.com/jonschlinkert/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. Just… [more](https://github.com/jonschlinkert/micromatch)'
      ].join('\n'));
      cb();
    });
  });

  it('should not truncate description when truncate:false', function (cb) {
    related(['micromatch', 'assemble'], {truncate: false}, function (err, res) {
      res.should.equal([
        '* [assemble](http://assemble.io): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt, Less.js / lesscss.org, Topcoat, Web Experience Toolkit, and hundreds of other projects to build sites, themes, components, documentation, blogs and gh',
        '* [micromatch](https://github.com/jonschlinkert/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. Just use `micromatch.isMatch()` instead of `minimatch()`, or use `micromatch()` instead of `multimatch()`.'
      ].join('\n'));
      cb();
    });
  });

  it('should throw an error', function () {
    (function () {
      related();
    }).should.throw('helper-related expects a string or array.');
  });
});
