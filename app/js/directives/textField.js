
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
					scope.isReq = scope.req || false ;
					console.log('fRequired' in attrs);
					console.log('recibido' ,scope.req);
					console.log('recibido || false', scope.isReq);
					console.log('----------------------------------');
					// add addons
					scope.addLeftAddon = scope.leftAddon ? true : false;
					scope.addRightAddon = scope.rightAddon ? true : false;				
					// add ng-pattern to the input
						var input = elem.find('input').attr('ng-pattern', new RegExp(scope.pattern));
					if(scope.pattern) {
						$compile( input )(scope);
					}
				}
			}
	}]);
})();