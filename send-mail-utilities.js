var http   = require('http');
var email  = require("./mail_modules/email");

server  = email.server.connect({
    user:    "enrique@renderteam.com.mx", 
    password:"199413071", 
    host:    "apps305.myhostingpack.com", 
    ssl:     true,
    port:    "465"
});

/*exports.createMessage = function( req, res ) {
  var message = {
  
    from:    "Render Info <enrique@renderteam.com.mx>", 
    to:      "Enrique <enrique199413@gmail.com>",
    subject: "testing emailjs n.n",
    attachment: 
    [
      {data:"<h1>Putito</h1>", alternative:true},
      {path:"package.json", type:"text/plain", name:"File.json"}
    ]
  };
}*/
exports.sendMail = function ( req, res ) {
  console.log( req.body.message );
  server.send( req.body.message, function(err, message) {
      console.log(err || message);
      res.send( message );
  });
}