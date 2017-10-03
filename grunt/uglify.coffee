module.exports = ( grunt, options ) ->
  main:
    files:
      'dist/jsonSchema.all.min.js': ['dist/jsonSchema.all.js']
