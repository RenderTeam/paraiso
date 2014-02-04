function notificationsController ( scope , http, task) {
  var i = 0;
  scope.i = 0;
  task.getAllTasks().success( function ( data ) {
    data.forEach( function ( element, index){
      if( element.status ===  'not done' && element.creator == user) {
        i++;
      }
    });
    scope.i = i;
  });
  scope.logout = function () {
  http.post( '/logout' )
    .success( function ( data, status, headers, config ) {
        window.location.href = ('/');
    }).error( function ( data, status, headers, config ) {
    });
  };
  scope.taskNotifier = function () {
    window.location.href = ('/tasks/own');
  };
}