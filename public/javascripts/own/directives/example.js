var ejemplo = angular.module( 'Validation', [] );
ejemplo.directive('ngValidation' , function(){
  return{
    restrict: 'A',
    
    require: 'ngModel',
    scope:{field:'@'},
    /*controller: ['$scope', function( $scope ) {
      $scope.funcion = function(Datos){
        
        console.log(Datos);
      };
    }],*/
    link: function (scope, iElement, iAttrs, ctrl){
      /*scope.$watch('field',function(data){
        /*scope.funcion(iAttrs.field);
        console.log(data);
        console.log("Data");
        console.log(iAttrs);
        console.log("iAttrs");
        console.log(iElement);
        console.log("iElement");*/
        var regex = /^\d$/;
        var validator = function(value){
        //var floatValue = parseFloat(value);
          ctrl.$setValidity('validNumber', regex.test(value));
          console.log(scope.form.$setPristine());
          return value;
        };
        ctrl.$parsers.unshift(validator);
        ctrl.$formatters.unshift(validator);
      }
        /*console.log(ctrl['$valid']);
        if ( scope.Validate )
        ctrl['$valid'] = false;
        console.log(ctrl['$valid']);


      });*/
    
  }
});