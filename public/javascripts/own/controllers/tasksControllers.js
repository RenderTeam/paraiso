var taskAppModule = angular.module('taskApp', []);

function taskRouteConfig( $routeProvider, $locationProvider ) {
  $routeProvider.
  when('/tasks/my_tasks', {
    controller: MyTasksController,
    templateUrl: 'tasks/partials/tasks.html'
  }).
  when('/tasks/tasks', {
    controller: TasksController,
    templateUrl: 'tasks/partials/tasks.html'
  }).
  when('/tasks/new_task', {
    controller: NewTaskController,
    templateUrl: 'tasks/partials/new_task.html'
  }).
  otherwise({
    redirectTo: '/tasks/tasks'
  });

  $locationProvider.html5Mode(true);
}

taskAppModule.config( taskRouteConfig );

function TasksController( $http, $scope ){
  $http.post('/getTasks')
    .success( function ( data, status, headers, config ){
      $scope.tasks = data;
    }).error( function ( data, status, headers, config ){
      console.log( 'Error :O' );
    });

  //Call to one task when an user click the expand button
  $scope.callOfDuty = function(){
    $http.post('/getOneTask', this.task )
      .success( function ( data, status, headers, config ){
        var duty = data,
            today = new Date(),
            deadline = new Date(data.deadline);

        duty.daysToDeadline = today.getDate() - deadline.getDate();

        $scope.duty = duty;

      }).error( function ( data, status, headers, config ){
        console.log( 'Error :O' );
      });
  }
}

function MyTasksController( $http, $scope ){}
function NewTaskController( $http, $scope ){}