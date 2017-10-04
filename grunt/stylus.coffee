module.exports = (grunt, options) ->
  compile:
    options:
      compress: false
      paths: ['src/styles']
    src: 'src/**/*.{styl,css}'
    dest: 'build/jsonSchema.css'
