# grunt-html-vcs-sync

> Syncs asset urls with the most recent vcs tag. Supports Mercurial (Git coming soon).

Credits: This plugin is basically an extension of Gilles Ruppert's [grunt-asset-cachebuster](https://github.com/gillesruppert/grunt-asset-cachebuster). If you need asset versioning that isn't a VCS tag, use it instead.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-vcs-sync --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-vcs-sync');
```

## The "html_vcs_sync" task

### Overview
In your project's Gruntfile, add a section named `html_vcs_sync` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  html_vcs_sync: {
    vcs_name: {
      options: {
        // Task-specific options go here.
      },
      your_target: {
        // Target-specific file lists and/or options go here.
      },
    }
  },
});
```

### Options

#### options.ignore
Type: `Array`
Default value: []

Array of strings that, if in the url of an asset, will not have the version number appended. This is useful for CDNs or assets that are never changed.

#### options.vcs
Type: `Object`

The object describing your version control system.

#### options.vcs.type
Type: `String`
Default value: `'git'`

The string name of your vcs. Currently only "mercurial" works.

#### options.vcs.tagLocation
Type: `String`
Default value: `""`

Mercurial only: The path to your .hgtags file.

### Usage Examples

#### Mercurial
In this example, Mercurial is the VCS of choice. If the latest tag in `.hgtags` is 1.0.2 then `index.html` and `another-page.html` would have all asset urls within them be appended with "?v=1.0.2" (or changed to "?v=1.0.2" if it had a version already added to the url).

```js
grunt.initConfig({
  html_vcs_sync: {
    mercurial: {
      options: {
        vcs: {
          type: 'mercurial',
          tagLocation: '.hgtags'
        },
        ignore: ["code.jquery.com"]
      },
      files: {
        'templates/index.html': ['templates/index.html'],
        'templates/another-page.html': ['templates/another-page.html']
      }
    }
  },
});
```

#### Git
Not implemented yet

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
