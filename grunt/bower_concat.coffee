module.exports = (grunt, options) ->
  all:
    exclude: [
      'angular'
    ]
    dest: 'build/lib.js'
    cssDest: 'build/lib.css'