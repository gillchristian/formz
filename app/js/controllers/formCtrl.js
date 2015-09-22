(function(){

'use strict';
	
	angular.module('formApp.controllers', [])
		.controller('FormController', [ '$modal', '$timeout', '$state', '$http',
			function($modal, $timeout, $state, $http){

				// --- view-model connection ---
				var vm = this;

				// // just so I dont have to fill the form all the time
				// vm.form = {
				// 	name: 'some',
				// 	lastName: 'other',
				// 	userName: 'the_form',
				// 	pass: 'aA@11das'
				// };

			    vm.tabData   = [
			      {
			        heading: 'Step One',
			        route:   'form.stepone'
			      },
			      {
			        heading: 'Step Two',
			        route:   'form.steptwo'
			      },
			      {
			        heading: 'Step Three',
			        route:   'form.stepthree'
			      }
			    ];

				// --- date handlers ---

				// --- states ---
				vm.states = [
						'State A',
						'State B',
						'State C',
						'State D',
						'State E'
				];

				// --- states ---
				vm.cities = ['Buenos Aires','Bogotá','Bragado','Saint Louis','Santa Fe','San Fernando','San Luis','San Pedro','Santo Tomé','Santa Catalina','Saint Angels','Paso de los Libres','Paraná','Posadas'];

				// --- modal open function ---
				vm.openModal = function(){
					var modalInstance = $modal.open({
						animation: true,
						templateUrl: 'termsAndConditions.html',
						controller: 'ModalController',
						controllerAs: 'vm',
						resolve: {
							states: function(){
								return vm.states;
							}
						}
					});

					modalInstance.result
						.then(function(){
							// --- modal acepted
							vm.form.terms = 'yes';
						},
						function(){
							// --- modal dismissed
							vm.form.terms = 'cancel';
						});
				};


				// --- alerts handling ---
				vm.activeAlerts = [];

				vm.alerts = {
					name : {
						type: 'danger',
						msg: 'Oh snap! Change a few things up and try submitting again.'
					},
					mail : {
						type: 'warning',
						msg: 'Oh snap! Change a few things up and try submitting again.'
					},
					pass: {
						type: 'warning',
						msg: 'Make sure your password is longer than 5 characters and has a number, a symbol (!@#$%^&\') and a upercase leter'
					}
				};

				vm.dismissAlert = function(index) {
					vm.activeAlerts.splice(index, 1);
				};

				vm.newAlert = function(alert) {
					vm.activeAlerts.push(alert);
				};

				//vm.newAlert(vm.alerts.name);

				// --- checkboxes ---
				vm.checkboxes = [
						{
							value: false,
							label: 'Value 1'
						},
						{
							value: false,
							label: 'Value 2'
						},
						{
							value: false,
							label: 'Value 3'
						}
				];

				// --- radios ---
				vm.radios = [
					{
						value: 'M',
						label: 'man'
					},
					{
						value: 'F',
						label: 'woman'
					}
				];


				  // Any function returning a promise object can be used to load values asynchronously
				  vm.getLocation = function(val) {
				    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
				      params: {
				        address: val,
				        sensor: false
				      }
				    }).then(function(response){
				      return response.data.results.map(function(item){
				        return item.formatted_address;
				      });
				    });
				  };

			}])

		// --- modal controller
		.controller('ModalController', ['$modalInstance', 'states',
			function($modalInstance, states){
				var vm = this;

				vm.states = states;

				vm.ok = function() {
					$modalInstance.close(true);
				};
				vm.cancel = function(){
					$modalInstance.dismiss();
				};

			}]);
})();