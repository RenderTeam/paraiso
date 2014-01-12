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
        if ( validationstypes( validationType, value ) ){
          controllers.$setValidity('required', true );
          $('#rdView'+ uniqueName +'').fadeOut();
        }else{
          $('#rdView'+ uniqueName +'').fadeIn();
          controllers.$setValidity('required', false );
        }
        return $scope = value;
      }
      function init(){
        if( !isEmpty( uniqueName ) ){
          if( !isEmpty( valOfView ) ){
            flag = true;
          }
        }
        if( !flag ){
          console.log($element.children().eq(0));
          console.log($element.children().eq(1));
          console.log($element.parent());
          $element.parent().after('<div class=\'label label-danger \'><small>Please insert ng-Model and vText atributes.</small></div>');
          controllers.$setValidity('valid', false);
        }else{
          $element.parent().after('<div id=\'rdView'+ uniqueName 
          +'\' class=\'label label-danger pull-right\' hidden><small>'+ valOfView 
          +'</small></div>');
          $('#rdView'+ uniqueName +'').hide();
          controllers.$setValidity('valid', true);
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
      restrict: 'AE',
    });
  }
);