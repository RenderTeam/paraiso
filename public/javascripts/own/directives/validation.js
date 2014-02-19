var validation = angular.module( 'Validations', [] );
validation.directive( 'rdValidation', rdValidation );
function rdValidation() {
  link.$inject = [ '$scope', '$element', '$attributes', 'controllers' ];
  function link( scope, element, attributes, controllers ) {

    var uniqueName       = attributes.ngModel.replace('.',''),
        valOfView        = attributes.vtext,
        validationType   = attributes.validationtype,
        flag             = false,
        ran = 0,
        idstr='ValId';
    do {                
          var ascicode=Math.floor((Math.random()*42)+48);
          if (ascicode<58 || ascicode>64){
              idstr+=String.fromCharCode(ascicode);    
          }                
      } while (idstr.length<17);
    ran = idstr;
    if( !isEmpty( uniqueName ) ){
      if( !isEmpty( valOfView ) ){
        flag = true;
      }
    }
    if( !flag ){
      element.parent().after('<div class=\'label label-danger pull-right \'><small>'+
        'Please insert ng-Model and vText atributes.</small></div>');
      controllers.$setValidity('valid', false);
    }else{
      element.removeClass('has-error');
      element.parent().after('<div id=\'rdView'+ uniqueName + ran
      +'\' class=\'label label-danger pull-right\' hidden><small>'+
       valOfView 
      +'</small></div>');
      $('#rdView'+ uniqueName + ran +'').hide();
      controllers.$setValidity('valid', true);
    }
    function verified( value ){
      if ( validationstypes( validationType, value, attributes, uniqueName, ran ) ){
        controllers.$setValidity('required', true );
        $('#rdView'+ uniqueName + ran +'').fadeOut();
      }else{
        $('#rdView'+ uniqueName + ran +'').fadeIn();
        controllers.$setValidity('required', false );
      }
      return scope = value;
    }
    
    
    controllers.$parsers.push( verified );
    //controllers.$formatters.push( init );
  }
  function isEmpty ( value ) {
    return value === '' || value === undefined || value === null ||
      value === false || value !== value;
  }
  var tmp = '',tmp2 = '', valuetemp = '', valuetemp2 = '';
  function validationstypes( forvalidate, val , attributes, uniqueName, ran){
    console.log('VALUE',val);
    if( isEmpty( val ) ){
      return false;
    }else{

      switch( forvalidate ){
        case 'mail':
          var pattern = /^\w+@[a-zA-Z_]+?\.([a-zA-Z]{2,3}){1,2}$/;
          if( val.match( pattern ) ){
            return true;
          }else{
            return false;
          }
        break;
        case 'pass1':
          valuetemp = val;
          return true;
        break;
        case 'pass2':
          valuetemp2 = val;
          if(valuetemp == valuetemp2){
            return true;
          }else{
            return false;
          }
        break;
        case 'text':
          var pattern = /^[a-zA-Z áÁéÉúÚóÓíÍ.]*$/;
          if( val.match( pattern ) ){
            return true;
          }else{
            return false;
          }
        break;
        case 'alphanumeric':
          var pattern = /^[a-zA-Z áÁéÉúÚóÓíÍ,.0-9]*$/;
          if( val.match( pattern ) ){
            return true;
          }else{
            return false;
          }
        break;
        case 'number':
          var pattern = '^[0-9]+$';
          if( val.toString().match( pattern ) ){
            return true;
          }else{
            return false;
          }
        break;
        case 'birthday':
          var today       = new Date(),
              flag        = true,
              datetoInput = new Date( val );
              console.log(today.getFullYear()-18);
              console.log(datetoInput.getFullYear());
          if( datetoInput.getFullYear() > today.getFullYear()-18){
            $('#rdView'+ uniqueName+ ran +'').html('<small>El año seleccionado debe de ser menor.</small>');
            flag = false;
          }
          return flag;
        break;
        case 'date':
          var today       = new Date(),
              flag        = true,
              datetoInput = new Date( val );
          if( datetoInput.getFullYear() < today.getFullYear() ){
            $('#rdView'+ uniqueName + ran +'').html('<small>El año seleccionado es menor.</small>');
            flag = false;
          }
          if( datetoInput.getDate()+1 < today.getDate() && 
            datetoInput.getFullYear() < today.getFullYear() ){
            $('#rdView'+ uniqueName + ran +'').html('<small>El día seleccionado es menor.</small>');
            flag = false;
          }
          if( datetoInput.getMonth() < today.getMonth() ){
            $('#rdView'+ uniqueName + ran +'').html('<small>El mes seleccionado es menor</small>');
            flag = false;
          }
          return flag;
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