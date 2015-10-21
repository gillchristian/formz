(function(){
'use strict';
angular.module('formApp.services', [])
	.factory('FormData',[ '$q', '$http',
		function($q, $http){
			var states = $q.defer();
			var cities = $q.defer();
			
			states.resolve(['State A','State B','State C','State D','State E']);
			cities.resolve(['Buenos Aires','Bogotá','Bragado','Saint Louis','Santa Fe','San Fernando','San Luis','San Pedro','Santo Tomé','Santa Catalina','Saint Angels','Paso de los Libres','Paraná','Posadas']);
			return {
				states: states.promise,
				cities: cities.promise,
				gmapsSearch: function(address){
					return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
						params: {
						address: address,
						sensor: false
						}
					});
				}
			}
						
	}]);
})()