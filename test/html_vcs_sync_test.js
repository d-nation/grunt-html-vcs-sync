'use strict';

var grunt = require('grunt');

var cheerio = require('cheerio');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.html_vcs_sync = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },/*
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },*/
  hg_existing_meta: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hg-index.html');
    var $ = cheerio.load(actual);
    var actualVCSTag = $('meta[name=VCSTag]').attr("content");
    var expected = grunt.file.read('test/expected/version');

    test.equal(actualVCSTag, expected, 'should add the vcs meta tag.');

    test.done();
  },
  hg_no_existing_meta: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hg-index-no-meta.html');
    var $ = cheerio.load(actual);
    var actualVCSTag = $('meta[name=VCSTag]').attr("content");
    var expected = grunt.file.read('test/expected/version');

    test.equal(actualVCSTag, expected, 'should add the vcs meta tag.');

    test.done();
  }
};
