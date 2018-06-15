
/* global angular */

(function() {
  angular.module('json-schema-builder', ['pascalprecht.translate']).directive('jsonSchemaBuilder', [
    'jsonSchemaBuilderDefaultOptions', function(jsonSchemaBuilderDefaultOptions) {
      return {
        restrict: 'A',
        scope: {
          $data: '=data'
        },
        templateUrl: 'json-schema-builder/templates/jsonSchema.html',
        link: function($scope, ele, attr, model) {
          var MODELS, initRootElement, parseSchema;
          MODELS = {};
          $scope.entity = {};
          $scope.t_prefix = jsonSchemaBuilderDefaultOptions.translationsNamespace + '.';
          parseSchema = function(schema) {
            var ref;
            switch (schema.type) {
              case 'object':
                schema.title = schema.title || '[No Name]';
                if (!_.isEmpty(schema != null ? schema.properties : void 0)) {
                  if (schema._properties == null) {
                    schema._properties = [];
                  }
                  _.each(schema.properties, function(prop, key) {
                    prop = angular.copy(prop);
                    prop._key = key;
                    prop.title = prop.title || key;
                    prop = parseSchema(prop);
                    return schema._properties.push(prop);
                  });
                }
                break;
              case 'array':
                if (!_.isEmpty(schema != null ? schema.items : void 0)) {
                  schema.title = schema.title || '[No Name]';
                  schema.items._key = (ref = schema.items) != null ? ref.title : void 0;
                  schema.items = parseSchema(schema.items);
                }
            }
            return schema;
          };
          (initRootElement = function() {
            if ($scope.$data) {
              $scope.entity = _.extend(parseSchema(angular.copy($scope.$data)), {
                $root$: true
              });
            }
          })();
          $scope.configs = {
            showArrItems: false,
            currModelType: ''
          };
          return $scope.modelSelectorOpened = function(status, entity) {
            $scope.configs.currModelType = entity.type;
            if (entity.type === 'array') {
              $scope.configs.showArrItems = true;
            } else {
              $scope.configs.showArrItems = false;
            }
          };
        }
      };
    }
  ]).directive('modelTypeSelector', [
    '$rootScope', function($rootScope) {
      return {
        restrict: 'A',
        templateUrl: 'json-schema-builder/templates/modelTypeSelector.html',
        link: function(scope, ele, attr, model) {}
      };
    }
  ]);

  angular.module('json-schema-builder').provider('jsonSchemaBuilderDefaultOptions', [
    '$translateProvider', 'translations', function($translateProvider, localTranslations) {
      var t;
      t = angular.inject;
      this.defaultOptions = {
        language: 'en',
        useModuleTranslations: true,
        translationsNamespace: 'JSON_SCHEMA_BUILDER',
        translations: localTranslations
      };
      this.$get = function() {
        return this.defaultOptions;
      };
      this.setDefaultOptions = function(options) {
        angular.extend(this.defaultOptions, options);
        return this.configureTranslationProvider();
      };
      this.configureTranslationProvider = function() {
        var options, translations;
        options = this.defaultOptions;
        translations = {};
        if (options.useModuleTranslations) {
          translations[options.translationsNamespace] = options.translations[options.language];
          return $translateProvider.translations(options.language, translations).useSanitizeValueStrategy('escapeParameters').preferredLanguage(options.language || 'en');
        }
      };
      this.configureTranslationProvider();
      return this;
    }
  ]);

  angular.module('json-schema-builder').constant('translations', {
    "en": {
      "JSON_SCHEMA": "JSON Schema",
      "DESCRIPTION": "Description",
      "DEFAULT": "Default",
      "NAME": "Name",
      "BASIC_INFO": "Basic Info",
      "VALIDATIONS": "Validations",
      "REQUIRED": "Required",
      "NOT_REQUIRED": "Not Required",
      "REQUIRED_Q": "Required ?",
      "NO_DESCRIPTION": "No Description",
      "DISALLOW_ADDITIONAL_PROPERTIES": "Disallow Additional Properties",
      "MIN_PROPERTIES": "minProperties",
      "MAX_PROPERTIES": "maxProperties",
      "DESIGNER": "Designer",
      "FALSE": "False",
      "TRUE": "True",
      "MINIMUM": "minimum",
      "MAXIMUM": "maximum",
      "MIN_LENGTH": "minLength",
      "MAX_LENGTH": "maxLength",
      "PATTERN": "Pattern",
      "EXCLUDE_MINIMUM": "Exclude minimum ?",
      "EXCLUDE_MAXIMUM": "Exclude maximum ?",
      "MULTIPLE_OF": "multipleOf",
      "FORMAT": "Format",
      "FLOAT": "float",
      "DOUBLE": "double",
      "BYTE": "byte",
      "BINARY": "binary",
      "DATE": "date",
      "DATE_TIME": "date-time",
      "PASSWORD": "password",
      "FIELD_NAME": "Field Name",
      "INT32": "int32",
      "INT64": "int64",
      "EDIT_MODEL": "Edit Model",
      "ARRAY": "Array",
      "BOOLEAN": "Boolean",
      "INTEGER": "Integer",
      "NUMBER": "Number",
      "NULL": "null",
      "OBJECT": "Object",
      "STRING": "String",
      "DOLLAR_REF": "$ref",
      "ARRAY_ITEMS_TYPE": "Array Items Type",
      "UNSPECIFIED": "Unspecified",
      "MODEL_TYPE": "Model Type"
    }
  });

}).call(this);

