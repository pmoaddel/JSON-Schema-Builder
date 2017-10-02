module.exports = (grunt, options) ->

  dist:
    files:[
      {
        expand: true
        flatten: true
        cwd: 'src'
        src: [
          'css/*.*'
          'js/*.*'
        ]
        dest: 'dist'
      }
    ]