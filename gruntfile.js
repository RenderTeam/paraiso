module.exports = function ( grunt ) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
            /* Don't set indent here */
      },
      uses_defaults: [],
      /*special files that don't will be linted with override options */
      with_overrides: {
          options: {
              "jshintrc": true
          },
          files: {
              src: ['Gruntfile.js','config/*.js','mongoose_models/*.js', 
                    'public/javascripts/own/*.js','routes/*.js', 'app.js',
                    'mongo-queries.js']
          }
      }


    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('default', ['jshint']);
};