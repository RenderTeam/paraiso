var ejemplo = angular.module( 'Validation', [] );
ejemplo.directive('ngValidation' , function(){
  return{
    restrict: 'A',
    require: 'ngModel',
    scope:{validationtype:'@'},
    /*controller: ['$scope', function( $scope ) {
      $scope.funcion = function(Datos){
        
        console.log(Datos);
      };
    }],*/
    link: function (scope, iElement, iAttrs, ctrl){
            if( ctrl ){
              ctrl.$parsers = [];
              ctrl.$formatters = [];
              var regex = /^\d$/;
              var val = iAttrs.valuefield;
              if(isEmpty(val)){
                val = 'Error';
              }
              var validateField = function ( value ){
                console.log("Validating as email", value);
                if (isEmpty(value)) {
                  iElement.after('<div id=hola class=\'label label-danger pull-right\''+ 
                '><small>'+ val +'</small></div>');
                  ctrl.$setValidity('required', false);
                } else {
                  iElement.remove(":contains('hola')");
                  console.log(iElement.children('div').remove());
                  ctrl.$setValidity('required', true);
                }
              };
              /*console.log(ctrl['viewValue'].$isEmpty());
              if( !viewValue.length > 0 ){
                viewValue = 'Error';
              }*/
              
              /*var validator = function(value){
              //var floatValue = parseFloat(value);
                ctrl.$setValidity('validNumber', regex.test(value));
                //console.log(scope.form.$setPristine());
                return value;
              };*/
              function isEmpty(value) {
                return value === '' || value === undefined || value === null ||
                  value === false || value !== value;
              }
              ctrl.$parsers.unshift(validateField);
              ctrl.$formatters.unshift(validateField);
            }
    }
  }
});