(function(){
	'use strict';

	angular.module('formApp', ['ngMessages', 'ui.bootstrap', 'ui.router', 'ui.router.tabs', 'formApp.controllers', 'formApp.directives', 'formApp.services'] )

	.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        
        $urlRouterProvider.otherwise('/'), 

        $stateProvider
        .state('form', {
            url: '/',
            templateUrl: 'app/views/home.html',
            controller: 'FormController',
            controllerAs: 'vm'
        })
        .state('form.stepone', {
            url: 'stepone',
            templateUrl: 'app/views/step1.html'
        })
        .state('form.steptwo', {
            url: 'steptwo',
            templateUrl: 'app/views/step2.html'
        })
        .state('form.stepthree', {
            url: 'stepthree',
            templateUrl: 'app/views/step3.html'
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