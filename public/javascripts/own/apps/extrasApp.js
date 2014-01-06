var extrasAppModule = angular.module ( 'extrasApp', [ 'services.mail' ] );

newMailController.$inject = ['$scope', 'Mail'];
extrasAppModule.controller('MailController', newMailController );
