module.exports = function (grunt) {
  'use strict';

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // Project configuration
  grunt.initConfig({
    // Metadata
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= props.license %> */\n',
    // Task configuration
    clean: {
      dist: {
        files: [{
          dot: true,
          src: ['dist/']
        }]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/design.js'],
        dest: 'dist/design.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/design.min.js'
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'site/',
          src: ['**'],
          dest: 'dist/'
        }]
      }
    },
    jshint: {
      options: {
        node: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        eqnull: true,
        browser: true,
        globals: { jQuery: true },
        boss: true
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'site/pages/**/*.html',
          'site/stylesheets/**/*.css',
          'site/javascripts/**/*.js',
          'site/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 7000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35733
      },
      livereload: {
        options: {
          base: 'site',
          open: true
        }
      }
    },
    buildcontrol: {
      dist: {
        options: {
          remote: 'git@github.com:Gizra/arava-ect.git',
          branch: 'gh-pages',
          commit: true,
          push: true
        }
      }
    }
  });

  // Default task
  grunt.registerTask('serve', [
    'jshint',
    'connect:livereload',
    'watch'
  ]);

  // Default task
  grunt.registerTask('build', [
    'clean:dist',
    'jshint',
    'copy:dist',
    'buildcontrol'
  ]);
};

