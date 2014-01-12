var validation = angular.module( 'Validations', [] );
validation.directive(
  'rdValidation',
  function() {
    function link( $scope, $element, $attributes, controllers ) {
      var uniqueName       = $attributes.ngModel.replace('.',''),
          valOfView        = $attributes.vtext,
          validationType   = $attributes.validationtype,
          flag             = false;
      function verified( value ){
        if (validationstypes(validationType, value)){
          controllers.$setValidity('required', true);
          $('#rdView'+ uniqueName +'').fadeOut();
        }else{
          $('#rdView'+ uniqueName +'').fadeIn();
          controllers.$setValidity('required', false);
        }
      }
      function init(){
        if( !isEmpty( uniqueName ) ){
          if( !isEmpty( valOfView ) ){
            flag = true;
          }
        }
        if( !flag ){
          $element.after('<h1 class=\'label label-danger \'>Please insert ng-Model and vText atributes.</h1>');
          controllers.$setValidity('valid', false);
        }else{
          $element.after('<div id=\'rdView'+ uniqueName 
          +'\' class=\'label label-danger pull-right\' hidden>'+ valOfView 
          +'</h1>');
          $('#rdView'+ uniqueName +'').hide();
        }
      }
      controllers.$parsers.push( verified );
      controllers.$formatters.push( init );
    }
    function isEmpty(value) {
      return value === '' || value === undefined || value === null ||
        value === false || value !== value;
    }
    function validationstypes( forvalidate, val ){
      if(isEmpty(val)){
        return false;
      }else{
        switch(forvalidate){
          case 'text':
            var pattern = /^[a-zA-Z]*$/;
            if(val.match(pattern)){
              return true;
            }else{
              return false;
            }
          break;
        }
      }
    }
    return({
      link   : link,
      require : 'ngModel',
      restrict: 'AE'
    });
  }
);