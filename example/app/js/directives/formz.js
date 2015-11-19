
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
					req: '=fRequired',
					dis: '=fDisabled',
					label: '@fLabel',
					name: '@fName',
					placeholder: '@fPlaceholder',
					pattern: '@fPattern',
					type: '@fType',
				},
				templateUrl: function(tElem, tAttrs){
					return tAttrs.templateUrl || 'formz/templates/textField.html';
				},
				link: function postLink(scope, elem, attrs, ctrl){
					// reference the actual form
					scope.form = ctrl;
					// input type
					scope.type = scope.type || 'text';
					// placeholder
					scope.placeholder = scope.placeholder || '';
					
					// add ng-pattern to the input
					if(scope.pattern) {
						var input = elem.find('input').attr('ng-pattern', new RegExp(scope.pattern));
						$compile( input )(scope);
					}
					// make fields not required by default
					scope.isReq = scope.req !== undefined ? (scope.req === 0 ? true : scope.req) : false;
					// require fields
					scope.$watch(function(){
						return scope.req;
					}, function(value){
						scope.isReq = value;
					});
					// make fields not disabled by default
					scope.isDis = scope.dis !== undefined ? (scope.dis === 0 ? true : scope.dis) : false;
					// disable fields
					scope.$watch(function(){
						return scope.dis;
					}, function(value){
						scope.isDis = value;
					});
				}
			}
	}]);
	
	angular.module("formz/templates/textField.html", []).run(["$templateCache", function($templateCache) {
		$templateCache.put("formz/templates/textField.html",
			"<div ng-class=\"{'has-error': form.{{::name}}.$touched && form.{{::name}}.$invalid }\" class='form-group'>\n" +
			"  <label class='control-label' for='{{::name}}'>{{::label}}</label>\n" +
			"  <input ng-model='model' type='{{::type}}' name='{{::name}}' ng-required='isReq' ng-disabled='isDis' placeholder='{{::placeholder}}' class='form-control'/>\n" +
			"</div>\n" +
			"");
		}]);
})();