module.exports = ( grunt, options ) ->
  options:
    sourceMap: true
    extDot: 'last'

  main:
    files:
      'dist/fixtable-angular.js': ['coffee/**/*.coffee']
