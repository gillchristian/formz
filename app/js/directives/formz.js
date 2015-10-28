
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
					placeholder: '@fPlaceholder',
					req: '=fRequired',
					dis: '=fDisabled',
					pattern: '@fPattern',
					type: '@fType',
					//leftAddon: '@fLeftAddon',
					//rightAddon: '@fRightAddon'		
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
					scope.isReq = attrs.fRequired !== undefined ? (attrs.fRequired !== '' ? attrs.fRequired : true) : false;
					
					scope.$watch(function(){
						return scope.req;
					}, function(newVal, oldVal){
						newVal !== oldVal ? scope.isReq = newVal : '';
					});

					// make fields not disabled by default
					scope.isDis = attrs.fDisabled !== undefined ? (attrs.fDisabled !== '' ? attrs.fDisabled : true) : false;
										
					scope.$watch(function(){
						return scope.dis;
					}, function(newVal, oldVal){
						newVal !== oldVal ? scope.isDis = newVal : '';
					});
					// add addons
					//scope.addLeftAddon = scope.leftAddon ? true : false;
					//scope.addRightAddon = scope.rightAddon ? true : false
				}
			}
	}]);
	
	angular.module("formz/templates/textField.html", []).run(["$templateCache", function($templateCache) {
		$templateCache.put("formz/templates/textField.html",
			"<div ng-class=\"{'has-error': form.{{::name}}.$touched && form.{{::name}}.$invalid }\" class='form-group'>\n" +
			"  <label class='control-label'>{{::label}}</label>\n" +
			"  <input ng-model='model' type='{{::type}}' name='{{::name}}' ng-required='isReq' ng-disabled='isDis' placeholder='{{::placeholder}}' class='form-control'/>\n" +
/*			"  <input ng-model='model' type='{{::type}}' name='{{::name}}' ng-required='isReq' ng-disabled='isDis' ng-show='!addLeftAddon && !addRightAddon' placeholder='{{::placeholder}}' class='form-control'/>\n" +
			"  <div ng-show='addLeftAddon || addRightAddon' class='input-group'>\n" +
			"    <div ng-show='addLeftAddon' class='input-group-addon'>{{leftAddon}}</div>\n" +
			"    <input ng-model='model' type='{{type}}' name='{{name}}' ng-required='isReq' ng-disabled='isDis' class='form-control'/>\n" +
			"    <div ng-show='addRightAddon' class='input-group-addon'>{{rightAddon}}</div>\n" +
			"  </div>\n" +
*/
			"</div>\n" +
			"");
		}]);
})();