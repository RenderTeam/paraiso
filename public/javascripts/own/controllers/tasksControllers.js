var myAppModule = angular.module('taskApp', []);

myAppModule.controller('AgendaController', agendaController);

function agendaController( $http, $scope ){
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