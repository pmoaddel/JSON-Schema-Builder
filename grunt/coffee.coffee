module.exports = ( grunt, options ) ->
  options:
    sourceMap: true
    extDot: 'last'

  main:
    files:
      'build/jsonSchema-coffee.js': ['src/**/*.coffee']
