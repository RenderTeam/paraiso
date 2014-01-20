function permissionsController ( scope, permission ){

  var toUpdate = [];
  
  scope.permission = {};

  permission.getAllPermissionsStatus().
    success( function ( data ) {
      scope.permissions = data;
    }).
    error();

  scope.changeOnModuleClick = function ( module ) {
    toUpdate = changeOnModuleClick( toUpdate, module );
  };

  scope.changeOnActionClick = function ( module, what ) {
    toUpdate = changeOnActionClick( toUpdate, module, what );
    toUpdate = checkModuleStatus( toUpdate, module );
  };
  
  scope.checkStatus = function ( status ) {
    flag = status === 'success' ? true:false;
    return flag;
  };

  scope.getPermissions = function () {
    permission.getOnePermission( this.permission ).
      success( function ( data ) {
        scope.permission = data;
        toUpdate = data.permissions;
      }).
      error();
  };

  scope.updatePermissions = function () {
    var params = {
      username:     scope.permission.username,
      permissions:  {
        permissions: toUpdate
      }
    };

    permission.updatePermission( params ).
      success(function (){}).
      error(function (){});

    scope.permissions = changePermissionsOnUpdate( scope.permissions, 
      scope.permission );
  };
}

function changePermissionsOnUpdate ( permissions, updated ) {
  permissions.forEach( function ( element, index, array ) {
    if ( element.username === updated.username ){
      permissions[index] = updated;
    }
  });

  return permissions;
}

function changeOnModuleClick ( permissions, module ) {
  permissions.forEach( function ( element, index, array ) {
    if ( element.module === module ){
      var moduleIndex = index,
          negation = !checkStatus(permissions[moduleIndex].status);

      if ( negation ){
        permissions[moduleIndex].status = 'success';
      }else{
        permissions[moduleIndex].status = 'danger';
      }

      element.actions.forEach( function ( element, index, array ) {
        permissions[moduleIndex].actions[index].value = negation;
      });
    }
  });

  return permissions;
}

function changeOnActionClick ( permissions, module, what ) {
  permissions.forEach( function ( element, index, array ) {
    if ( element.module === module ){
      var moduleIndex = index;
      element.actions.forEach( function ( element, index, array ) {
        if ( element.what === what ){
          permissions[moduleIndex].actions[index].value =
            !permissions[moduleIndex].actions[index].value;
        }
      } );
    }
  });

  return permissions;
}

function checkModuleStatus ( permissions, module ) {
  var counter = 0;

  permissions.forEach( function ( element, index, array ) {
    if ( element.module === module ){
      var moduleIndex = index;

      element.actions.forEach( function ( element, index, array ) {
        if ( element.value ) {
          counter++;
        }
      });

      if( counter === 0 ){
        permissions[moduleIndex].status = 'danger';
      }else if ( counter === element.actions.length ) {
        permissions[moduleIndex].status = 'success';
      } else {
        permissions[moduleIndex].status = 'warning';
      }
    }
  });

  return permissions;
}

function checkStatus ( status ) {
  flag = status === 'success' ? true:false;
  return flag;
}