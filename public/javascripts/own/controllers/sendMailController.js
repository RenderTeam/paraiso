function newMailController( scope , mail ){
  scope.sendMail = function(){
    function hideModalMessage(){
      modal.modal('hide')
    }
    var date = new Date();
    var message = {
      from:    "Pruebas <hola@renderteam.com.mx>", 
      to:      " <"+scope.mail.to+">",
      subject: scope.mail.subject,
      attachment: 
      [
        {data: scope.mail.message +" <br> "+ date , alternative:true}
      ]
    };
    var params   = {},
        modal  = $('#modalResult'),
        modalContent  = $('#modalResult .modal-body');

    console.log( message );
    params.message = message;
    modal.modal('show');
    modalContent.html('<div id="bowlG"><div id="bowl_ringG">'+
      '<div class="ball_holderG"><div class="ballG"></div></div></div></div>');
    mail.sendMail( params ).
      success(
        function ( data ) {
          if( data.status ){
            modalContent.fadeOut(
              function(){
                modalContent.html("<div class='alert alert-success'>"+
                  "El correo se envió existosamente.</div>");
              }
            ).fadeIn();
            setTimeout( hideModalMessage, 3000);
          }else{
            modalContent.fadeOut(
              function(){
                modalContent.html("<div class='alert alert-danger'>"+
                  "No se envió el correo, vuelva a intentarlo.</div>");
              }
            ).fadeIn();
            setTimeout( hideModalMessage, 3000);
          }
        }
      ).
      error(
        function( data ) {
          console.log( data );
        }
      );
  }
}