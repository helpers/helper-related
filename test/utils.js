'use strict';

require('mocha');
var assert = require('assert');
var utils = require('../utils');
var pkg = require('../package');

describe('utils', function() {
  it('should truncate words in a string', function() {
    var res = utils.truncateWords('Assemble is a powerful, extendable and easy to use static site generator for node.js. Used by thousands of projects for much more than building websites, Assemble is also used for creating themes, scaffolds, boilerplates, e-books, UI components, API documentation.', {words: 10});

    assert.equal(res, 'Assemble is a powerful, extendable and easy to use static…');
  });

  it('should truncate the specified number of words', function() {
    var res = utils.truncateWords('Assemble is a powerful, extendable and easy to use static site generator for node.js. Used by thousands of projects for much more than building websites, Assemble is also used for creating themes, scaffolds, boilerplates, e-books, UI components, API documentation.', {words: 9});
    assert.equal(res, 'Assemble is a powerful, extendable and easy to use…');
  });

  it('should add a link after truncated words', function() {
    var res = utils.truncateWords('Assemble is a powerful, extendable and easy to use static site generator for node.js. Used by thousands of projects for much more than building websites, Assemble is also used for creating themes, scaffolds, boilerplates, e-books, UI components, API documentation.', {words: 10, homepage: pkg.homepage});

    assert.equal(res, 'Assemble is a powerful, extendable and easy to use static… [more](https://github.com/helpers/helper-related)');
  });

  it('should truncate characters in a string', function() {
    var res = utils.truncateString('Assemble is a powerful, extendable and easy to use static site generator for node.js. Used by thousands of projects for much more than building websites, Assemble is also used for creating themes, scaffolds, boilerplates, e-books, UI components, API documentation.');

    assert.equal(res, 'Assemble is a powerful, extendable and easy to use…');
  });

  it('should add a link after truncated characters', function() {
    var res = utils.truncateString('Assemble is a powerful, extendable and easy to use static site generator for node.js. Used by thousands of projects for much more than building websites, Assemble is also used for creating themes, scaffolds, boilerplates, e-books, UI components, API documentation.', {homepage: pkg.homepage});

    assert.equal(res, 'Assemble is a powerful, extendable and easy to use… [more](https://github.com/helpers/helper-related)');
  });

  it('should add a link after the specified number of truncated characters', function() {
    var res = utils.truncateString('Assemble is a powerful, extendable and easy to use static site generator for node.js. Used by thousands of projects for much more than building websites, Assemble is also used for creating themes, scaffolds, boilerplates, e-books, UI components, API documentation.', {homepage: pkg.homepage, chars: 57});

    assert.equal(res, 'Assemble is a powerful, extendable and easy to use static… [more](https://github.com/helpers/helper-related)');
  });
});
