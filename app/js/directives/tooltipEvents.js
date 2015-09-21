(function(){
	'use strict';

	angular.module('formApp.directives')
		.directive('triggerTooltip', function () {
		    return {
		        restrict: "A",
		        scope: {
		        	triggerTooltip: '='
		        },
		        link: function (scope, elm, attrs, ctrl) {

		            elm.find('input').on('blur', function () {
			        	if (scope.triggerTooltip){
			                elm.find('input').triggerHandler('tooltipActivate');
			        	}
		            });
		        }
		    };
	});
})();