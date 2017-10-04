module.exports = (grunt) ->
	jsonschema: {
    cwd: 'src/templates'
		src: '**.html'
		dest: 'build/templates.js'
		options:
			module: 'json-schema-builder'
			# htmlmin:
			# 	collapseWhitespace: true
			prefix: 'json-schema-builder/templates'
  }
    