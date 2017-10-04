module.exports = (grunt, options) ->
  build:
    files:[
      {
        expand: true
        flatten: true
        cwd: 'src'
        src: [
          'css/**/*.css'
          'js/**/*.js'
        ]
        dest: 'build'
      }
    ]