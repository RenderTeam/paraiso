var controlPanelAppModule  = angular.module('controlPanelApp', []);

controlPanelAppModule.controller('NewUserController', newUserController);

newUserController.$inject = ['$scope', '$http'];
function newUserController( scope, http ){}