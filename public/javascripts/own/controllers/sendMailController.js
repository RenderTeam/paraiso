var sendMailAppModule = angular.module ( 'emailApp', [] );

sendMailAppModule.controller('MailController', newMailController );

newMailController.$inject = ['$scope'];
function newMailController( scope ){
  scope.newMail = function(){
    alert('Funciona! :)');
  }

}
