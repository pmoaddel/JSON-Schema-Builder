/* global angular */

angular.module('json-schema-builder', [])
        .directive('jsonSchemaBuilder', jsonSchemaBuilderDirective)
        .directive('modelTypeSelector', modelTypeSelectorDirective);

jsonSchemaBuilderDirective.$inject = [];
function jsonSchemaBuilderDirective() {
    return{
        restrict: 'A',
        scope: {
            $data: '=data'},
        templateUrl: 'json-schema-builder/templates/jsonSchema.html',  
        link: function ($scope, ele, attr, model) {

            var MODELS = {};

            MODELS.Default = {
                _key: '',
                _title: '',
                _description: '',
                _$ref: '',
                _default: '',
                _enum: '',
                _type: '',
                _required: false,
                __ID__: ''
            };
            MODELS._id_ = 0;

            var additional = {
                forObject: {
                    _properties: [],
                    _additionalProperties: [],
                    _disallowAdditional: false,
                    _maxProperties: undefined,
                    _minProperties: undefined,
                    _type: 'Object'
                },
                forString: {
                    _format: '',
                    _pattern: undefined,
                    _maxLength: undefined,
                    _minLength: undefined,
                    _type: 'String'
                },
                forArray: {
                    _items: [],
                    _maxItems: undefined,
                    _minItems: undefined,
                    _uniqueItems: undefined,
                    _type: 'Array'
                },
                forInteger: {
                    _format: '',
                    _maximum: undefined,
                    _minimum: undefined,
                    _exclusiveMaximum: undefined,
                    _exclusiveMinimum: undefined,
                    _multipleOf: undefined,
                    _type: 'Integer'

                },
                forNumber: {
                    _format: '',
                    _maximum: undefined,
                    _minimum: undefined,
                    _exclusiveMaximum: undefined,
                    _exclusiveMinimum: undefined,
                    _multipleOf: undefined,
                    _type: 'Number'

                }
            };


            MODELS.newArray = function (key) {
                var newArr = {};
                angular.merge(newArr, MODELS.Default, additional.forArray);
                MODELS._id_++;
                newArr.__ID__ = '$model' + MODELS._id_;
                newArr._key = key;
                return newArr;
            };

            MODELS.newBoolean = function (key) {
                var newBool = {};
                angular.merge(newBool, MODELS.Default, {_type: 'Boolean'});
                MODELS._id_++;
                newBool.__ID__ = '$model' + MODELS._id_;
                newBool._key = key;
                return newBool;
            };

            MODELS.newInteger = function (key) {
                var newInt = {};
                angular.merge(newInt, MODELS.Default, additional.forInteger);
                MODELS._id_++;
                newInt.__ID__ = '$model' + MODELS._id_;
                newInt._key = key;
                return newInt;
            };

            MODELS.newNumber = function (key) {
                var newNum = {};
                angular.merge(newNum, MODELS.Default, additional.forNumber);
                MODELS._id_++;
                newNum.__ID__ = '$model' + MODELS._id_;
                newNum._key = key;
                return newNum;
            };

            MODELS.newNull = function (key) {
                var newNull = {};
                angular.merge(newNull, MODELS.Default, {_type: 'Null'});
                MODELS._id_++;
                newNull.__ID__ = '$model' + MODELS._id_;
                newNull._key = key;
                return newNull;
            };

            MODELS.newObject = function (key) {
                var newObj = {};
                angular.merge(newObj, MODELS.Default, additional.forObject);
                MODELS._id_++;
                newObj.__ID__ = '$model' + MODELS._id_;
                newObj._key = key;
                return newObj;
            };

            MODELS.newString = function (key) {
                var newStr = {};
                angular.merge(newStr, MODELS.Default, additional.forString);
                MODELS._id_++;
                newStr.__ID__ = '$model' + MODELS._id_;
                newStr._key = key;
                return newStr;
            };



            initRootElement();
            function initRootElement() {
                if ($scope.$data){
                    $scope.entity = $scope.$data;
                    //TODO: update model{id} for existing data 
                    return;
                }
                $scope.$data = MODELS.newObject('$$ROOT##');
                $scope.$data.$root$ = true;
                var name = MODELS.newBoolean('name');
                var address = MODELS.newArray('address');

                var info = MODELS.newObject('info');
                var age = MODELS.newString('age');
                var test = MODELS.newArray('test');
                info._properties.push({age: age});
                info._properties.push({test: test});

                $scope.$data._properties.push({name: name});
                $scope.$data._properties.push({address: address});
                $scope.$data._properties.push({info: info});

                //initiate the entity used in all html templates;update whenever $data is changes (new opject is created)
                $scope.entity = $scope.$data;
            }

            $scope.configs = {
                showArrItems: false,
                currModelType: ''
            };

            function generateModel(type, key) {
                var newModel;
                switch (type) {
                    case 'Array':
                        newModel = MODELS.newArray(key);
                        break;
                    case 'Boolean':
                        newModel = MODELS.newBoolean(key);
                        break;
                    case 'Integer':
                        newModel = MODELS.newInteger(key);
                        break;
                    case 'Number':
                        newModel = MODELS.newNumber(key);
                        break;
                    case 'Null':
                        newModel = MODELS.newNull(key);
                        break;
                    case 'Object':
                        newModel = MODELS.newObject(key);
                        break;
                    case 'String':
                        newModel = MODELS.newString(key);
                        break;
                }
                return newModel;
            }

            $scope.changeModelType = function (type, entity) {
                var newModel = {};
                newModel = generateModel(type, entity._key);
                var res = updateModel($scope.$data, entity.__ID__, newModel);
                if (res === 1) {
                    $scope.$data = newModel;
                    $scope.$data.$root$ = true;
                    $scope.entity = $scope.$data;
                }
            };

            function  updateModel(data, id, newModel) {
                if (data.__ID__ === id)
                    return 1;
                var res;
                switch (data._type) {
                    case 'String':
                        // nothingt to do here
                        break;
                    case 'Integer':
                        // nothing to do here
                        break;
                    case 'Object':
                        for (var i = 0; i < data._properties.length; i++) {
                            var o = data._properties[i];
                            angular.forEach(o, function (val, key) {
                                res = updateModel(val, id, newModel);
                                if (res === 1) {
                                    data._properties[i][key] = newModel;
                                }
                            });
                        }
                        break;
                }
            }

            $scope.addNewProp = function (entity, data) {
                if (entity.__ID__ === data.__ID__) {
                    var apic = MODELS.newString('');
                    data._properties.push({"": apic});
                } else if (data._properties && data._properties.length >= 0) {
                    for (var i = 0; i < data._properties.length; i++) {
                        var o = data._properties[i];
                        angular.forEach(o, function (val, key) {
                            $scope.addNewProp(entity, val);
                        });
                    }
                }
            };

            $scope.modelSelectorOpened = function (status, entity) {
                $scope.configs.currModelType = entity._type;
                if (entity._type === 'Array') {
                    $scope.configs.showArrItems = true;
                } else {
                    $scope.configs.showArrItems = false;
                }
            };

            $scope.setArrayType = function (type, entity) {
                var newM = generateModel(type, 'arrayEle');
                entity._items[0] = newM;
            };

            $scope.removeEntity = function (entity) {
                var res = removeModel($scope.$data, entity.__ID__);
                if (res !== undefined) {
                    $scope.$data._properties.splice(res, 1);
                }
            };

            function removeModel(data, id, i) {
                if (data.__ID__ === id)
                    return i;
                var res;
                switch (data._type) {
                    case 'Object':
                        for (var i = 0; i < data._properties.length; i++) {
                            var o = data._properties[i];
                            angular.forEach(o, function (val, key) {
                                res = removeModel(val, id, i);
                                if (res !== undefined) {
                                    data._properties.splice(i, 1);
                                }
                            });
                        }
                        break;
                }
            }

            $scope.convertObj2Schema = function () {
                var schema = obj2JsonString($scope.$data);
                $scope.$schema = JSON.stringify(schema, null, '\t');
            };

            function obj2JsonString(entity) {
                var schema = {};
                switch (entity._type) {
                    case 'Object':
                        schema.type = 'object';
                        if (entity._description) {
                            schema.description = entity._description;
                        }
                        if (entity._minProperties >= 0) {
                            schema.minProperties = entity._minProperties;
                        }
                        if (entity._maxProperties >= 0) {
                            schema.maxProperties = entity._maxProperties;
                        }
                        if (entity._disallowAdditional) {
                            schema.additionalProperties = !entity._disallowAdditional;
                        }
                        if (entity._properties.length > 0) {
                            schema.properties = {};
                            schema.required = [];
                            for (var i = 0; i < entity._properties.length; i++) {
                                var o = entity._properties[i];
                                angular.forEach(o, function (val, key) {
                                    if (val && val._type) {
                                        var res = obj2JsonString(val);
                                        schema.properties[val._key] = res;
                                        if (val._required) {
                                            schema.required.push(val._key);
                                        }
                                    }
                                });
                            }
                            if (schema.required.length == 0) {
                                delete schema.required;
                            }
                        }
                        console.log(entity);
                        break;
                    case 'String':
                        schema.type = 'string';
                        if (entity._description) {
                            schema.description = entity._description;
                        }
                        if (entity._minLength >= 0) {
                            schema.minLength = entity._minLength;
                        }
                        if (entity._maxLength >= 0) {
                            schema.maxLength = entity._maxLength;
                        }
                        if (entity._pattern) {
                            schema.pattern = entity._pattern;
                        }
                        if (entity._format) {
                            schema.format = entity._format;
                        }
                        if (entity._default) {
                            schema.default = entity._default;
                        }
                        break;
                    case 'Array':
                        schema.type = 'array';
                        if (entity._description) {
                            schema.description = entity._description;
                        }
                        if (entity._default) {
                            schema.default = entity._default;
                        }
                        if (entity._uniqueItems) {
                            schema.uniqueItems = entity._uniqueItems;
                        }
                        if (entity._minItems >= 0) {
                            schema.minItems = entity._minItems;
                        }
                        if (entity._maxItems >= 0) {
                            schema.maxItems = entity._maxItems;
                        }
                        if (entity._items && entity._items[0]) {
                            schema.items = obj2JsonString(entity._items[0]);
                        }
                        break;
                    case 'Integer':
                    case 'Number':
                        schema.type = entity._type == 'Integer' ? 'integer' : 'number';
                        if (entity._description) {
                            schema.description = entity._description;
                        }
                        if (entity._default) {
                            schema.default = entity._default;
                        }
                        if (entity._minimum >= 0) {
                            schema.minimum = entity._minimum;
                        }
                        if (entity._maximum >= 0) {
                            schema.maximum = entity._maximum;
                        }
                        if (entity._exclusiveMinimum) {
                            schema.exclusiveMinimum = entity._exclusiveMinimum;
                        }
                        if (entity._exclusiveMaximum) {
                            schema.exclusiveMaximum = entity._exclusiveMaximum;
                        }
                        if (entity._multipleOf >= 0) {
                            schema.multipleOf = entity._multipleOf;
                        }
                        if (entity._format) {
                            schema.format = entity._format;
                        }
                        break;
                    case 'Boolean':
                        schema.type = 'boolean';
                        if (entity._description) {
                            schema.description = entity._description;
                        }
                        if (entity._default) {
                            schema.default = entity._default;
                        }
                        break;
                    case 'Null':
                        schema.type = 'null';
                        if (entity._description) {
                            schema.description = entity._description;
                        }
                        if (entity._default) {
                            schema.default = entity._default;
                        }
                        break;
                }
                return schema;
            }
        }
    };
}

