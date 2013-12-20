var http   = require('http');
var email  = require("./mail_modules/email");

server  = email.server.connect({
    user:    "enrique@renderteam.com.mx", 
    password:"199413071", 
    host:    "apps305.myhostingpack.com", 
    ssl:     true,
    port:    "465"
});

exports.sendMail = function ( req, res ) {
  console.log( req.body.message );
  server.send( req.body.message, function(err, message) {
      console.log(err || message);
      console.log("Error" + err);
      if( err != null )
      {
        res.send( {status:false} );
      }else{
        res.send( {status:true} );
      }
      console.log("Mensaje" + message);
      
  });
}