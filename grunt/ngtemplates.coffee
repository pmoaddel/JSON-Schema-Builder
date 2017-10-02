module.exports = (grunt) ->
	jsonschema: {
    cwd: 'src/templates'
		src: '**.html'
		dest: 'dist/templates.js'
		options:
			module: 'json-schema'
			# htmlmin:
			# 	collapseWhitespace: true
			prefix: 'json-schema/templates'
  }
    