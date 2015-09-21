(function(){

'use strict';
	
	angular.module('formApp.controllers', [])
		.controller('FormController', [ '$modal', '$timeout',
			function($modal, $timeout){

				// --- view-model connection ---
				var vm = this;


				// --- date handlers ---

				// --- states ---
				vm.states = [
						'State A',
						'State B',
						'State C',
						'State D',
						'State E'
				];

				// --- focus / blur 'callbacks' ---
				vm.focus = [];
				vm.onBlur = function(field){
					vm.focus[field] = false;
				};

				vm.onFocus = function(field){
					vm.focus[field] = true;
				};

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
					}
				};

				vm.dismissAlert = function(index) {
					vm.activeAlerts.splice(index, 1);
				};

				vm.newAlert = function(alert) {
					vm.activeAlerts.push(alert);
				};

				vm.newAlert(vm.alerts.name);

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