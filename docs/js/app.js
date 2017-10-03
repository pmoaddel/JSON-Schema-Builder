'use strict'

angular.module('json-schema-editor', ['ui.bootstrap', 'json-schema-builder']);

angular.module('json-schema-editor')
  .controller('schemaCtrler', schemaCtrler); 

schemaCtrler.$inject = ['$scope'];
function schemaCtrler($scope) {
  $scope.data = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "type": "array",
    "properties": {},
    "items": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "Account",
      "type": "object",
      "description": "A Salesforce Account",
      "required": [
        "Id"
      ],
      "properties": {
        "Id": {
          "type": "string",
          "description": "ID of the Account"
        },
        "Name": {
          "type": "string",
          "description": "Name of the Account"
        },
        "AccountNumber": {
          "type": "string",
          "description": "The Account Number"
        },
        "Phone": {
          "type": "string",
          "description": "The Phone Number associated with the Account"
        },
        "BillingStreet": {
          "type": "string",
          "description": "The billing street address"
        },
        "BillingCity": {
          "type": "string",
          "description": "The billing city"
        },
        "BillingState": {
          "type": "string",
          "description": "The billing state"
        },
        "BillingPostalCode": {
          "type": "string",
          "description": "The billing postal code"
        },
        "BillingCountry": {
          "type": "string",
          "description": "The billing country"
        },
        "ShippingStreet": {
          "type": "string",
          "description": "The shipping street address"
        },
        "ShippingCity": {
          "type": "string",
          "description": "The shipping city"
        },
        "ShippingState": {
          "type": "string",
          "description": "The shipping state"
        },
        "ShippingPostalCode": {
          "type": "string",
          "description": "The shipping postal code"
        },
        "ShippingCountry": {
          "type": "string",
          "description": "The shipping country"
        }
      }
    }
  }
}
