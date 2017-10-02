angular.module('json-schema').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('json-schema/templates/Array-schema.html',
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


  $templateCache.put('json-schema/templates/Boolean-schema.html',
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


  $templateCache.put('json-schema/templates/Integer-schema.html',
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


  $templateCache.put('json-schema/templates/Null-schema.html',
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


  $templateCache.put('json-schema/templates/Number-schema.html',
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


  $templateCache.put('json-schema/templates/Object-schema.html',
    "<div style=\"margin-left:20px;position:relative;\">\n" +
    "  <div class=\"js-row\" ng-class=\"showDetailsPan?'t_bg':''\" ng-init=\"showDetailsPan=false;objDetSxpanded=true\">\n" +
    "      <button class=\"btn btn-link btn-href glyphicon glyphicon-plus obj-add\" ng-click=\"addNewProp(entity,$data)\"></button>\n" +
    "      <span class=\"glyphicon t_color obj-exp\" ng-class=\"objDetSxpanded?'glyphicon-triangle-bottom':'glyphicon-triangle-right'\" ng-click=\"objDetSxpanded=!objDetSxpanded\"></span>\n" +
    "      <span ng-hide=\"entity.$root$\"><input class=\"model-key\" type=\"text\" ng-model=\"entity._key\" />:</span> <span model-type-selector></span>\n" +
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
    "              <div ng-include=\"''+entity._type+'-schema.html'\"></div>\n" +
    "          </div>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>"
  );


  $templateCache.put('json-schema/templates/String-schema.html',
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


  $templateCache.put('json-schema/templates/jsonSchema.html',
    "<div>\n" +
    "    <uib-tabset active=\"active\">\n" +
    "        <uib-tab index=\"0\" heading=\"Designer\">\n" +
    "\n" +
    "            <div >\n" +
    "                <div class=\"main\" style=\"background: #fff;padding:20px\">\n" +
    "                    <div ng-include=\"''+$data._type+'-schema.html'\"></div>\n" +
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


  $templateCache.put('json-schema/templates/model-selector-schema.html',
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


  $templateCache.put('json-schema/templates/modelTypeSelector.html',
    "<span uib-dropdown on-toggle=\"modelSelectorOpened(open,entity)\">\n" +
    "  <button type=\"button\" uib-dropdown-toggle class=\"btn btn-link btn-href model-selector\" ng-class=\"entity._type\">{{entity._type}}<span class=\"caret\"></span></button>\n" +
    "  <div class=\"dropdown-menu model-type-selector\" uib-dropdown-menu>\n" +
    "      <div ng-include=\"'model-selector-schema.html'\"></div>\n" +
    "  </div>\n" +
    "</span>"
  );

}]);
