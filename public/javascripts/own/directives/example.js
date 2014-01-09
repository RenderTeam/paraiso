var ejemplo = angular.module( 'Validation', [] );
ejemplo.directive('ngValidation' , function(){
  return{
    restrict: 'A',
    template: '<div class="label label-danger pull-right"><small>{{field}}</small></div>',
    require: '^?form',
    scope:{field:'='},
    controller: ['$scope', function( $scope ) {
      $scope.funcion = function(Datos){
        console.log(Datos);
      };
    }],
    link: function (scope, iElement, iAttrs, ctrl){
      scope.funcion(iAttrs.field);
      scope.$watch('field',function(data){
        console.log(data);
        console.log("Data");
        console.log(iAttrs);
        console.log("iAttrs");
        console.log(iElement);
        console.log("iElement");
        console.log(ctrl);
        console.log("ctrl");
        
        console.log(hola);
      });
    }
  }
});