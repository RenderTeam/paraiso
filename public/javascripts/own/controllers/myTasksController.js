function myTasksController ( scope, tasks ) {
  tasks.getTasksFromUser().success( function ( data ) {
    scope.tasks =  data;
    loadtoCalendar( scope );
  });
  scope.isTaskForUser = false;
  scope.isSubTaskForUser = false;
  scope.toRevision = false;
  scope.previewRevision = function (index){
    scope.toRevision = true;
  }
  scope.sendToRevision = function(subtask){
    console.log(subtask);
  };
  scope.verifyAssignedSubtask = function(index){
    scope.isSubTaskForUser = false;
    scope.duty.subTasks[index].assigned.forEach(function(a,e,i){
      if(a == user){
        console.log(a);
        console.log(index);
        scope.isSubTaskForUser = true;
      }
    });
    console.log(index);
    console.log(scope.isSubTaskForUser);scope.toRevision = true;
    return scope.isSubTaskForUser;
  };
  //Call to one task when an user click the expand button
  scope.callOfDuty = function () {
    var params = {};
    params = this.task;
    tasks.getOneTask( params ).
      success( function ( data ) {
        var today = new Date(),
            deadline = new Date( data.deadline );
        data.daysToDeadline = deadline.getDate() - today.getDate();
        scope.duty = data;
        scope.duty.assigned.forEach(function(a,e,i){
          if(user == a){
            scope.isTaskForUser = true;
          }
        });
        console.log(scope.duty);
        console.log(scope.duty.subTasks);
      }).
      error();
  };

  //Call an undate one task and validate user.
  scope.taskUpdateDone = function ( that ) {
    console.log('task', that);
    var task = {
          status: 'done'
        };
    var params = {
      creation_date: that.creation_date,
      task: task
    };
    console.log('PARAMS',params);
    tasks.updateOneTask( params ).
    success( function( data ){
      console.log('DATA', data );
    }).
    error( function( error ){
      console.log('ERROR', error );
    });
    /*var params = {};
    params = this.task;

    tasks.getOneTask( params ).
      success( function ( data ) {
        var today = new Date(),
            deadline = new Date( data.deadline );
        data.daysToDeadline = deadline.getDate() - today.getDate();
        scope.duty = data;
      }).
      error();*/
  };
  scope.callOfClickCalendar = function (data) {
    alert();
    var params = {};

    params = data.task;

    tasks.getOneTask( params ).
      success( function ( data ) {
        var today = new Date(),
            deadline = new Date( data.deadline );
        data.daysToDeadline = deadline.getDate() - today.getDate();
        alert();
        scope.duty = data;
      }).
      error();
  };
  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  /* event source that contains custom events on the scope */
  scope.events = [];
  /* event source that calls a function on every view switch */
  /* alert on eventClick */
  scope.eventClicked = function( calevent ,jsEvent, view){
    alert();
  }
  scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
      scope.$apply(function(){
      });
  };
  /* add and removes an event source of choice */
  scope.addRemoveEventSource = function(sources,source) {
    var canAdd = 0;
    angular.forEach(sources,function(value, key){
      if(sources[key] === source){
        sources.splice(key,1);
        canAdd = 1;
      }
    });
    if(canAdd === 0){
      sources.push(source);
    }
  };
  /* add custom event*/
  scope.addEvent = function( event ) {
    scope.events.push( event );
  };
  /* remove event */
  scope.remove = function(index) {
    scope.events.splice(index,1);
  };
  /* Change View */
  scope.changeView = function(view,calendar) {
    calendar.fullCalendar('changeView',view);
  };
  /* Change View */
  scope.renderCalender = function(calendar) {
    calendar.fullCalendar('render');
  };
  /* config object */
  scope.uiConfig = {
    calendar:{
      height: 450,
      editable: true,
      theme: false,
      monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
      monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dec'],
      dayNames : ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
      dayNamesShort : ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      header:{
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      
      eventClick: function( calEvent, jsEvent, view ) {
        alert();
      }
    }
  };
  /* event sources array*/
  scope.eventSources = [scope.events];
}

function loadtoCalendar ( scope ) {
  var event = {};
  scope.tasks.forEach(function (element, array, index) {
    var date = new Date(element.deadline);
    event = {
      title: element.title,
      start: element.creation_date,
      end: date,
      className: [element.label]
    }
    scope.addEvent(event);
  });
}