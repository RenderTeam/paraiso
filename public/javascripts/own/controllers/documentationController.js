function documentationController ( scope, documents, http ) {
  console.log('wii');

  /*documents.showFiles().success( function ( data ) {
    scope.files = data;
  });*/

  scope.columns = [{lol:'Yolo'}];
  scope.indes = 0;


  scope.addColumn = function () {
    scope.columns.push({lol:scope.columns.length});
  }

  scope.removeColumns = function ( index ) {
    for( i = index+1 ; i < scope.columns.length;i++){
      $('#'+i).parent().hide();
    }
    scope.columns.splice( index + 1, scope.columns.length - index);
    var hola = index-(scope.columns.length - index)-2;
    for(j=hola;j<scope.columns.length +1;j++){
        $('#'+j).parent().show();
    }
  }

  
  var counter = 0;
  scope.validateColumn = function (){
    if( scope.columns.length > 3 ){
      $('#'+counter).parent().hide();
      counter ++;
      scope.addColumn();
    }else{
      counter = 0;
      scope.addColumn();
    }
  }

}
