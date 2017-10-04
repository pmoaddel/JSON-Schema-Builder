module.exports = ( grunt, options ) ->
  main:
    files: [
      'dist/jsonSchema.js': ['build/**/*.js']
      'dist/jsonSchema.css': ['build/**/*.css']
    ]