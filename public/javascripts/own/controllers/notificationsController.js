function notificationsController ( scope , http, task) {
  var i = 0, j = 0, k = 0;
  scope.i = 0;
  scope.j = 0;
  scope.k = 0;
  task.getAllTasks().success( function ( data ) {
    console.log(data);
    data.forEach( function ( element, index){
      if( element.status !=  'Terminada' && element.assigned.contains(user) &&
      element.assigned == user ) {
        i++;
      }
      if( element.status ===  'En revisión' && element.creator == user) {
        j++;
      }
      if( element.status ===  'En revisión' && element.creator == user) {
        k++;
      }
    });
    scope.i = i;
    scope.j = j;
    scope.k = k;
  });
  scope.logout = function () {
  http.post( '/logout' )
    .success( function ( data, status, headers, config ) {
        window.location.href = ('/');
    }).error( function ( data, status, headers, config ) {
    });
  };
  scope.tasksAssigned = function () {
    window.location.href = ('/tasks/own');
  };
  scope.taskToRevision = function () {
    window.location.href = ('/tasks/toRevision');
  };
}
Array.prototype.contains = function( obj ) {
  var i = this.length;
  while ( i-- ) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};