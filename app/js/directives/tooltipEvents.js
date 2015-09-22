(function(){
	'use strict';

	angular.module('formApp.directives')
		.directive('triggerTooltip', function () {
		    return {
		        restrict: "A",
		        scope: {
		        	check: '&triggerTooltip'
		        },
		        link: function (scope, element, attrs, ctrl) {

        			//console.log(angular.element(element[0]));

		        	angular.element(element[0]).on('blur', function(e){
		        		if(scope.check) {
	        				element[0].dispatchEvent(new Event('tooltipActivate'));
		        		}
		        	});


		        	element.find('input').on('tooltipActivate', function(e){
	        			console.log('triggered');
		        	});
		        }
		    };
	});
})();
