/** Utility stuff */
exports.getOperationDate = function () {
  var operationDate = new Date(),
      day = operationDate.getDate(),
      month = operationDate.getMonth() + 1,
      year = operationDate.getFullYear();

  if ( day < 10 ) { 
    day = '0' + day
  }

  if ( month < 10 ) { 
    month= '0'+ month
  } 

  operation = day + '/' + month + '/' + year;

  var hour = operationDate.getHours(),
    minute = operationDate.getMinutes();

  return operation + ' @ ' + hour + ':' + minute;
};
