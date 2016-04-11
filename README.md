# helper-related [![NPM version](https://img.shields.io/npm/v/helper-related.svg?style=flat)](https://www.npmjs.com/package/helper-related) [![NPM downloads](https://img.shields.io/npm/dm/helper-related.svg?style=flat)](https://npmjs.org/package/helper-related) [![Build Status](https://img.shields.io/travis/helpers/helper-related.svg?style=flat)](https://travis-ci.org/helpers/helper-related)

> Template helper for generating a list of links to the homepages of related GitHub/npm projects.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install helper-related --save
```

## Usage

This is an async helper that should work with any [assemble](https://github.com/assemble/assemble) based application.

**Register the helper**

```js
app.helper('related', require('helper-related'));
```

**Use in templates**

```js
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. Just… [more](https://www.npmjs.com/package/micromatch) | [homepage](https://github.com/jonschlinkert/micromatch)
* [remarkable](https://www.npmjs.com/package/remarkable): Markdown parser, done right. 100% Commonmark support, extensions, syntax plugins, high speed - all in… [more](https://www.npmjs.com/package/remarkable) | [homepage](https://github.com/jonschlinkert/remarkable)
```

Results in a list that looks something like:

```markdown
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. Just… [more](https://www.npmjs.com/package/micromatch) | [homepage](https://github.com/jonschlinkert/micromatch)
* [remarkable](https://www.npmjs.com/package/remarkable): Markdown parser, done right. 100% Commonmark support, extensions, syntax plugins, high speed - all in… [more](https://www.npmjs.com/package/remarkable) | [homepage](https://github.com/jonschlinkert/remarkable)
```

If the array gets long, you can format it like this if you want:

```js
* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [git-branch](https://www.npmjs.com/package/git-branch): Get the current branch for a local git repository. | [homepage](https://github.com/jonschlinkert/git-branch)
* [git-repo-name](https://www.npmjs.com/package/git-repo-name): Get the repository name from the git remote origin URL. | [homepage](https://github.com/jonschlinkert/git-repo-name)
* [git-user-email](https://www.npmjs.com/package/git-user-email): Get the email address of the current user from git config. | [homepage](https://github.com/jonschlinkert/git-user-email)
* [git-user-name](https://www.npmjs.com/package/git-user-name): Get a user's name from git config at the project or global scope, depending on… [more](https://www.npmjs.com/package/git-user-name) | [homepage](https://github.com/jonschlinkert/git-user-name)
* [git-username](https://www.npmjs.com/package/git-username): Get the username from a git remote origin URL. | [homepage](https://github.com/jonschlinkert/git-username)
* [github-repo-url](https://www.npmjs.com/package/github-repo-url): Extract a GitHub project's URL from its git repository URL. | [homepage](https://github.com/jonschlinkert/github-repo-url)
* [handlebars-helpers](https://www.npmjs.com/package/handlebars-helpers): 120+ Handlebars helpers in ~20 categories, for Assemble, YUI, Ghost or any Handlebars project. Includes… [more](https://www.npmjs.com/package/handlebars-helpers) | [homepage](https://github.com/assemble/handlebars-helpers)
* [helper-reflinks](https://www.npmjs.com/package/helper-reflinks): Template helper for generating a list of markdown formatted reference links to github repos for… [more](https://www.npmjs.com/package/helper-reflinks) | [homepage](https://github.com/helpers/helper-reflinks)
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. Just… [more](https://www.npmjs.com/package/micromatch) | [homepage](https://github.com/jonschlinkert/micromatch)
* [remarkable](https://www.npmjs.com/package/remarkable): Markdown parser, done right. 100% Commonmark support, extensions, syntax plugins, high speed - all in… [more](https://www.npmjs.com/package/remarkable) | [homepage](https://github.com/jonschlinkert/remarkable)
* [template-helpers](https://www.npmjs.com/package/template-helpers): Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or… [more](https://www.npmjs.com/package/template-helpers) | [homepage](https://github.com/jonschlinkert/template-helpers)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)   
```

## Related projects

You might also be interested in these projects:

* [assemble](https://www.npmjs.com/package/assemble): Assemble is a powerful, extendable and easy to use static site generator for node.js. Used… [more](https://www.npmjs.com/package/assemble) | [homepage](https://github.com/assemble/assemble)
* [git-branch](https://www.npmjs.com/package/git-branch): Get the current branch for a local git repository. | [homepage](https://github.com/jonschlinkert/git-branch)
* [git-repo-name](https://www.npmjs.com/package/git-repo-name): Get the repository name from the git remote origin URL. | [homepage](https://github.com/jonschlinkert/git-repo-name)
* [git-user-email](https://www.npmjs.com/package/git-user-email): Get the email address of the current user from git config. | [homepage](https://github.com/jonschlinkert/git-user-email)
* [git-user-name](https://www.npmjs.com/package/git-user-name): Get a user's name from git config at the project or global scope, depending on… [more](https://www.npmjs.com/package/git-user-name) | [homepage](https://github.com/jonschlinkert/git-user-name)
* [git-username](https://www.npmjs.com/package/git-username): Get the username from a git remote origin URL. | [homepage](https://github.com/jonschlinkert/git-username)
* [github-repo-url](https://www.npmjs.com/package/github-repo-url): Extract a GitHub project's URL from its git repository URL. | [homepage](https://github.com/jonschlinkert/github-repo-url)
* [handlebars-helpers](https://www.npmjs.com/package/handlebars-helpers): 120+ Handlebars helpers in ~20 categories, for Assemble, YUI, Ghost or any Handlebars project. Includes… [more](https://www.npmjs.com/package/handlebars-helpers) | [homepage](https://github.com/assemble/handlebars-helpers)
* [helper-reflinks](https://www.npmjs.com/package/helper-reflinks): Template helper for generating a list of markdown formatted reference links to github repos for… [more](https://www.npmjs.com/package/helper-reflinks) | [homepage](https://github.com/helpers/helper-reflinks)
* [micromatch](https://www.npmjs.com/package/micromatch): Glob matching for javascript/node.js. A drop-in replacement and faster alternative to minimatch and multimatch. Just… [more](https://www.npmjs.com/package/micromatch) | [homepage](https://github.com/jonschlinkert/micromatch)
* [remarkable](https://www.npmjs.com/package/remarkable): Markdown parser, done right. 100% Commonmark support, extensions, syntax plugins, high speed - all in… [more](https://www.npmjs.com/package/remarkable) | [homepage](https://github.com/jonschlinkert/remarkable)
* [template-helpers](https://www.npmjs.com/package/template-helpers): Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or… [more](https://www.npmjs.com/package/template-helpers) | [homepage](https://github.com/jonschlinkert/template-helpers)
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://www.npmjs.com/package/verb) | [homepage](https://github.com/verbose/verb)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/helper-related/issues/new).

## Building docs

Generate readme and API documentation with [verb](https://github.com/verbose/verb):

```sh
$ npm install verb && npm run docs
```

Or, if [verb](https://github.com/verbose/verb) is installed globally:

```sh
$ verb
```

## Running tests

Install dev dependencies:

```sh
$ npm install -d && npm test
```

## Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2016, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT license](https://github.com/helpers/helper-related/blob/master/LICENSE).

***

_This file was generated by [verb](https://github.com/verbose/verb), v0.9.0, on April 11, 2016._