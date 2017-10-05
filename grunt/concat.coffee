module.exports = ( grunt, options ) ->
  js: 
    files: [
      'build/jsonSchema.js': ['src/**/*.js']
    ]
  main:
    files: [
      'dist/jsonSchema.js': ['build/**/*.js', '!build/lib.js']
      'dist/jsonSchema.css': ['build/**/*.css', '!build/lib.css']
    ]