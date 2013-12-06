module.exports = function ( grunt ) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    exec: {
      start_server: {
        command: 'mongod&'
      }
    },
    
    jshint: {
      uses_defaults: [],
      /*special files that don't will be linted with override options */
      with_overrides: {
          options: {
              "jshintrc": true
          },
          files: {
              src: ['Gruntfile.js','config/*.js','mongoose_models/*.js', 
                    'public/javascripts/own/**/*.js','routes/*.js', 'app.js',
                    'mongo-queries.js']
          }
      }
    },

    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          args: ['dev'],
          ignoredFiles: ['node_modules/**'],
          watchedExtensions: ['js'],
          delayTime: 1
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('init', ['exec', 'nodemon']);

};