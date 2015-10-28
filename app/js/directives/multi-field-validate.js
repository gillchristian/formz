(function () {
	'use strict';
	angular.module("formApp.directives")
		.directive("multiFields", function () {
			return {
				priority: -1000
				restrict: "E",
				link: function (scope, elm, attrs, ngModel){
					// Update viewDate, whenever there was a change to $viewValue.
					ngModel.$render = function () {
						angular.extend(scope.$eval(attrs.multiFields), ngModel.$viewValue);
					}
					// Ensure we capture changes to viewDate and translate them
					// into changes to $viewValue.
					scope.$watch(attrs.multiFields, function(viewValue){
						ngModel.$setViewValue(viewValue);
					}, true);

					// Transform $modelValue into $viewValue on each change.
					ngModel.$formatters.push(function(modelValue){
						if (!modelValue) return;
						var parts = String(modelValue)
					});


				}
			}
		});


})();


angular.module('dateApp', []).
  directive('dateTypeMulti', function () {
    return {
      priority: -1000,
      require: '?ngModel',
      link: function (scope, elem, attrs, ngModel) {
        ngModel.$render = function () {
          angular.extend(scope.$eval(attrs.dateTypeMulti), ngModel.$viewValue);
        };

        scope.$watch(attrs.dateTypeMulti, function (viewValue) {
          ngModel.$setViewValue(viewValue);
        }, true);

        ngModel.$formatters.push(function (modelValue) {
          if (!modelValue) return;

          var parts = String(modelValue).split('/');

          return {
            year: parts[0],
            month: parts[1],
            day: parts[2]
          };
        });

        ngModel.$parsers.unshift(function (viewValue) {
          var isValid = true,
              modelValue = '',
              date;

          if (viewValue) {
            date = new Date(viewValue.year, viewValue.month - 1, viewValue.day);
            modelValue = [viewValue.year, viewValue.month, viewValue.day].join('/');

            if ('//' === modelValue) {
              modelValue = '';
            } else if (
                date.getFullYear() != viewValue.year ||
                date.getMonth() != viewValue.month - 1 ||
                date.getDate() != viewValue.day) {
              isValid = false;
            }
          }

          ngModel.$setValidity('dateTypeMulti', isValid);

          return isValid ? modelValue : undefined;
        });
      }
    };
  });



	doctype html
	html(ng-app="dateApp")
	  body
	    .container
	      .well
	        form(role="form", name="dateForm" novalidation).form-inline
	          .form-group
	            input(type="hidden", ng-model="modelDate", date-type-multi="viewDate", ng-init="viewDate = {}").form-control
	          .form-group
	            label view value
	            select(ng-model="viewDate.day").form-control
	              option(value="") select day
	              - for (day = 1; day <= 31; day += 1)
	                option(value=day)= day
	            select(ng-model="viewDate.month").form-control
	              option(value="") select month
	              - for (month = 1; month <= 12; month += 1)
	                option(value=month)= month
	            select(ng-model="viewDate.year").form-control
	              option(value="") select year
	              - for (year = 1981; year <= 1992; year += 1)
	                option(value=year)= year
	      .well
	        p: code $modelValue: {{ modelDate }}
	        p: code form.$valid: {{ dateForm.$valid }}
	        p: code form.$error.dateTypeMulti {{ dateForm.$error.dateTypeMulti }}
	      p More info on
	          a(href='http://float-middle.com/multiple-fields-validation-in-angularjs/') float-middle.com
