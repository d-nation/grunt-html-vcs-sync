# grunt-html-vcs-sync

> Syncs a meta tag named "VCSTag" with the most recent vcs tag. Supports Mercurial and Git (Git coming soon)

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
In this example, Mercurial is the VCS of choice. If the latest tag in `.hgtags` is 1.0.2 then `index.html` and `another-page.html` would have `<meta name="VCSTag" content="1.0.2" />` appended (or the content changed to "1.0.2" if the meta tag already exists).

```js
grunt.initConfig({
  html_vcs_sync: {
    mercurial: {
      options: {
        vcs: {
          type: 'mercurial',
          tagLocation: '.hgtags'
        }
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
