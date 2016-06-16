/*
 * grunt-codekit
 * https://github.com/carl-erik.kopseng/grunt-codekit
 *
 * Copyright (c) 2014 Carl-Erik Kopseng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  var lrPort = 35729;
  var mozjpeg = require('imagemin-mozjpeg');
  var lrSnippet = require('connect-livereload')({ port: lrPort });
  var lrMiddleware = function(connect, options) {
    return [
      lrSnippet,
      connect.static(options.base[0]),
      connect.directory(options.base[0])
    ];
  };
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    clean: {
        tests: ['dist']
    },

    codekit: {
      defaults: {
        options: {},
        files: {
          'dist/': ['app/*.kit']
        }
      },
    },

    imagemin: {                          // Task 
      static: {                          // Target 
        options: {                       // Target options 
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }],
          use: [mozjpeg()]
        }
      },
      dynamic: {                         // Another target 
        files: [{
          expand: true,                  // Enable dynamic expansion 
          src: ['src/images/*.{png,jpg,gif}'],   // Actual patterns to match 
        }]
      }
    },

    cssmin: {
      css: {  
        src: 'src/styles/style.css',
        dest: 'src/styles/style.min.css'
      }  
    },

    connect: {
      options: {
        port: 8000,
        hostname: 'localhost',
        base: '.'
      },
      livereload: {
        options: {
          middleware: lrMiddleware
        }
      }
    },

    watch: {
      css: {
        files: ['src/styles/*.scss','app/*','src/images/*.{png,jpg,gif}'],
        tasks: ['sass','cssmin','codekit','imagemin'],
        options: {
          livereload: true,
          spawn: false,
        }
      },
      client: {
        options: {
          livereload: lrPort
        },
        files: ['dist/*.html', 'src/styles/*', 'src/scripts/*', 'src/images/*']
      }
    },

    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          'src/styles/style.css': 'src/styles/style.scss'
        }
      }
    }


  });

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'codekit']);
  grunt.registerTask('default', ['codekit','cssmin','imagemin','watch']);
};
