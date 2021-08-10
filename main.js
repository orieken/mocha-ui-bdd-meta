'use strict';

const Mocha = require('mocha');
const Suite = require('mocha/lib/suite');
const Test = require('mocha/lib/test');
const EVENT_FILE_PRE_REQUIRE = require('mocha/lib/suite').constants
  .EVENT_FILE_PRE_REQUIRE;
const escapeRe = import('escape-string-regexp');


/**
 * BDD-style interface:
 *
 *      describe('Array', function() {
 *        describe('#indexOf()', function() {
 *          it('should return -1 when not present', function() {
 *            // ...
 *          });
 *
 *          it('should return the index when present', function() {
 *            // ...
 *          });
 *        });
 *      });
 *
 * @param {Suite} suite Root suite.
 */
module.exports = Mocha.interfaces['bdd-meta'] = function (suite) {
  var suites = [suite];

  suite.on(EVENT_FILE_PRE_REQUIRE, function (context, file, mocha) {
    var common = require('mocha/lib/interfaces/common')(suites, context, mocha);

    context.before = common.before;
    context.after = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.run = mocha.options.delay && common.runWithSuite(suite);
    /**
     * Describe a "suite" with the given `title`
     * and callback `fn` containing nested suites
     * and/or tests.
     */

    context.describe = context.context = function (title, meta, fn) {
      if (typeof (meta) === 'function' && fn === undefined) {
        fn = meta;
        meta = {}
      }

      const suite = Suite.create(suites[0], title);
      suite.file = file;
      suite.meta = Object.assign({}, suite.parent.meta, meta);
      suites.unshift(suite)
      fn.call(suite);
      suites.shift();
      return suite;
    };

    /**
     * Pending describe.
     */

    context.xdescribe = context.xcontext = context.describe.skip = function (title, meta, fn) {
      if (typeof (meta) === 'function' && fn === undefined) {
        fn = meta;
        meta = {}
      }

      const suite = Suite.create(suites[0], title);
      suite.specMeta = meta;
      suite.pending = true;
      suites.unshift(suite);
      fn.call(suite);
      suites.shift();
    };


    /**
     * Exclusive suite.
     */

    context.describe.only = function (title, meta, fn) {
      const suite = context.describe(title, meta, fn);
      mocha.grep(suite.fullTitle());
      return suite
    };

    /**
     * Describe a specification or test-case
     * with the given `title` and callback `fn`
     * acting as a thunk.
     */

    context.it = context.specify = function (title, meta, fn) {
      const suite = suites[0];

      if (typeof (meta) === 'function' && fn === undefined) {
        fn = meta;
        meta = {};
      } else if (typeof (meta) === 'object' && fn === null) {
        fn = undefined;
        meta = {};
      }

      if (suite.pending) {
        fn = null;
      }

      const test = new Test(title, fn);
      test.meta = Object.assign({}, suite.meta, meta);
      test.file = file;
      suite.addTest(test);
      return test;
    };

    /**
     * Exclusive test-case.
     */

    context.it.only = function (title,meta, fn) {
      const test = context.it(title, meta, fn);
      const reString = `^${escapeRe(test.fullTitle())}$`;
      mocha.grep(new RegExp(reString))
      return test;
    };

    /**
     * Pending test case.
     */

    context.xit = context.xspecify = context.it.skip = function (title, meta, fn) {
      if (typeof (meta) === 'function' && fn === undefined) {
        meta = {}
      }
      context.it(title, meta, null);
    };
  });
};

module.exports.description = 'BDD or RSpec style with Metadata';
