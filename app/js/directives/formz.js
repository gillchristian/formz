
(function(){
'use strict';
angular.module('formz.tpls', ["formz/templates/textField.html"]);


angular.module('formz', ['formz.tpls'])
	.directive('textField', [ '$compile',
		function($compile){
			return {
				restrict: 'E',
				require: '^form',
				scope: {
					model: '=fModel',
					label: '@fLabel',
					name: '@fName',
					req: '=fRequired',
					dis: '=fDisable',
					pattern: '@fPattern',
					type: '@fType',
					leftAddon: '@fLeftAddon',
					rightAddon: '@fRightAddon'		
				},
				replace: false,
				templateUrl: 'app/views/templates/formFields/textField.html',
/*				templateUrl: function(elem, attrs){
					return attrs.templateUrl || 'formz/templates/textField.html';
				},*/
				link: function(scope, elem, attrs, ctrl){
					console.log(scope.label, attrs.fRequired === undefined);
					// reference the actual form
					scope.form = ctrl;
					// define the input type
					scope.type = scope.type || 'text';
					// make fields not required by default
					scope.isReq = scope.req !== undefined ? (scope.req === 0 ? true : scope.req) : false;
					console.log(scope.isReq);
					// make fields not required by default
					scope.isDis = scope.dis !== undefined ? (scope.dis === 0 ? true : scope.dis) : false;
					// add addons
					scope.addLeftAddon = scope.leftAddon ? true : false;
					scope.addRightAddon = scope.rightAddon ? true : false;				
					// add ng-pattern to the input
					if(scope.pattern) {
						var input = elem.find('input').attr('ng-pattern', new RegExp(scope.pattern));
						$compile( input )(scope);
					}
				}
			}
	}]);
	
	angular.module("formz/templates/textField.html", []).run(["$templateCache", function($templateCache) {
		$templateCache.put("formz/templates/textField.html",
			"<div ng-class=\"{'has-error': form.{{name}}.$touched &amp;&amp; form.{{name}}.$invalid}\" class='form-group'>\n" +
			"  <label class='control-label'>{{label}}</label>\n" +
			"  <input ng-model='model' type='{{type}}' name='{{name}}' ng-required='isReq' ng-disabled='isDis' ng-if='!addLeftAddon && !addRightAddon' class='form-control'/>\n" +
			"  <div ng-if='addLeftAddon || addRightAddon' class='input-group'>\n" +
			"    <div ng-if='addLeftAddon' class='input-group-addon'>{{leftAddon}}</div>\n" +
			"    <input ng-model='model' type='{{type}}' name='{{name}}' ng-required='isReq' ng-disabled='isDis' class='form-control'/>\n" +
			"    <div ng-if='addRightAddon' class='input-group-addon'>{{rightAddon}}</div>\n" +
			"  </div>\n" +
			"</div>\n" +
			"");
		}]);
})();


var requiredDirective = function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, elm, attr, ctrl) {
      if (!ctrl) return;
      attr.required = true; // force truthy in case we are on non input element

      ctrl.$validators.required = function(modelValue, viewValue) {
        return !attr.required || !ctrl.$isEmpty(viewValue);
      };

      attr.$observe('required', function() {
        ctrl.$validate();
      });
    }
  };
};