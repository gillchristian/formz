
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
					dis: '=fDisabledd',
					pattern: '@fPattern',
					type: '@fType',
					//leftAddon: '@fLeftAddon',
					//rightAddon: '@fRightAddon'		
				},
				templateUrl: function(elem, attrs){
					return attrs.templateUrl || 'formz/templates/textField.html';
				},
				link: function postLink(scope, elem, attrs, ctrl){
					// reference the actual form
					scope.form = ctrl;
					// add ng-pattern to the input
					if(scope.pattern) {
						var input = elem.find('input').attr('ng-pattern', new RegExp(scope.pattern));
						$compile( input )(scope);
					}
				},
				controller: function($scope, $element, $attrs){
					// define the input type
					$scope.type = $scope.type || 'text';
					// make fields not required by default				
					$scope.isReq = $attrs.fRequired !== undefined ? ($attrs.fRequired !== '' ? $attrs.fRequired : true) : false;
					// make fields not disabled by default
					$scope.isDis = $attrs.fDisabled !== undefined ? ($attrs.fDisabled !== '' ? $attrs.fDisabled : true) : false;
					// add addons
					//scope.addLeftAddon = scope.leftAddon ? true : false;
					//scope.addRightAddon = scope.rightAddon ? true : false;				
				}
			}
	}]);
	
	angular.module("formz/templates/textField.html", []).run(["$templateCache", function($templateCache) {
		$templateCache.put("formz/templates/textField.html",
			"<div ng-class=\"{'has-error': form.{{name}}.$touched && form.{{name}}.$invalid }\" class='form-group'>\n" +
			"  <label class='control-label'>{{label}}</label>\n" +
			"  <input ng-model='model' type='{{type}}' name='{{name}}' ng-required='isReq' ng-disabled='isDis' ng-show='!addLeftAddon && !addRightAddon' class='form-control'/>\n" +
/*			"  <div ng-show='addLeftAddon || addRightAddon' class='input-group'>\n" +
			"    <div ng-show='addLeftAddon' class='input-group-addon'>{{leftAddon}}</div>\n" +
			"    <input ng-model='model' type='{{type}}' name='{{name}}' ng-required='isReq' ng-disabled='isDis' class='form-control'/>\n" +
			"    <div ng-show='addRightAddon' class='input-group-addon'>{{rightAddon}}</div>\n" +
			"  </div>\n" +
*/
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