modelTypeSelectorDirective.$inject = ['$rootScope'];
function modelTypeSelectorDirective($rootScope) {
    return{
        restrict: 'A',
        templateUrl: 'json-schema-builder/templates/modelTypeSelector.html',
        link: function (scope, ele, attr, model) {

        }
    };
}
angular.module('json-schema-builder').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('json-schema-builder/templates/Array-schema.html',
    "<div style=\"margin-left:20px;\">\n" +
    "  <div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "      <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span>\n" +
    "      <span model-type-selector></span>\n" +
    "      <span ng-class=\"entity._items[0]._type\" class=\"unspecified\">[ {{entity._items[0]._type?entity._items[0]._type:'Unspecified'}} ]</span>\n" +
    "      <div class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></div>\n" +
    "      <div class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok\"></span></div>\n" +
    "      <div class=\"model-remove\" ng-if=\"!entity.$root$\"  ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></div>\n" +
    "      <div class=\"model-summary\">\n" +
    "          <span ng-if=\"!entity.$root$\"><input type=\"checkbox\" class=\"small\" ng-model=\"entity._required\"/>Required</span>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "  <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "          <div class=\"t_color bold\">Basic Info</div>\n" +
    "          <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "              <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "                  <label class=\"control-label col-xs-2\">Name:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"Field Name\" ng-model=\"entity._key\">\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Description:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <textarea class=\"form-control\" ng-model=\"entity._description\"></textarea>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <!-- <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Default:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"text\" class=\"form-control sm detail-ip\" ng-model=\"entity._default\" />\n" +
    "                  </div>\n" +
    "              </div> -->\n" +
    "          </form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "          <form class=\"form-inline model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"t_color bold\">Validations</div>\n" +
    "          <div ng-if=\"!entity.$root$\">\n" +
    "              <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "                  <label><input type=\"checkbox\" ng-model=\"entity._required\" /> Required ?</label>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "          <div>\n" +
    "              <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "                  <label><input type=\"checkbox\" ng-model=\"entity._uniqueItems\"> Allow only unique items?</label>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">minItems:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._minItems\" min=\"0\" placeholder=\">=0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">maxItems:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._maxItems\" min=\"0\" placeholder=\">=0\" />\n" +
    "          </div>\n" +
    "      </form>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/Boolean-schema.html',
    "<div style=\"margin-left:20px;\">\n" +
    "  <div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "      <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span>\n" +
    "      <span model-type-selector></span>\n" +
    "      <div class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></div>\n" +
    "      <div class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok\"></span></div>\n" +
    "      <div class=\"model-remove\" ng-if=\"!entity.$root$\"  ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></div>\n" +
    "      <div class=\"model-summary\">\n" +
    "          <span ng-if=\"!entity.$root$\"><input type=\"checkbox\" class=\"small\" ng-model=\"entity._required\"/>Required</span>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "  <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "          <div class=\"t_color bold\">Basic Info</div>\n" +
    "          <div class=\"\">\n" +
    "              <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "                  <label class=\"control-label col-xs-2\">Name:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"Field Name\" ng-model=\"entity._key\">\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Description:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <textarea class=\"form-control\" ng-model=\"entity._description\"></textarea>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Default:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <select class=\"form-control sm detail-ip\" ng-model=\"entity._default\">\n" +
    "                          <option value=\"false\">False</option>\n" +
    "                          <option value=\"true\">True</option>\n" +
    "                      </select>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "          <div class=\"t_color bold\">Validations</div>\n" +
    "          <div ng-if=\"!entity.$root$\">\n" +
    "              <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "                  <label><input type=\"checkbox\" ng-model=\"entity._required\" /> Required ?</label>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      </form>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/Integer-schema.html',
    "<div style=\"margin-left:20px;\">\n" +
    "  <div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "      <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span>\n" +
    "      <span model-type-selector></span>\n" +
    "      <div class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></div>\n" +
    "      <div class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok\"></span></div>\n" +
    "      <div class=\"model-remove\" ng-if=\"!entity.$root$\"  ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></div>\n" +
    "      <div class=\"model-summary\">\n" +
    "          <span ng-if=\"!entity.$root$\"><input type=\"checkbox\" class=\"small\" ng-model=\"entity._required\"/>Required</span>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "  <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "          <div class=\"t_color bold\">Basic Info</div>\n" +
    "          <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "              <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "                  <label class=\"control-label col-xs-2\">Name:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"Field Name\" ng-model=\"entity._key\">\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Description:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <textarea class=\"form-control\" ng-model=\"entity._description\"></textarea>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Default:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._default\" />\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "          <form class=\"form-inline model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"t_color bold\">Validations</div>\n" +
    "          <div ng-if=\"!entity.$root$\">\n" +
    "              <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "                  <label><input type=\"checkbox\" ng-model=\"entity._required\" /> Required ?</label>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">minimum:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._minimum\" min=\"0\" />\n" +
    "              <label><input type=\"checkbox\" ng-model=\"entity._exclusiveMinimum\"> Exclude minimum ?</label>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">maximum:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._maximum\" min=\"0\" />\n" +
    "              <label><input type=\"checkbox\" ng-model=\"entity._exclusiveMaximum\"> Exclude maximum ?</label>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">multipleOf:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._multipleOf\" min=\"0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">Format:</label>\n" +
    "              <select class=\"form-control sm detail-ip\" ng-model=\"entity._format\">\n" +
    "                  <option value=\"int32\">int32</option>\n" +
    "                  <option value=\"int64\">int64</option>\n" +
    "              </select>\n" +
    "          </div>\n" +
    "      </form>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/Null-schema.html',
    "<div style=\"margin-left:20px;\">\n" +
    "  <div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "      <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span>\n" +
    "      <span model-type-selector></span>\n" +
    "      <div class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></div>\n" +
    "      <div class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok\"></span></div>\n" +
    "      <div class=\"model-remove\" ng-if=\"!entity.$root$\"  ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></div>\n" +
    "  </div>\n" +
    "  <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "          <div class=\"t_color bold\">Basic Info</div>\n" +
    "          <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "              <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "                  <label class=\"control-label col-xs-2\">Name:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"Field Name\" ng-model=\"entity._key\">\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Description:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <textarea class=\"form-control\" ng-model=\"entity._description\"></textarea>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/Number-schema.html',
    "<div style=\"margin-left:20px;\">\n" +
    "  <div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "      <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span>\n" +
    "      <span model-type-selector></span>\n" +
    "      <div class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></div>\n" +
    "      <div class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok\"></span></div>\n" +
    "      <div class=\"model-remove\" ng-if=\"!entity.$root$\"  ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></div>\n" +
    "      <div class=\"model-summary\">\n" +
    "          <span ng-if=\"!entity.$root$\"><input type=\"checkbox\" class=\"small\" ng-model=\"entity._required\"/>Required</span>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "  <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "          <div class=\"t_color bold\">Basic Info</div>\n" +
    "          <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "              <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "                  <label class=\"control-label col-xs-2\">Name:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"Field Name\" ng-model=\"entity._key\">\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Description:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <textarea class=\"form-control\" ng-model=\"entity._description\"></textarea>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Default:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._default\" />\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "          <form class=\"form-inline model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"t_color bold\">Validations</div>\n" +
    "          <div ng-if=\"!entity.$root$\">\n" +
    "              <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "                  <label><input type=\"checkbox\" ng-model=\"entity._required\" /> Required ?</label>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">minimum:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._minimum\" min=\"0\" />\n" +
    "              <label><input type=\"checkbox\" ng-model=\"entity._exclusiveMinimum\"> Exclude minimum ?</label>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">maximum:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._maximum\" min=\"0\" />\n" +
    "              <label><input type=\"checkbox\" ng-model=\"entity._exclusiveMaximum\"> Exclude maximum ?</label>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">multipleOf:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._multipleOf\" min=\"0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">Format:</label>\n" +
    "              <select class=\"form-control sm detail-ip\" ng-model=\"entity._format\">\n" +
    "                  <option value=\"float\">float</option>\n" +
    "                  <option value=\"double\">double</option>\n" +
    "              </select>\n" +
    "          </div>\n" +
    "      </form>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/Object-schema.html',
    "<div style=\"margin-left:20px;position:relative;\">\n" +
    "  <div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false;objDetSxpanded=true\">\n" +
    "      <button class=\"btn btn-link btn-href glyphicon glyphicon-plus obj-add\" ng-click=\"addNewProp(entity,$data)\"></button>\n" +
    "      <span class=\"glyphicon t_color obj-exp\" ng-class=\"objDetSxpanded?'glyphicon-triangle-bottom':'glyphicon-triangle-right'\" ng-click=\"objDetSxpanded=!objDetSxpanded\"></span>\n" +
    "      <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span> \n" +
    "      <span model-type-selector></span>\n" +
    "      <span style=\"color:#9E9E9E;font-size:12px;\">{<span>{{entity._properties.length}}</span>}</span>\n" +
    "      <div class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></div>\n" +
    "      <div class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok\"></span></div>\n" +
    "      <div class=\"model-remove\" ng-if=\"!entity.$root$\"  ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></div>\n" +
    "      <div class=\"model-summary\">\n" +
    "          <span ng-show=\"entity._description\" class=\"icon bj-playlist_add_check ico\" uib-tooltip=\"Description present\"></span>\n" +
    "          <span ng-if=\"!entity.$root$\"><input type=\"checkbox\" class=\"small\" ng-model=\"entity._required\"/>Required</span>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "  <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "          <div class=\"t_color bold\">Basic Info</div>\n" +
    "          <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "              <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "                  <label class=\"control-label col-xs-2\">Name:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"Field Name\" ng-model=\"entity._key\">\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Description:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <textarea class=\"form-control\" ng-model=\"entity._description\"></textarea>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Default:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"text\" class=\"form-control sm detail-ip\" ng-model=\"entity._default\" />\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "          <form class=\"form-inline model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"t_color bold\">Validations</div>\n" +
    "          <div ng-if=\"!entity.$root$\">\n" +
    "              <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "                  <label><input type=\"checkbox\" ng-model=\"entity._required\"> Required ?</label>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "          <div>\n" +
    "              <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "                  <label><input type=\"checkbox\" ng-model=\"entity._disallowAdditional\"> Disallow Additipnal Properties</label>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">minProperties:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._minProperties\" min=\"0\" placeholder=\">=0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">maxProperties:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._maxProperties\" min=\"0\" placeholder=\">=0\" />\n" +
    "          </div>\n" +
    "      </form>\n" +
    "              \n" +
    "      </div>\n" +
    "  </div>\n" +
    "  <div style=\"border-left:0px solid rgba(0,0,0,0.2)\" ng-show=\"objDetSxpanded\">\n" +
    "      <div ng-repeat=\"prop in entity._properties\">\n" +
    "          <div ng-repeat=\"(key, entity) in prop\">\n" +
    "              <div ng-include=\"'json-schema-builder/templates/'+entity._type+'-schema.html'\"></div>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/String-schema.html',
    "<div style=\"margin-left:20px;\">\n" +
    "  <div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "      <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span>\n" +
    "      <span model-type-selector></span>\n" +
    "      <div class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></div>\n" +
    "      <div class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok\"></span></div>\n" +
    "      <div class=\"model-remove\" ng-if=\"!entity.$root$\"  ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></div>\n" +
    "      <div class=\"model-summary\">\n" +
    "          <span ng-if=\"!entity.$root$\"><input type=\"checkbox\" class=\"small\" ng-model=\"entity._required\"/>Required</span>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "  <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "          <div class=\"t_color bold\">Basic Info</div>\n" +
    "          <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "              <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "                  <label class=\"control-label col-xs-2\">Name:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"Field Name\" ng-model=\"entity._key\">\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Description:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <textarea class=\"form-control\" ng-model=\"entity._description\"></textarea>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                  <label class=\"control-label col-xs-2\">Default:</label>\n" +
    "                  <div class=\"col-xs-9\">\n" +
    "                      <input type=\"text\" class=\"form-control sm detail-ip\" ng-model=\"entity._default\" />\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "          </form>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "          <form class=\"form-inline model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"t_color bold\">Validations</div>\n" +
    "          <div ng-if=\"!entity.$root$\">\n" +
    "              <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "                  <label><input type=\"checkbox\" ng-model=\"entity._required\" /> Required ?</label>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">minLength:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._minLength\" min=\"0\" placeholder=\">=0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">maxLength:</label>\n" +
    "              <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._maxLength\" min=\"0\" placeholder=\">=0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">Pattern:</label>\n" +
    "              <input type=\"text\" class=\"form-control sm detail-ip\" ng-model=\"entity._pattern\" min=\"0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "              <label class=\"model-label-x\">Format:</label>\n" +
    "              <select class=\"form-control sm detail-ip\" ng-model=\"entity._format\">\n" +
    "                  <option value=\"byte\">byte</option>\n" +
    "                  <option value=\"binary\">binary</option>\n" +
    "                  <option value=\"date\">date</option>\n" +
    "                  <option value=\"date-time\">date-time</option>\n" +
    "                  <option value=\"password\">password</option>\n" +
    "              </select>\n" +
    "          </div>\n" +
    "      </form>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/jsonSchema.html',
    "<div>\n" +
    "    <uib-tabset active=\"active\">\n" +
    "        <uib-tab index=\"0\" heading=\"Designer\">\n" +
    "\n" +
    "            <div >\n" +
    "                <div class=\"main\" style=\"background: #fff;padding:20px\">\n" +
    "                    <div ng-include=\"'json-schema-builder/templates/'+$data._type+'-schema.html' \"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </uib-tab>\n" +
    "        <uib-tab index=\"1\" heading=\"JSON Schema\" select=\"convertObj2Schema()\">\n" +
    "            <pre>{{$schema}}</pre>\n" +
    "        </uib-tab>\n" +
    "        <uib-tab index=\"2\" heading=\"Example\">\n" +
    "            <textarea class=\"form-control\"></textarea>\n" +
    "        </uib-tab>\n" +
    "    </uib-tabset>\n" +
    "    \n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/model-selector-schema.html',
    "<div class=\"model-type-selector-cont\">\n" +
    "  <div class=\"t_color model-edit-x\" ng-click=\"$parent.showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil gap\"></span>Edit Model</div>\n" +
    "  <div class=\"title t_color\">Model Type</div>\n" +
    "  <div class=\"model-types\">\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Array'?'t_bg':''\" ng-click=\"changeModelType('Array', entity)\">Array</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Boolean'?'t_bg':''\" ng-click=\"changeModelType('Boolean', entity)\">Boolean</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Integer'?'t_bg':''\" ng-click=\"changeModelType('Integer', entity)\">Integer</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Number'?'t_bg':''\" ng-click=\"changeModelType('Number', entity)\">Number</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Null'?'t_bg':''\" ng-click=\"changeModelType('Null', entity)\">null</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Object'?'t_bg':''\" ng-click=\"changeModelType('Object', entity)\">Object</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='String'?'t_bg':''\" ng-click=\"changeModelType('String', entity)\">String</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-click=\"changeModelType('$ref', entity)\">$ref</button>\n" +
    "  </div>\n" +
    "  <div ng-if=\"configs.showArrItems\">\n" +
    "      <div class=\"title t_color\">Array Items Type</div>\n" +
    "      <div class=\"array-items\">\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('Unspecified', entity)\">Unspecified</button>\n" +
    "          <!--<button class=\"btn btn-link btn-sm\" ng-click=\"\">Array</button>-->\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('Integer', entity)\">Integer</button>\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('Boolean', entity)\">Boolean</button>\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('Number', entity)\">Number</button>\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('Object', entity)\">Object</button>\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('String', entity)\">String</button>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/modelTypeSelector.html',
    "<span uib-dropdown on-toggle=\"modelSelectorOpened(open,entity)\">\n" +
    "  <button type=\"button\" uib-dropdown-toggle class=\"btn btn-link btn-href model-selector\" ng-class=\"entity._type\">{{entity._type}}<span class=\"caret\"></span></button>\n" +
    "  <div class=\"dropdown-menu model-type-selector\" uib-dropdown-menu>\n" +
    "      <div ng-include=\"'json-schema-builder/templates/model-selector-schema.html'\"></div>\n" +
    "  </div>\n" +
    "</span>"
  );

}]);
