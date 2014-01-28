var documentationAppModule  = angular.module('documentationApp', [ 
  'services.documents' ]);

documentationController.$inject = [ '$scope', 'Documents' ];
documentationAppModule.controller('DocumentationController', documentationController);