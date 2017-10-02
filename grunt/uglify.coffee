module.exports = ( grunt, options ) ->
  fixtable:
    files:
      'dist/jsonSchema.min.js': ['dist/**/*.js']
