module.exports =

  default: [
  	'dev'
  ]

  dev: [
    'dist'
    'watch'
  ]

  dist: [
  	'clean'
    'stylus'
  	'distJS'
  ]

  distJS: [
  	'coffee'
    'ngtemplates'
    'bower_concat'
    'concat'
  	'uglify'
  ]
