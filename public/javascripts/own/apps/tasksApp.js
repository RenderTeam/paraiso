var taskAppModule  = angular.module( 'taskApp',
  [ 'services.tasks', 'services.users' , 'ui.calendar' , 'ui.bootstrap' ,
   'uiCalendarCtrl', 'Validations'] );

myTasksController.$inject = [ '$scope', 'Tasks' ];
taskAppModule.controller( 'MyTasksController', myTasksController );

newTaskController.$inject = [ '$scope', 'Tasks', 'Users' ];
taskAppModule.controller( 'NewTaskController', newTaskController );


tasksController.$inject = [ '$scope', 'Tasks' ];
taskAppModule.controller( 'TasksController', tasksController );
