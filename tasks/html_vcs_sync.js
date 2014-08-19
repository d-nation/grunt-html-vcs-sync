/*
 * grunt-html-vcs-sync
 * https://github.com/d-nation/grunt-html-vcx-sync
 *
 * Copyright (c) 2014 Dustin Nation
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var cheerio = require('cheerio');

function getLastLine(fileName){
  var data = fs.readFileSync(fileName, 'utf8'),
      lines = data.split("\n");

  return lines[lines.length - 2];
}

function getHgTags(fileName){
    var line = getLastLine(fileName || ".hgtags"),
        tokens = line.split(" ");

    return tokens[1];
}

function findMetaTag(fileName){
    var data = fs.readFileSync(fileName, 'utf8'),
        $ = cheerio.load(data),
        vcsMeta = $('meta[name=VCSTag]').attr("content");

    console.log(vcsMeta);
}

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('html_vcs_sync', 'Syncs version numbers in your html with vcs tags', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', ',
      vcs: {
          type: 'git'
      }
    });
    var vcsTag = "";

    //Get most recent VCS tag
    if (options.vcs.type === "mercurial") {
      vcsTag = getHgTags(options.vcs.tagLocation);
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      src.forEach(function(f2){
        var data = fs.readFileSync(f2, 'utf8'),
          $ = cheerio.load(data),
          vcsMeta = $('meta[name=VCSTag]');

        if (vcsMeta) {
          vcsMeta.attr("content", vcsTag);
        } else {
            $('head').append('<meta name="VCSTag" content="' + vcsTag + '" />');
        }

        // Write the destination file.
        grunt.file.write(f.dest, $.html());

        // Print a success message.
        grunt.log.writeln('File "' + f.dest + '" updateded to version "'+ vcsTag + '".');
      });
    });
  });

};
