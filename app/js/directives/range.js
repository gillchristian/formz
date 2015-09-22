(function()  {
    "use strict";
    angular.module("formApp.directives", []).directive("range", function() {
        return {
            require: "ngModel",
            restrict: "A",
            link: function(scope, elm, attrs, ctrl) {
                
                ctrl.$validators.range = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) return true;
                    var values = attrs.range.split('-');
                    console.log(values);
                    var min = parseInt(values[0]) < parseInt(viewValue);
                    var max = parseInt(values[1]) > parseInt(viewValue);
                    return min && max ? true : false;
                };
            }
        };
    });
})( );