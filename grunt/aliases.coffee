module.exports =

  default: [
  	'dist'
  ]

  dev: [
  	'clean'
  	'buildJS'
  ]

  dist: [
  	'clean'
    'copy:dist'
  	'distJS'
  ]

  buildJS: [
  	# 'coffee'
    'ngtemplates'
  ]

  distJS: [
  	'buildJS'
  	'uglify'
  ]
