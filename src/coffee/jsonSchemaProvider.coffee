angular.module 'json-schema-builder'
.provider 'jsonSchemaBuilderDefaultOptions',[
  '$translateProvider', 
  'translations'
  ($translateProvider, localTranslations) ->
    t = angular.inject
    @defaultOptions =
      language: 'en'
      useModuleTranslations: true
      translationsNamespace: 'JSON_SCHEMA_BUILDER'
      translations: localTranslations
        
    @$get = -> @defaultOptions

    @setDefaultOptions = (options) ->
      angular.extend(@defaultOptions, options) 
      @configureTranslationProvider()

    @configureTranslationProvider = ->
      options = @defaultOptions
      translations = {}
      if options.useModuleTranslations
        translations[options.translationsNamespace] = options.translations[options.language]
        $translateProvider  
        .translations options.language, translations
        .useSanitizeValueStrategy 'escapeParameters'
        .preferredLanguage options.language or 'en'
    
    @configureTranslationProvider()
    return @
]