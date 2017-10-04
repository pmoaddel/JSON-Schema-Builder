### global angular ###
angular.module('json-schema-builder', [])
.directive 'jsonSchemaBuilder', [
    ->
      restrict: 'A'
      scope: $data: '=data'
      templateUrl: 'json-schema-builder/templates/jsonSchema.html'
      link: ($scope, ele, attr, model) ->
        MODELS = {}
        $scope.entity = {}

        # class SchemaProperty
        # name: ->
        #     @_key or @title

        parseSchema = (schema) ->
          switch schema.type
            when 'object'
              if not _.isEmpty(schema?.properties)
                schema._properties ?= []
                _.each schema.properties, (prop, key) ->
                  prop = angular.copy prop
                  prop._key = key
                  prop = parseSchema prop
                  schema._properties.push prop

            when 'array'
              if not _.isEmpty(schema?.items)
                schema.items._key = schema.items?.title
                schema.items = parseSchema schema.items
            #   if not _.isEmpty(schema?.items)
            #     schema._items ?= []
            #     _.each schema.items, (prop, key) ->
            #       prop.key = key
            #       prop = parseSchema prop
            #       schema._items.push prop
            #   return schema

          return schema

        do initRootElement = ->
          if $scope.$data
              $scope.entity = _.extend parseSchema(angular.copy($scope.$data)), $root$: true 
              # console.log $scope.schema
              #TODO: update model{id} for existing data 
              return
        # $scope.entity = MODELS.newObject('$$ROOT##')
        # $scope.$data = MODELS.newObject('$$ROOT##');
        # $scope.$data.$root$ = true;
        # var name = MODELS.newBoolean('name');
        # var address = MODELS.newArray('address');
        # var info = MODELS.newObject('info');
        # var age = MODELS.newString('age');
        # var test = MODELS.newArray('test');
        # info._properties.push({age: age});
        # info._properties.push({test: test});
        # $scope.$data._properties.push({name: name});
        # $scope.$data._properties.push({address: address});
        # $scope.$data._properties.push({info: info});
        # //initiate the entity used in all html templates;update whenever $data is changes (new opject is created)
        # $scope.entity = $scope.$data; 





        # generateModel = (type, key) ->
        #   newModel = undefined
        #   switch type
        #       when 'Array'
        #       newModel = MODELS.newArray(key)
        #       when 'Boolean'
        #       newModel = MODELS.newBoolean(key)
        #       when 'Integer'
        #       newModel = MODELS.newInteger(key)
        #       when 'Number'
        #       newModel = MODELS.newNumber(key)
        #       when 'Null'
        #       newModel = MODELS.newNull(key)
        #       when 'Object'
        #       newModel = MODELS.newObject(key)
        #       when 'String'
        #       newModel = MODELS.newString(key)
        #   newModel

        # updateModel = (data, id, newModel) ->
        #   if data.__ID__ == id
        #       return 1
        #   res = undefined
        #   switch data._type
        #       when 'String'
        #       # nothingt to do here
        #       return
        #       when 'Integer'
        #       # nothing to do here
        #       return
        #       when 'Object'
        #       i = 0
        #       while i < data._properties.length
        #           o = data._properties[i]
        #           angular.forEach o, (val, key) ->
        #           res = updateModel(val, id, newModel)
        #           if res == 1
        #               data._properties[i][key] = newModel
        #           return
        #           i++
        #   return

        # removeModel = (data, id, i) ->
        #   `var i`
        #   if data.__ID__ == id
        #       return i
        #   res = undefined
        #   switch data._type
        #       when 'Object'
        #       i = 0
        #       while i < data._properties.length
        #           o = data._properties[i]
        #           angular.forEach o, (val, key) ->
        #           res = removeModel(val, id, i)
        #           if res != undefined
        #               data._properties.splice i, 1
        #           return
        #           i++
        #   return


        # obj2JsonString = (entity) ->
        #   schema = {}
        #   switch entity._type
        #       when 'Object'
        #       schema.type = 'object'
        #       if entity._description
        #           schema.description = entity._description
        #       if entity._minProperties >= 0
        #           schema.minProperties = entity._minProperties
        #       if entity._maxProperties >= 0
        #           schema.maxProperties = entity._maxProperties
        #       if entity._disallowAdditional
        #           schema.additionalProperties = !entity._disallowAdditional
        #       if entity._properties.length > 0
        #           schema.properties = {}
        #           schema.required = []
        #           i = 0
        #           while i < entity._properties.length
        #           o = entity._properties[i]
        #           angular.forEach o, (val, key) ->
        #               if val and val._type
        #               res = obj2JsonString(val)
        #               schema.properties[val._key] = res
        #               if val._required
        #                   schema.required.push val._key
        #               return
        #           i++
        #           if schema.required.length == 0
        #           delete schema.required
        #       console.log entity
        #       when 'String'
        #       schema.type = 'string'
        #       if entity._description
        #           schema.description = entity._description
        #       if entity._minLength >= 0
        #           schema.minLength = entity._minLength
        #       if entity._maxLength >= 0
        #           schema.maxLength = entity._maxLength
        #       if entity._pattern
        #           schema.pattern = entity._pattern
        #       if entity._format
        #           schema.format = entity._format
        #       if entity.default
        #           schema.default = entity.default
        #       when 'Array'
        #       schema.type = 'array'
        #       if entity._description
        #           schema.description = entity._description
        #       if entity.default
        #           schema.default = entity.default
        #       if entity._uniqueItems
        #           schema.uniqueItems = entity._uniqueItems
        #       if entity._minItems >= 0
        #           schema.minItems = entity._minItems
        #       if entity._maxItems >= 0
        #           schema.maxItems = entity._maxItems
        #       if entity._items and entity._items[0]
        #           schema.items = obj2JsonString(entity._items[0])
        #       when 'Integer', 'Number'
        #       schema.type = if entity._type == 'Integer' then 'integer' else 'number'
        #       if entity._description
        #           schema.description = entity._description
        #       if entity.default
        #           schema.default = entity.default
        #       if entity._minimum >= 0
        #           schema.minimum = entity._minimum
        #       if entity._maximum >= 0
        #           schema.maximum = entity._maximum
        #       if entity._exclusiveMinimum
        #           schema.exclusiveMinimum = entity._exclusiveMinimum
        #       if entity._exclusiveMaximum
        #           schema.exclusiveMaximum = entity._exclusiveMaximum
        #       if entity._multipleOf >= 0
        #           schema.multipleOf = entity._multipleOf
        #       if entity._format
        #           schema.format = entity._format
        #       when 'Boolean'
        #       schema.type = 'boolean'
        #       if entity._description
        #           schema.description = entity._description
        #       if entity.default
        #           schema.default = entity.default
        #       when 'Null'
        #       schema.type = 'null'
        #       if entity._description
        #           schema.description = entity._description
        #       if entity.default
        #           schema.default = entity.default
        #   return schema

        # MODELS.Default =
        #   _key: ''
        #   _title: ''
        #   _description: ''
        #   _$ref: ''
        #   _default: ''
        #   _enum: ''
        #   _type: ''
        #   _required: false
        #   __ID__: ''
        #   MODELS._id_ = 0
        #   additional = 
        #   forObject:
        #       _properties: []
        #       _additionalProperties: []
        #       _disallowAdditional: false
        #       _maxProperties: undefined
        #       _minProperties: undefined
        #       _type: 'Object'
        #   forString:
        #       _format: ''
        #       _pattern: undefined
        #       _maxLength: undefined
        #       _minLength: undefined
        #       _type: 'String'
        #   forArray:
        #       _items: []
        #       _maxItems: undefined
        #       _minItems: undefined
        #       _uniqueItems: undefined
        #       _type: 'Array'
        #   forInteger:
        #       _format: ''
        #       _maximum: undefined
        #       _minimum: undefined
        #       _exclusiveMaximum: undefined
        #       _exclusiveMinimum: undefined
        #       _multipleOf: undefined
        #       _type: 'Integer'
        #   forNumber:
        #       _format: ''
        #       _maximum: undefined
        #       _minimum: undefined
        #       _exclusiveMaximum: undefined
        #       _exclusiveMinimum: undefined
        #       _multipleOf: undefined
        #       _type: 'Number'

        # MODELS.newArray = (key) ->
        #   newArr = {}
        #   angular.merge newArr, MODELS.Default, additional.forArray
        #   MODELS._id_++
        #   newArr.__ID__ = '$model' + MODELS._id_
        #   newArr._key = key
        #   newArr

        # MODELS.newBoolean = (key) ->
        #   newBool = {}
        #   angular.merge newBool, MODELS.Default, _type: 'Boolean'
        #   MODELS._id_++
        #   newBool.__ID__ = '$model' + MODELS._id_
        #   newBool._key = key
        #   newBool

        # MODELS.newInteger = (key) ->
        #   newInt = {}
        #   angular.merge newInt, MODELS.Default, additional.forInteger
        #   MODELS._id_++
        #   newInt.__ID__ = '$model' + MODELS._id_
        #   newInt._key = key
        #   newInt

        # MODELS.newNumber = (key) ->
        #   newNum = {}
        #   angular.merge newNum, MODELS.Default, additional.forNumber
        #   MODELS._id_++
        #   newNum.__ID__ = '$model' + MODELS._id_
        #   newNum._key = key
        #   newNum

        # MODELS.newNull = (key) ->
        #   newNull = {}
        #   angular.merge newNull, MODELS.Default, _type: 'Null'
        #   MODELS._id_++
        #   newNull.__ID__ = '$model' + MODELS._id_
        #   newNull._key = key
        #   newNull

        # MODELS.newObject = (key) ->
        #   newObj = {}
        #   angular.merge newObj, MODELS.Default, additional.forObject
        #   MODELS._id_++
        #   newObj.__ID__ = '$model' + MODELS._id_
        #   newObj._key = key
        #   newObj

        # MODELS.newString = (key) ->
        #   newStr = {}
        #   angular.merge newStr, MODELS.Default, additional.forString
        #   MODELS._id_++
        #   newStr.__ID__ = '$model' + MODELS._id_
        #   newStr._key = key
        #   newStr

        # $scope.configs =
        #   showArrItems: false
        #   currModelType: ''

        # $scope.changeModelType = (type, entity) ->
        #   newModel = {}
        #   newModel = generateModel(type, entity._key)
        #   res = updateModel($scope.$data, entity.__ID__, newModel)
        #   if res == 1
        #       $scope.$data = newModel
        #       $scope.$data.$root$ = true
        #       $scope.entity = $scope.$data
        #   return

        # $scope.addNewProp = (entity, data) ->
        #   if entity.__ID__ == data.__ID__
        #       apic = MODELS.newString('')
        #       data._properties.push '': apic
        #   else if data._properties and data._properties.length >= 0
        #       i = 0
        #       while i < data._properties.length
        #       o = data._properties[i]
        #       angular.forEach o, (val, key) ->
        #           $scope.addNewProp entity, val
        #           return
        #       i++
        #   return

        # $scope.modelSelectorOpened = (status, entity) ->
        #   $scope.configs.currModelType = entity._type
        #   if entity._type == 'Array'
        #       $scope.configs.showArrItems = true
        #   else
        #       $scope.configs.showArrItems = false
        #   return

        # $scope.setArrayType = (type, entity) ->
        #   newM = generateModel(type, 'arrayEle')
        #   entity._items[0] = newM
        #   return

        # $scope.removeEntity = (entity) ->
        #   res = removeModel($scope.$data, entity.__ID__)
        #   if res != undefined
        #       $scope.$data._properties.splice res, 1
        #   return

        # $scope.convertObj2Schema = ->
        #   schema = obj2JsonString($scope.$data)
        #   $scope.$schema = JSON.stringify(schema, null, '\u0009')
        #   return2JsonString($scope.$data)
        #   $scope.$schema = JSON.stringify(schema, null, '\u0009')
        #   return

  ]

.directive 'modelTypeSelector', [
  '$rootScope'
  ($rootScope) ->
    restrict: 'A'
    templateUrl: 'json-schema-builder/templates/modelTypeSelector.html'
    link: (scope, ele, attr, model) ->
]