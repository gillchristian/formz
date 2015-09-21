(function(){
	'use strict';

	angular.module('formApp.directives')
		.directive('triggerTooltip', function () {
		    return {
		        restrict: "A",
		        scope: {
		        	triggerTooltip: '='
		        },
		        link: function (scope, element, attrs, ctrl) {

        			//console.log(angular.element(element[0]));

		        	angular.element(element[0]).on('blur', function(e){
		        		console.log('true?',scope.triggerTooltip);
		        		if(scope.triggerTooltip) {
	        				element[0].dispatchEvent(new Event('customEvent'));
		        		}
		        	});


		        	element.find('input').on('tooltipActivate', function(e){
	        			console.log('triggered');
		        	});
/*
		            element.find('input').on('blur', function () {
			        	if (scope.triggerTooltip){
			                element.find('input').triggerHandler('tooltipActivate');
			        	}
		            });
		            */
		            /*scope.$on('blur', function(){
		            	if(scope.triggerTooltip){
		            		scope.$emit('tooltipActivate');
		            	}
		            });

		            scope.$on('tooltipActivate', function(){
		            	console.log('triggered');
		            });*/
		        }
		    };
	});
})();
