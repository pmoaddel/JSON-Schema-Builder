module.exports = ( grunt, options ) ->
  main:
    files: [
      'src/**'
      'docs/**'
    ]
    tasks: [
      'dist'
    ]
