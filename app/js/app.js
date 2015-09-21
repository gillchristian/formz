(function(){
	'use strict';

	angular.module('formApp', ['ngMessages', 'ui.bootstrap', 'ui.router', 'formApp.controllers', 'formApp.directives'] )

	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        
        $urlRouterProvider.otherwise('/'), 

        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/views/home.html',
            controller: 'FormController',
            controllerAs: 'vm'
        });
	
		$locationProvider.html5Mode(true);
    })


	.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = !0, delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])

    .config(['$tooltipProvider', function($tooltipProvider){
      $tooltipProvider.setTriggers({'tooltipActivate': 'focus'});
    }]);

})();