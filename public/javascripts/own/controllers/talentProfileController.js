function talentProfileController ( scope, employee, users ) {
  scope.editability = {
    bool: false,
    icon: 'lock',
    status: 'danger'
  };

  scope.init = function ( username ) {
    var params = {
      username: username
    };

    employee.getOneEmployee( params ).
      success( function ( data ) {
        scope.user = data;
        scope.user.date_of_birth = dateRawToInputFormat( data.date_of_birth );
      }).
      error();
  }

  scope.toogleEditable = function () {
    if ( this.editability.status === 'danger' ) {
      this.editability.icon = 'pencil';
      this.editability.status = 'success';
      this.editability.bool = true;
    } else {
      this.editability.icon = 'lock';
      this.editability.status = 'danger';
      this.editability.bool = false; 
    }
  }

  scope.updateEmployee = function () {
    var params = {
      user: scope.user
    };

    employee.updateEmployee( params ).
      success(function (){
        scope.toogleEditable();
      }).
      error(function (){});
  }
}

/**
 * Calculates age
 * @param { birthDate (Date) } The Date object that represents the bithdate to 
 *   calculate.
 * @return { age (Number) } The age today
 */
function calculateAge( birthDate ) {
  var today = new Date(),
      age = today.getFullYear() - birthDate.getFullYear();

  if ( ( today.getMonth() < birthDate.getMonth() ) || 
    ( today.getMonth() === birthDate.getMonth() && 
      today.getDate() < birthDate.getDate() ) ) {
    age--;
  }

  return age;
}

/**
 * Converte the date raw to date input format
 * @param { date (String)} Date raw from the db
 * @return { string } date in Y/M/D
 */
function dateRawToInputFormat ( date ) {
/*  var date = new Date(date) ,
      year = date.getFullYear(),
      month = date.getMonth() >= 9 ? (date.getMonth() + 1 ) : '0' + (date.getMonth() + 1),
      day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();*/

  return date.substring(0,date.indexOf('T'));
}