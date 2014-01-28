var notificationsApp  = angular.module('notificationsApp',
  ['services.tasks']);
notificationsController.$inject = [ '$scope', '$http', 'Tasks' ];
notificationsApp.controller('NotificationsController', notificationsController);