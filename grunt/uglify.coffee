module.exports = ( grunt, options ) ->
  main:
    files:
      'dist/jsonSchema.min.js': ['dist/jsonSchema.js']
