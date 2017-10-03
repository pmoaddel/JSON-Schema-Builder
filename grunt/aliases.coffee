module.exports =

  default: [
  	'dist'
  ]

  dev: [
  	'clean'
    'copy:dist'    
  	'distJS'
    'watch'
  ]

  dist: [
  	'clean'
    'copy:dist'
  	'distJS'
  ]

  buildJS: [
  	# 'coffee'
    'ngtemplates'
    'concat'
  ]

  distJS: [
  	'buildJS'
  	'uglify'
  ]
