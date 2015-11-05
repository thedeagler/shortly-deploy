module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: [/*'public/lib/*.js',*/ 'public/client/*.js'],
        dest: 'public/dist/scripts.js'
      },
      css: {
        src: ['public/*.css'],
        dest: 'public/dist/gra.css'
      }
    },

    clean: ['public/dist'],

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      js: {
        src: 'public/dist/scripts.js',
        dest: 'public/scripts.min.js'
      },
    },

    jshint: {
      files: ['*.js', 'app/**/*.js', 'app/*.js', 'public/client/*.js'],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'public/lib/**/*.js',
          'public/dist/**/*.js',
          'public/client/shortly-express.min.js'
        ]
      }
    },

    cssmin: {
        target: {
          files: {
            'public/styles.min.css': ['public/dist/gra.css']
          }
        }
    },

    watch: {
      options: {
        ignores: '**/*.min.*'
      },
      scripts: {
        files: ['public/client/**/*.js', 'public/lib/**/*.js', '!public/scripts.min.js'],
        tasks: ['clean', 'concat:js', 'uglify']
      },
      css: {
        files: ['public/*.css', '!public/styles.min.css'],
        tasks: ['clean', 'concat:css', 'cssmin']
      }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('build', ['clean', 'concat', 'uglify', 'cssmin']);

  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', ['jshint']);


};
