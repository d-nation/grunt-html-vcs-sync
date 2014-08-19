/*
 * grunt-html-vcs-sync
 * https://github.com/d-nation/grunt-html-vcs-sync
 *
 * Copyright (c) 2014 Dustin Nation
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    html_vcs_sync: {
      mercurial: {
        options: {
          vcs: {
            type: 'mercurial',
            tagLocation: 'test/fixtures/.hgtags'
          }
        },
        files: {
          'tmp/hg-index.html': ['test/fixtures/index.html'],
          'tmp/hg-index-no-meta.html': ['test/fixtures/index-no-meta.html']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'html_vcs_sync', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
