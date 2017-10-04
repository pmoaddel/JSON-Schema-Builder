module.exports =

  default: [
  	'dist'
  ]

  dev: [
  	'clean'
    'stylus'
    'copy:build'    
  	'distJS'
    'watch'
  ]

  dist: [
  	'clean'
    'stylus'
    'copy:dist'
  	'distJS'
  ]

  buildJS: [
  	'coffee'
    'ngtemplates'
    'bower_concat'
    'concat'
  ]

  distJS: [
  	'buildJS'
  	'uglify'
  ]
