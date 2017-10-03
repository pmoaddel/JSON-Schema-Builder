module.exports = ( grunt, options ) ->
  main:
    files: [
      'src/**'
      'docs/**'
    ]
    tasks: [
      'dev'
    ]

  # sass:
  #   files: [
  #     'scss/**/*.scss'
  #   ]
  #   tasks: [
  #     'sass'
  #     'autoprefixer'
  #   ]
