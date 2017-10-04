module.exports = ( grunt, options ) ->
  options:
    sourceMap: false
    extDot: 'last'

  main:
    files:
      'build/jsonSchema.js': ['src/**/*.coffee']
