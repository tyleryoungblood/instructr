module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/**/*.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      options: {
        spawn: false
      },
      sass: {
        files: ['theme/scss/*.scss', './slides.html'],
        tasks: ['sass:dev']
      }
    },

    // Project banner
    tag: {
      banner:   '/*!\n' +
                  ' * <%= pkg.name %>\n' +
                ' * <%= pkg.title %>\n' +
                ' * <%= pkg.url %>\n' +
                ' * @author <%= pkg.author %>\n' +
                ' * @version <%= pkg.version %>\n' +
                ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
                ' */\n'
    },

    // Configure Sass
    sass: {
      // development settings
      dev: {
        options: {
          style:    'compressed', 
          banner:   '<%= tag.banner %>'
        }, 
        files: {
          'theme/css/style.css': 'theme/scss/*.scss'
        }
      }, 
      // production settings
      dist: { 
        options: {
          style:    'compressed', 
          compass:  true
        },
        files: {
          '<%= project.assets %>/css/style.css': '<%= project.css %>'
        }
      }
    },

    browserSync: {
      dev: {
          bsFiles: {
              src : [
                'theme/css/*.css'
              ]

          },
          options: {
              watchTask: true, // < VERY important
              server: {
                baseDir: "./",
                index: "slides.html"
              }
          }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', [
    'uglify',
    'sass:dev',
    'browserSync',
    'watch']);

};