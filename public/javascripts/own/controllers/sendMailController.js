var sendMailAppModule = angular.module ( 'emailApp', [ 'services.mail' ] );

sendMailAppModule.controller('MailController', newMailController );

newMailController.$inject = ['$scope', 'Mail'];
function newMailController( scope , mail){
  scope.sendMail = function(){
    var message = {
      from:    "Render Info <enrique@renderteam.com.mx>", 
      to:      " <"+scope.mail.to+">",
      subject: scope.mail.subject,
      attachment: 
      [
        {data: scope.mail.subject, alternative:true}
      ]
    };
    var params   = {};
    console.log( message );
    params.message = message;
    mail.sendMail( params );
  }
}
