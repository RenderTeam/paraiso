function tasksController ( scope, tasks ) {
  var datos = [];
  tasks.getAllTasks().success( function ( data ) {
    scope.tasks =  data;
    loadtoCalendar( scope );
  });

  //Call to one task when an user clicks the expand button
  scope.callOfDuty = function(){
    var params = {};

    params = this.task;

    tasks.getOneTask( params ).success( function ( data ) {
      var today = new Date(),
          deadline = new Date( data.deadline );

      data.daysToDeadline = deadline.getDate() - today.getDate();

      scope.duty = data;
    });
  };

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();

  /* event source that contains custom events on the scope */
  scope.events = [];
  /* event source that calls a function on every view switch */
  scope.eventsF = function (start, end, callback) {
    var s = new Date(start).getTime() / 1000;
    var e = new Date(end).getTime() / 1000;
    var m = new Date(start).getMonth();
    var events = [];
    callback(events);
  };

  scope.calEventsExt = {
     color: '#f00',
     textColor: 'yellow',
     events: [ 
        {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
        {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
        {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
      ]
  };
  /* alert on eventClick */
  scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
      scope.$apply(function(){
        scope.alertMessage = ('Day Clicked ' + date);
      });
  };
  /* alert on Drop */
   scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
      scope.$apply(function(){
        scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
      });
  };
  /* alert on Resize */
  scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
      scope.$apply(function(){
        scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
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
      header:{
        left: 'title',
        center: '',
        right: 'today prev,next'
      },
      dayClick: scope.alertEventOnClick,
      eventDrop: scope.alertOnDrop,
      eventResize: scope.alertOnResize
    }
  };
  /* event sources array*/
  scope.eventSources = [scope.events, scope.eventsF];
}

function loadtoCalendar ( scope ) {
  var event = {};
  scope.tasks.forEach(function (element, array, index) {
    event = {
      title: element.title,
      start: element.creation_date,
      end: element.deadline,
      className: ['openSesame']
    }
    scope.addEvent(event);
  });
}