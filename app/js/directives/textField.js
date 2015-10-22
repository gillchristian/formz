
(function(){
'use strict';
angular.module('formApp.directives')
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
					pattern: '@fPattern',
					type: '@fType',
					leftAddon: '@fLeftAddon',
					rightAddon: '@fRightAddon'		
				},
				replace: true,
				templateUrl: 'app/views/templates/formFields/textField.html',
				link: function(scope, elem, attrs, ctrl){
					// reference the actual form
					scope.form = ctrl;
					// define the input type
					scope.type = scope.type || 'text';
					// make fields not required by default
					scope.isReq = scope.req !== undefined ? (scope.req === 0 ? true : scope.req) : false;
					
					console.log(scope.label ,scope.isReq);
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
})();