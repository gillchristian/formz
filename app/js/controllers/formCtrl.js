/* global stepOne */
/* global stepThree */
(function(){

'use strict';
	
	angular.module('formApp.controllers', [])
		.controller('FormController', ['$scope', '$modal', '$timeout', '$state', '$http', 'FormData',
			function($scope, $modal, $timeout, $state, $http, FormData){

				// --- view-model connection ---
				var vm = this;
				// --- date handlers ---
				
				vm.value = true;

				// --- fetch states & cities data ---
				FormData.states.then(function(data){
					vm.states = data;
				});
				FormData.cities.then(function(data){
					vm.cities = data;
				});


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
					return FormData.gmapsSearch(val)
						.then(function(response){
							return response.data.results.map(function(item){
							return item.formatted_address;
							});
						}, function(error){
							vm.newAlert({type: 'alert', msg: 'An error ocurred. No city found!'});
						});
				};

				// show-hide go to first step button
				vm.show = function(){
					return !$state.is('form.stepone') && !$state.is('form.steptwo') && !$state.is
					('form.stepthree');
				}

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