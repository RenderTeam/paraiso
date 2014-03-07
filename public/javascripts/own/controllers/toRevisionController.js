function toRevisionController ( scope , tasks ){
  scope.tasks = [];
  tasks.getAllTasks().success( function ( data ) {
    data.forEach(function(e,i){
      if(e.status == 'En revisión' && e.creator == user){
        scope.tasks.push(e);
      }
    });
  });
  scope.previewRevision = function (index){
    console.log('Hola');
    revisionPreview( index );
  }
  scope.viewRevisions = function (){
    viewRevisionPreview();
  }
  scope.viewRevisionsForTask = function (){
    viewRevisionForTask();
  }
  scope.invalidTask = function ( that ){
    var comment = {
      date: new Date(),
      user: user,
      comment:scope.comment
    }
    that.comments.push(comment);
    var task = {
          status: 'Revisada',
          comments : that.comments
        };
    var params = {
      creation_date: that.creation_date,
      task: task
    };
    console.log('PARAMS',params);
    tasks.updateOneTask( params ).
    success( function( data ){
      console.log('DATA', data );
      newNotification('','La tarea '+that.title+' se marcó como revisada.','success');
      $('#taskDescription').modal('hide');
    }).
    error( function( error ){
      console.log('ERROR', error );
    });
  }
  scope.taskUpdateDone = function ( that ) {
    var comment = {
      date: new Date(),
      user: user,
      comment:scope.comment
    }
    that.comments.push(comment);
    var task = {
          status: 'Terminada',
          comments : that.comments
        };
    var params = {
      creation_date: that.creation_date,
      task: task
    };
    console.log('PARAMS',params);
    tasks.updateOneTask( params ).
    success( function( data ){
      console.log('DATA', data );
      newNotification('','La tarea '+that.title+' se marcó como terminada.','success');
      scope.tasks = [];
      tasks.getAllTasks().success( function ( data ) {
        data.forEach(function(e,i){
          if(e.status == 'En revisión' && e.creator == user){
            scope.tasks.push(e);
          }
        });
      });
      $('#taskDescription').modal('hide');
    }).
    error( function( error ){
      console.log('ERROR', error );
    });
  };
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
}