//# sourceMappingURL=jsonSchema-coffee.js.map


angular.module('json-schema-builder').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('json-schema-builder/templates/array-schema.html',
    "<div>\n" +
    "  <div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false;objDetSxpanded=true\">\n" +
    "    <!-- <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span> -->\n" +
    "    <input class=\"model-title\" type=\"text\" ng-model=\"entity.title\" />\n" +
    "    <!-- <span model-type-selector></span> -->\n" +
    "    <!-- <div class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></div>\n" +
    "      <div class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok text-success\"></span></div>\n" +
    "      <div class=\"model-remove\" ng-if=\"!entity.$root$\"  ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></div>\n" +
    "      <div class=\"model-actions\">\n" +
    "        <span ng-show=\"entity.description\" class=\"comment glyphicon glyphicon-comment\" uib-tooltip=\"{{entity.description}}\"></span>\n" +
    "        <span ng-if=\"!entity.$root$\"><input type=\"checkbox\" class=\"small\" ng-model=\"entity.required\"/>{{ t_prefix+'REQUIRED' | translate }}</span>\n" +
    "      </div> -->\n" +
    "    <div class=\"model-icons\">\n" +
    "      <div class=\"model-info\">\n" +
    "        <span class=\"model-type\"><span ng-class=\"entity.type\" class=\"badge badge-default\">{{t_prefix+entity.type.toUpperCase() | translate}}</span></span>\n" +
    "        <span class=\"model-required\" ng-if=\"!entity.$root$\"><span class=\"glyphicon glyphicon-asterisk\" ng-click=\"entity.required = !entity.required\" ng-class=\"{'text-danger': entity.required}\" uib-tooltip=\"{{ t_prefix+(entity.required?'REQUIRED':'NOT_REQUIRED') | translate }}\" tooltip-append-to-body=\"true\"></span></span>\n" +
    "        <span class=\"model-comment glyphicon glyphicon-comment\" ng-class=\"{'disabled':!entity.description}\" uib-tooltip=\"{{entity.description?entity.description:(t_prefix+'NO_DESCRIPTION' | translate)}}\"\n" +
    "          tooltip-append-to-body=\"true\"></span>\n" +
    "      </div><div class=\"model-actions\"><!--keep on same line to remove whitespace -->\n" +
    "        <span class=\"obj-add glyphicon glyphicon-plus disabled\"></span>\n" +
    "        <span class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\n" +
    "        <span class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok text-success\"></span></span>\n" +
    "        <span class=\"model-remove\" ng-class=\"{'disabled':entity.$root$}\" ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "        <div class=\"t_color bold\">{{ t_prefix+'BASIC_INFO' | translate }}</div>\n" +
    "        <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'NAME' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"{{ t_prefix+'FIELD_NAME' | translate }}\"\n" +
    "                  ng-model=\"entity._key\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'DESCRIPTION' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <textarea class=\"form-control\" ng-model=\"entity.description\"></textarea>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'DEFAULT' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <input type=\"text\" class=\"form-control sm detail-ip\" ng-model=\"entity.default\" />\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "        <form class=\"form-inline model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"t_color bold\">{{ t_prefix+'VALIDATIONS' | translate }}</div>\n" +
    "          <div ng-if=\"!entity.$root$\">\n" +
    "            <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "              <label><input type=\"checkbox\" ng-model=\"entity.required\" /> {{ t_prefix+'REQUIRED_Q' | translate }}</label>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div>\n" +
    "            <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "              <label><input type=\"checkbox\" ng-model=\"entity._uniqueItems\"> Allow only unique items?</label>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">minItems:</label>\n" +
    "            <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._minItems\" min=\"0\" placeholder=\">=0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">maxItems:</label>\n" +
    "            <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._maxItems\" min=\"0\" placeholder=\">=0\" />\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"indent\" style=\"border-left:0px solid rgba(0,0,0,0.2)\" ng-show=\"objDetSxpanded\" ng-if=\"entity.items.type === 'object' || entity.items.length > 1\">\n" +
    "    <div ng-repeat=\"entity in [entity.items]\" class=\"indent\">\n" +
    "      <div ng-include=\"'json-schema-builder/templates/'+entity.type+'-schema.html'\"></div>\n" +
    "    </div>\n" +
    "  </div>"
  );


  $templateCache.put('json-schema-builder/templates/boolean-schema.html',
    "<div>\n" +
    "  <div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "    <!-- <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span> -->\n" +
    "    <input class=\"model-title\" type=\"text\" ng-model=\"entity.title\" />\n" +
    "    <!-- <span model-type-selector></span> -->\n" +
    "    <div class=\"model-icons\">\n" +
    "      <div class=\"model-info\">\n" +
    "        <span class=\"model-type\"><span ng-class=\"entity.type\" class=\"badge badge-default\">{{t_prefix+entity.type.toUpperCase() | translate}}</span></span>\n" +
    "        <span class=\"model-required\"><span class=\"glyphicon glyphicon-asterisk\" ng-click=\"entity.required = !entity.required\" ng-class=\"{disabled:entity.$root$, 'text-danger': entity.required}\" uib-tooltip=\"{{ (entity.$root$)?'':t_prefix+(entity.required?'REQUIRED':'NOT_REQUIRED') | translate }}\" tooltip-append-to-body=\"true\"></span></span>\n" +
    "        <span class=\"model-comment glyphicon glyphicon-comment\" ng-class=\"{'disabled':!entity.description}\" uib-tooltip=\"{{entity.description?entity.description:(t_prefix+'NO_DESCRIPTION' | translate)}}\"\n" +
    "          tooltip-append-to-body=\"true\"></span>\n" +
    "      </div><div class=\"model-actions\"><!--keep on same line to remove whitespace -->\n" +
    "        <span class=\"obj-add glyphicon glyphicon-plus disabled\"></span>\n" +
    "        <span class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\n" +
    "        <span class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok text-success\"></span></span>\n" +
    "        <span class=\"model-remove\" ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "        <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "            <div class=\"t_color bold\">{{ t_prefix+'BASIC_INFO' | translate }}</div>\n" +
    "            <div class=\"\">\n" +
    "              <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "                <label class=\"control-label col-xs-2\">{{ t_prefix+'NAME' | translate }}:</label>\n" +
    "                <div class=\"col-xs-9\">\n" +
    "                  <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"{{ t_prefix+'FIELD_NAME' | translate }}\"\n" +
    "                    ng-model=\"entity._key\">\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label class=\"control-label col-xs-2\">{{ t_prefix+'DESCRIPTION' | translate }}:</label>\n" +
    "                <div class=\"col-xs-9\">\n" +
    "                  <textarea class=\"form-control\" ng-model=\"entity.description\"></textarea>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"form-group\">\n" +
    "                <label class=\"control-label col-xs-2\">{{ t_prefix+'DEFAULT' | translate }}:</label>\n" +
    "                <div class=\"col-xs-9\">\n" +
    "                  <select class=\"form-control sm detail-ip\" ng-model=\"entity.default\">\n" +
    "                              <option value=\"false\">{{ t_prefix+'FALSE' | translate }}</option>\n" +
    "                              <option value=\"true\">{{ t_prefix+'TRUE' | translate }}</option>\n" +
    "                          </select>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"col-xs-6\">\n" +
    "            <div class=\"t_color bold\">{{ t_prefix+'VALIDATIONS' | translate }}</div>\n" +
    "            <div ng-if=\"!entity.$root$\">\n" +
    "              <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "                <label><input type=\"checkbox\" ng-model=\"entity.required\" /> {{ t_prefix+'REQUIRED_Q' | translate }}</label>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/integer-schema.html',
    "<div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "  <!-- <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span> -->\n" +
    "  <input class=\"model-title\" type=\"text\" ng-model=\"entity.title\" />\n" +
    "  <!-- <span model-type-selector></span> -->\n" +
    "  <div class=\"model-icons\">\n" +
    "      <div class=\"model-info\">\n" +
    "        <span class=\"model-type\"><span ng-class=\"entity.type\" class=\"badge badge-default\">{{t_prefix+entity.type.toUpperCase() | translate}}</span></span>\n" +
    "        <span class=\"model-required\"><span class=\"glyphicon glyphicon-asterisk\" ng-click=\"entity.required = !entity.required\" ng-class=\"{disabled:entity.$root$, 'text-danger': entity.required}\" uib-tooltip=\"{{ (entity.$root$)?'':t_prefix+(entity.required?'REQUIRED':'NOT_REQUIRED') | translate }}\" tooltip-append-to-body=\"true\"></span></span>\n" +
    "        <span class=\"model-comment glyphicon glyphicon-comment\" ng-class=\"{'disabled':!entity.description}\" uib-tooltip=\"{{entity.description?entity.description:(t_prefix+'NO_DESCRIPTION' | translate)}}\"\n" +
    "          tooltip-append-to-body=\"true\"></span>\n" +
    "      </div><div class=\"model-actions\"><!--keep on same line to remove whitespace -->\n" +
    "        <span class=\"obj-add glyphicon glyphicon-plus disabled\"></span>\n" +
    "        <span class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\n" +
    "        <span class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok text-success\"></span></span>\n" +
    "        <span class=\"model-remove\" ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "        <div class=\"t_color bold\">{{ t_prefix+'BASIC_INFO' | translate }}</div>\n" +
    "        <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "            <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'NAME' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"{{ t_prefix+'FIELD_NAME' | translate }}\"\n" +
    "                  ng-model=\"entity._key\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'DESCRIPTION' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <textarea class=\"form-control\" ng-model=\"entity.description\"></textarea>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'DEFAULT' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity.default\" />\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "        <form class=\"form-inline model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"t_color bold\">{{ t_prefix+'VALIDATIONS' | translate }}</div>\n" +
    "          <div ng-if=\"!entity.$root$\">\n" +
    "            <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "              <label><input type=\"checkbox\" ng-model=\"entity.required\" /> {{ t_prefix+'REQUIRED_Q' | translate }}</label>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'MINIMUM' | translate }}:</label>\n" +
    "            <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._minimum\" min=\"0\" />\n" +
    "            <label><input type=\"checkbox\" ng-model=\"entity._exclusiveMinimum\"> {{ t_prefix+'EXCLUDE_MINIMUM' | translate }}</label>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'MAXIMUM' | translate }}:</label>\n" +
    "            <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._maximum\" min=\"0\" />\n" +
    "            <label><input type=\"checkbox\" ng-model=\"entity._exclusiveMaximum\"> {{ t_prefix+'EXCLUDE_MAXIMUM' | translate }}</label>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'MULTIPLE_OF' | translate }}:</label>\n" +
    "            <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._multipleOf\" min=\"0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'FORMAT' | translate }}:</label>\n" +
    "            <select class=\"form-control sm detail-ip\" ng-model=\"entity._format\">\n" +
    "                    <option value=\"int32\">{{ t_prefix+'INT32' | translate }}</option>\n" +
    "                    <option value=\"int64\">{{ t_prefix+'INT64' | translate }}</option>\n" +
    "                </select>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/jsonSchema.html',
    "<div class=\"json-schema-builder\">\n" +
    "  <uib-tabset active=\"active\">\n" +
    "    <uib-tab index=\"0\" heading=\"{{ t_prefix+'DESIGNER' | translate }}\">\n" +
    "\n" +
    "      <div>\n" +
    "        <div class=\"main\" style=\"background: #fff;padding:20px\">\n" +
    "          <ul>\n" +
    "            <li ng-include=\"'json-schema-builder/templates/'+entity.type+'-schema.html' \"></li>\n" +
    "          </ul>\n" +
    "          <pre>{{entity | json }}</pre>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </uib-tab>\n" +
    "    <uib-tab index=\"1\" heading=\"{{ t_prefix+'JSON_SCHEMA' | translate }}\" select=\"convertObj2Schema()\">\n" +
    "      <pre>{{$schema}}</pre>\n" +
    "    </uib-tab>\n" +
    "  </uib-tabset>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/model-selector-schema.html',
    "<div class=\"model-type-selector-cont\">\n" +
    "  <div class=\"t_color model-edit-x\" ng-click=\"$parent.showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil gap\"></span>{{ t_prefix+'EDIT_MODEL' | translate }}</div>\n" +
    "  <div class=\"title t_color\">{{ t_prefix+'MODEL_TYPE' | translate }}</div>\n" +
    "  <div class=\"model-types\">\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Array'?'t_bg':''\" ng-click=\"changeModelType('Array', entity)\">{{ t_prefix+'ARRAY' | translate }}</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Boolean'?'t_bg':''\" ng-click=\"changeModelType('Boolean', entity)\">{{ t_prefix+'BOOLEAN' | translate }}</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Integer'?'t_bg':''\" ng-click=\"changeModelType('Integer', entity)\">{{ t_prefix+'INTEGER' | translate }}</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Number'?'t_bg':''\" ng-click=\"changeModelType('Number', entity)\">{{ t_prefix+'NUMBER' | translate }}</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Null'?'t_bg':''\" ng-click=\"changeModelType('Null', entity)\">{{ t_prefix+'NULL' | translate }}</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='Object'?'t_bg':''\" ng-click=\"changeModelType('Object', entity)\">{{ t_prefix+'OBJECT' | translate }}</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-class=\"configs.currModelType=='String'?'t_bg':''\" ng-click=\"changeModelType('String', entity)\">{{ t_prefix+'STRING' | translate }}</button>\n" +
    "      <button class=\"btn btn-link btn-sm\" ng-click=\"changeModelType('$ref', entity)\">{{ t_prefix+'DOLLAR_REF' | translate }}</button>\n" +
    "  </div>\n" +
    "  <div ng-if=\"configs.showArrItems\">\n" +
    "      <div class=\"title t_color\">{{ t_prefix+'ARRAY_ITEMS_TYPE' | translate }}</div>\n" +
    "      <div class=\"array-items\">\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('Unspecified', entity)\">{{ t_prefix+'UNSPECIFIED' | translate }}</button>\n" +
    "          <!--<button class=\"btn btn-link btn-sm\" ng-click=\"\">Array</button>-->\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('Integer', entity)\">{{ t_prefix+'INTEGER' | translate }}</button>\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('Boolean', entity)\">{{ t_prefix+'BOOLEAN' | translate }}</button>\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('Number', entity)\">{{ t_prefix+'NUMBER' | translate }}</button>\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('Object', entity)\">{{ t_prefix+'OBJECT' | translate }}</button>\n" +
    "          <button class=\"btn btn-link btn-sm\" ng-click=\"setArrayType('String', entity)\">{{ t_prefix+'STRING' | translate }}</button>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/modelTypeSelector.html',
    "<span uib-dropdown on-toggle=\"modelSelectorOpened(open,entity)\">\n" +
    "  <button type=\"button\" uib-dropdown-toggle class=\"btn btn-link btn-href model-selector\" ng-class=\"entity.type\">{{entity.type}}<span class=\"caret\"></span></button>\n" +
    "  <div class=\"dropdown-menu model-type-selector\" uib-dropdown-menu>\n" +
    "      <div ng-include=\"'json-schema-builder/templates/model-selector-schema.html'\"></div>\n" +
    "  </div>\n" +
    "</span>"
  );


  $templateCache.put('json-schema-builder/templates/null-schema.html',
    "<div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "  <!-- <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span> -->\n" +
    "  <input class=\"model-title\" type=\"text\" ng-model=\"entity.title\" />\n" +
    "  <!-- <span model-type-selector></span>-->\n" +
    "  <div class=\"model-icons\">\n" +
    "      <div class=\"model-info\">\n" +
    "        <span class=\"model-type\"><span ng-class=\"entity.type\" class=\"badge badge-default\">{{t_prefix+entity.type.toUpperCase() | translate}}</span></span>\n" +
    "        <span class=\"model-required\"><span class=\"glyphicon glyphicon-asterisk\" ng-click=\"entity.required = !entity.required\" ng-class=\"{disabled:entity.$root$, 'text-danger': entity.required}\" uib-tooltip=\"{{ (entity.$root$)?'':t_prefix+(entity.required?'REQUIRED':'NOT_REQUIRED') | translate }}\" tooltip-append-to-body=\"true\"></span></span>\n" +
    "        <span class=\"model-comment glyphicon glyphicon-comment\" ng-class=\"{'disabled':!entity.description}\" uib-tooltip=\"{{entity.description?entity.description:(t_prefix+'NO_DESCRIPTION' | translate)}}\"\n" +
    "          tooltip-append-to-body=\"true\"></span>\n" +
    "      </div><div class=\"model-actions\"><!--keep on same line to remove whitespace -->\n" +
    "        <span class=\"obj-add glyphicon glyphicon-plus disabled\"></span>\n" +
    "        <span class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\n" +
    "        <span class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok text-success\"></span></span>\n" +
    "        <span class=\"model-remove\" ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "        <div class=\"t_color bold\">{{ t_prefix+'BASIC_INFO' | translate }}</div>\n" +
    "        <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "            <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'NAME' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"{{ t_prefix+'FIELD_NAME' | translate }}\"\n" +
    "                  ng-model=\"entity._key\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'DESCRIPTION' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <textarea class=\"form-control\" ng-model=\"entity.description\"></textarea>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/number-schema.html',
    "<div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "  <!-- <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span> -->\n" +
    "  <input class=\"model-title\" type=\"text\" ng-model=\"entity.title\" />\n" +
    "  <!-- <span model-type-selector></span> -->\n" +
    "  <div class=\"model-icons\">\n" +
    "      <div class=\"model-info\">\n" +
    "        <span class=\"model-type\"><span ng-class=\"entity.type\" class=\"badge badge-default\">{{t_prefix+entity.type.toUpperCase() | translate}}</span></span>\n" +
    "        <span class=\"model-required\"><span class=\"glyphicon glyphicon-asterisk\" ng-click=\"entity.required = !entity.required\" ng-class=\"{disabled:entity.$root$, 'text-danger': entity.required}\" uib-tooltip=\"{{ (entity.$root$)?'':t_prefix+(entity.required?'REQUIRED':'NOT_REQUIRED') | translate }}\" tooltip-append-to-body=\"true\"></span></span>\n" +
    "        <span class=\"model-comment glyphicon glyphicon-comment\" ng-class=\"{'disabled':!entity.description}\" uib-tooltip=\"{{entity.description?entity.description:(t_prefix+'NO_DESCRIPTION' | translate)}}\"\n" +
    "          tooltip-append-to-body=\"true\"></span>\n" +
    "      </div><div class=\"model-actions\"><!--keep on same line to remove whitespace -->\n" +
    "        <span class=\"obj-add glyphicon glyphicon-plus disabled\"></span>\n" +
    "        <span class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\n" +
    "        <span class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok text-success\"></span></span>\n" +
    "        <span class=\"model-remove\" ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "        <div class=\"t_color bold\">{{ t_prefix+'BASIC_INFO' | translate }}</div>\n" +
    "        <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "            <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'NAME' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"{{ t_prefix+'FIELD_NAME' | translate }}\"\n" +
    "                  ng-model=\"entity._key\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'DESCRIPTION' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <textarea class=\"form-control\" ng-model=\"entity.description\"></textarea>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'DEFAULT' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity.default\" />\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "        <form class=\"form-inline model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"t_color bold\">{{ t_prefix+'VALIDATIONS' | translate }}</div>\n" +
    "          <div ng-if=\"!entity.$root$\">\n" +
    "            <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "              <label><input type=\"checkbox\" ng-model=\"entity.required\" /> {{ t_prefix+'REQUIRED_Q' | translate }}</label>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'MINIMUM' | translate }}:</label>\n" +
    "            <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._minimum\" min=\"0\" />\n" +
    "            <label><input type=\"checkbox\" ng-model=\"entity._exclusiveMinimum\"> {{ t_prefix+'EXCLUDE_MINIMUM' | translate }}</label>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'MAXIMUM' | translate }}:</label>\n" +
    "            <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._maximum\" min=\"0\" />\n" +
    "            <label><input type=\"checkbox\" ng-model=\"entity._exclusiveMaximum\"> {{ t_prefix+'EXCLUDE_MAXIMUM' | translate }}</label>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'MULTIPLE_OF' | translate }}:</label>\n" +
    "            <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._multipleOf\" min=\"0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'FORMAT' | translate }}:</label>\n" +
    "            <select class=\"form-control sm detail-ip\" ng-model=\"entity._format\">\n" +
    "                    <option value=\"float\">{{ t_prefix+'FLOAT' | translate }}</option>\n" +
    "                    <option value=\"double\">{{ t_prefix+'DOUBLE' | translate }}</option>\n" +
    "                </select>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/object-schema.html',
    "<div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false;objDetSxpanded=true\">\n" +
    "  <span class=\"glyphicon t_color obj-exp\" ng-class=\"objDetSxpanded?'glyphicon-triangle-bottom':'glyphicon-triangle-right'\"\n" +
    "    ng-click=\"objDetSxpanded=!objDetSxpanded\"></span>\n" +
    "  <input class=\"model-title\" type=\"text\" ng-model=\"entity.title\" />\n" +
    "  <!-- <span model-type-selector></span> -->\n" +
    "  <!-- <span class=\"object-prop-count\">{<span>{{entity._properties.length}}</span>}</span> -->\n" +
    "  <div class=\"model-icons\">\n" +
    "    <div class=\"model-info\">\n" +
    "      <span class=\"model-type\"><span ng-class=\"entity.type\" class=\"badge badge-default\">{{t_prefix+entity.type.toUpperCase() | translate}} <span class=\"object-prop-count\">{<span>{{entity._properties.length}}</span>}</span></span></span>\n" +
    "      <span class=\"model-required\"><span class=\"glyphicon glyphicon-asterisk\" ng-click=\"entity.required = !entity.required\" ng-class=\"{disabled:entity.$root$, 'text-danger': entity.required}\" uib-tooltip=\"{{ (entity.$root$)?'':t_prefix+(entity.required?'REQUIRED':'NOT_REQUIRED') | translate }}\" tooltip-append-to-body=\"true\"></span></span>\n" +
    "      <span class=\"model-comment glyphicon glyphicon-comment\" ng-class=\"{'disabled':!entity.description}\" uib-tooltip=\"{{entity.description?entity.description:(t_prefix+'NO_DESCRIPTION' | translate)}}\"\n" +
    "        tooltip-append-to-body=\"true\"></span>\n" +
    "    </div><div class=\"model-actions\"> <!--keep on same line to remove whitespace -->\n" +
    "      <span class=\"obj-add glyphicon glyphicon-plus\" ng-click=\"addNewProp(entity,$data)\"></span>\n" +
    "      <span class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\n" +
    "      <span class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok text-success\"></span></span>\n" +
    "      <span class=\"model-remove\" ng-class=\"{'disabled':entity.$root$}\" ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"model-det-cont clearfix\" ng-show=\"showDetailsPan\">\n" +
    "    <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "      <div class=\"t_color bold\">{{ t_prefix+'BASIC_INFO' | translate }}</div>\n" +
    "      <div class=\"\">\n" +
    "        <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"control-label col-xs-2\">{{ t_prefix+'NAME' | translate }}:</label>\n" +
    "            <div class=\"col-xs-9\">\n" +
    "              <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"{{ t_prefix+'FIELD_NAME' | translate }}\"\n" +
    "                ng-model=\"entity._key\">\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"control-label col-xs-2\">{{ t_prefix+'DESCRIPTION' | translate }}:</label>\n" +
    "            <div class=\"col-xs-9\">\n" +
    "              <textarea class=\"form-control\" ng-model=\"entity.description\"></textarea>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"control-label col-xs-2\">{{ t_prefix+'DEFAULT' | translate }}:</label>\n" +
    "            <div class=\"col-xs-9\">\n" +
    "              <input type=\"text\" class=\"form-control sm detail-ip\" ng-model=\"entity.default\" />\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-xs-6\">\n" +
    "      <form class=\"form-inline model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "        <div class=\"t_color bold\">{{ t_prefix+'VALIDATIONS' | translate }}</div>\n" +
    "        <div ng-if=\"!entity.$root$\">\n" +
    "          <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "            <label><input type=\"checkbox\" ng-model=\"entity.required\"> {{ t_prefix+'REQUIRED_Q' | translate }}</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "          <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "            <label><input type=\"checkbox\" ng-model=\"entity._disallowAdditional\"> {{ t_prefix+'DISALLOW_ADDITIONAL_PROPERTIES' | translate }}</label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"form-group col-xs-12\">\n" +
    "          <label class=\"model-label-x\">{{ t_prefix+'MIN_PROPERTIES' | translate }}:</label>\n" +
    "          <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._minProperties\" min=\"0\" placeholder=\">=0\" />\n" +
    "        </div>\n" +
    "        <div class=\"form-group col-xs-12\">\n" +
    "          <label class=\"model-label-x\">{{ t_prefix+'MAX_PROPERTIES' | translate }}:</label>\n" +
    "          <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._maxProperties\" min=\"0\" placeholder=\">=0\" />\n" +
    "        </div>\n" +
    "      </form>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"indent\" ng-show=\"objDetSxpanded\">\n" +
    "  <div ng-repeat=\"entity in entity._properties\">\n" +
    "    <div ng-include=\"'json-schema-builder/templates/'+entity.type+'-schema.html'\"></div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema-builder/templates/string-schema.html',
    "<div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false\">\n" +
    "  <!-- <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span> -->\n" +
    "  <input class=\"model-title\" type=\"text\" ng-model=\"entity.title\" />\n" +
    "  <!-- <span model-type-selector></span> -->\n" +
    "  <div class=\"model-icons\">\n" +
    "      <div class=\"model-info\">\n" +
    "        <span class=\"model-type\"><span ng-class=\"entity.type\" class=\"badge badge-default\">{{t_prefix+entity.type.toUpperCase() | translate}}</span></span>\n" +
    "        <span class=\"model-required\"><span class=\"glyphicon glyphicon-asterisk\" ng-click=\"entity.required = !entity.required\" ng-class=\"{disabled:entity.$root$, 'text-danger': entity.required}\" uib-tooltip=\"{{ (entity.$root$)?'':t_prefix+(entity.required?'REQUIRED':'NOT_REQUIRED') | translate }}\" tooltip-append-to-body=\"true\"></span></span>\n" +
    "        <span class=\"model-comment glyphicon glyphicon-comment\" ng-class=\"{'disabled':!entity.description}\" uib-tooltip=\"{{entity.description?entity.description:(t_prefix+'NO_DESCRIPTION' | translate)}}\"\n" +
    "          tooltip-append-to-body=\"true\"></span>\n" +
    "      </div><div class=\"model-actions\"><!--keep on same line to remove whitespace -->\n" +
    "        <span class=\"obj-add glyphicon glyphicon-plus disabled\"></span>\n" +
    "        <span class=\"model-detail\" ng-hide=\"showDetailsPan\" ng-click=\"showDetailsPan=true\"><span class=\"glyphicon glyphicon-pencil\"></span></span>\n" +
    "        <span class=\"model-done\" ng-show=\"showDetailsPan\" ng-click=\"showDetailsPan=false\"><span class=\"glyphicon glyphicon-ok text-success\"></span></span>\n" +
    "        <span class=\"model-remove\" ng-click=\"removeEntity(entity)\"><span class=\"glyphicon glyphicon-remove\"></span></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"model-det-cont\" ng-show=\"showDetailsPan\">\n" +
    "      <div class=\"col-xs-6\" style=\"border-right:1px solid #9E9E9E\">\n" +
    "        <div class=\"t_color bold\">{{ t_prefix+'BASIC_INFO' | translate }}</div>\n" +
    "        <div class=\"\">\n" +
    "          <form class=\"form-horizontal form-compact model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "            <div class=\"form-group\" ng-if=\"!entity.$root$\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'NAME' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <input type=\"text\" class=\"form-control sm detail-ip\" id=\"foldName\" placeholder=\"{{ t_prefix+'FIELD_NAME' | translate }}\"\n" +
    "                  ng-model=\"entity._key\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'DESCRIPTION' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <textarea class=\"form-control\" ng-model=\"entity.description\"></textarea>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "              <label class=\"control-label col-xs-2\">{{ t_prefix+'DEFAULT' | translate }}:</label>\n" +
    "              <div class=\"col-xs-9\">\n" +
    "                <input type=\"text\" class=\"form-control sm detail-ip\" ng-model=\"entity.default\" />\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </form>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"col-xs-6\">\n" +
    "        <form class=\"form-inline model-detail-form\" name=\"detailForm\" role=\"form\">\n" +
    "          <div class=\"t_color bold\">{{ t_prefix+'VALIDATIONS' | translate }}</div>\n" +
    "          <div ng-if=\"!entity.$root$\">\n" +
    "            <div class=\"checkbox\" style=\"padding: 2px 0;\">\n" +
    "              <label><input type=\"checkbox\" ng-model=\"entity.required\" /> {{ t_prefix+'REQUIRED_Q' | translate }}</label>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'MIN_LENGTH' | translate }}:</label>\n" +
    "            <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._minLength\" min=\"0\" placeholder=\">=0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'MAX_LENGTH' | translate }}:</label>\n" +
    "            <input type=\"number\" class=\"form-control sm detail-ip\" ng-model=\"entity._maxLength\" min=\"0\" placeholder=\">=0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'PATTERN' | translate }}:</label>\n" +
    "            <input type=\"text\" class=\"form-control sm detail-ip\" ng-model=\"entity._pattern\" min=\"0\" />\n" +
    "          </div>\n" +
    "          <div class=\"form-group col-xs-12\">\n" +
    "            <label class=\"model-label-x\">{{ t_prefix+'FORMAT' | translate }}:</label>\n" +
    "            <select class=\"form-control sm detail-ip\" ng-model=\"entity._format\">\n" +
    "                    <option value=\"byte\">{{ t_prefix+'BYTE' | translate }}</option>\n" +
    "                    <option value=\"binary\">{{ t_prefix+'BINARY' | translate }}</option>\n" +
    "                    <option value=\"date\">{{ t_prefix+'DATE' | translate }}</option>\n" +
    "                    <option value=\"date-time\">{{ t_prefix+'DATE_TIME' | translate }}</option>\n" +
    "                    <option value=\"password\">{{ t_prefix+'PASSWORD' | translate }}password</option>\n" +
    "                </select>\n" +
    "          </div>\n" +
    "        </form>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
