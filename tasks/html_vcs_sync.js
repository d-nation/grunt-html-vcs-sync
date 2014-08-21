/*
 * grunt-html-vcs-sync
 * https://github.com/d-nation/grunt-html-vcx-sync
 *
 * Copyright (c) 2014 Dustin Nation
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var shell = require('shelljs');
var interpolate = require('interpolate');

function isCss(filepath) {
  return (/\.css$/).test(filepath);
}

function isHtml(filepath, extension) {
  var htmlTest = new RegExp('\\.' + extension + '$', 'gi');
  return htmlTest.test(filepath);
}

function bust(buster, url) {
  return (typeof buster === 'function') ? buster(url) : buster;
}

function replace(replacer, options) {

  return function _replace(match, p1) {
    if (!options.ignore.some(function (ignore) { return match.indexOf(ignore) > -1; })) {
      return interpolate(replacer, { p1: p1, buster: bust(options.vcs.vcsTag, p1) });
    } else {
      return match;
    }
  };
}

function cacheBustCss(css, options) {
  var img = /url\(['"]?(?!data:)([^)'"?]+)['"]?(?:\?v=[0-9]+)*\)/gi;
  return css.replace(img, replace('url({p1}?v={buster})', options));
}

function cacheBustHtml(html, options) {
  var css = /href="(.+\.css)(\?v=.+?)?"/gi;
  html = html.replace(css, replace('href="{p1}?v={buster}"', options));

  var js = /src="(.+?\.js)(\?v=.+?)?"/gi;
  html = html.replace(js, replace('src="{p1}?v={buster}"', options));

  //grab js out of the data-main attr (for require.js users)
  var datamain = /data-main="(.+?\.js)(\?v=.+?)?"/gi;
  html = html.replace(datamain, replace('data-main="{p1}?v={buster}"', options));

  var images = /src="(.+\.(?:png|gif|jpg|jpeg))(\?v=.+?)?"/gi;
  html = html.replace(images, replace('src="{p1}?v={buster}"', options));
  return html;
}

function getHgTagLastLine(fileName){
  var data = fs.readFileSync(fileName, 'utf8'),
      lines = data.split("\n");

  return lines[lines.length - 2];
}

function getHgTags(fileName){
    var line = getHgTagLastLine(fileName || ".hgtags"),
        tokens = line.split(" ");

    return tokens[1].trim();
}

module.exports = function(grunt) {

  function cacheBust(src, files, options) {
    if (isCss(files.dest)) {
      grunt.file.write(files.dest, cacheBustCss(src, options));
    }
    else if (isHtml(files.dest, "html")) {
      grunt.file.write(files.dest, cacheBustHtml(src, options));
    } else {
      grunt.file.write(files.dest, cacheBustHtml(src, options));
    }
    grunt.log.writeln('Assets in "' + files.dest + '" synced to tag ' + options.vcs.vcsTag + '.');
  }

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('html_vcs_sync', 'Syncs version numbers in your html with vcs tags', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      vcs: {
          type: 'git'
      },
      ignore: []
    });

    //Get most recent VCS tag
    if (options.vcs.type === "mercurial") {
      options.vcs.vcsTag = getHgTags(options.vcs.tagLocation);
    } else {
      var gitDescribe =  shell.exec('git describe', {silent: true}).output.trim();
      options.vcs.vcsTag = gitDescribe.split("-")[0];
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(files) {
      var src = files.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filepath) { return grunt.file.read(filepath); })
      .join(grunt.util.normalizelf(''));

      try {
        cacheBust(src, files, options);
      } catch (e) {
        grunt.log.error('ERROR:', e.message, e);
        grunt.fail.warn('Failed to cachebust assets in: ' + files.dest);
      }
    });
  });

};
