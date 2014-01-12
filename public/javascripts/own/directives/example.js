var validation = angular.module( 'Validation', [] );
validation.directive( 'rdValidation' , function() {
    return {
      require: 'ngModel',
      link: function($scope, $element, $attrs, ngModelController) {
        var val = $attrs.vtext;
        if(isEmpty(val)){
          val = 'Error';
        }
        ngModelController.$formatters.push(function(value) {
          ngModelController.$setValidity('required', true);
          return value;
        });
        $element.after('<div id=\'rdView'+$attrs.ngModel.replace('.','')+'\' class=\'label label-danger pull-right\' hidden>'+val+'</h1>');
        $('#rdView'+$attrs.ngModel.replace('.','')+'').hide();
        ngModelController.$parsers.push(function(value) {
          if (validationstypes($attrs.validationtype, value)){
            ngModelController.$setValidity('required', true);
            $('#rdView'+$attrs.ngModel.replace('.','')+'').fadeOut();
          }else{
            $('#rdView'+$attrs.ngModel.replace('.','')+'').fadeIn();
          }
          console.log('Despues', true);
          return true ? value : undefined;
        });
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
      }
    };
  });