var querystring = require("querystring");
var formidable = require("formidable");
var fs = require ("fs");
 
function start(response){
  //funcion que inicializa la parte gráfica de mi html FORMULARIO
  console.log("Request handler start was called.");
  var body = "<html>" +
  "<head>" +
  "<meta http-equiv='Content-Type' content='text/html'; " +
  "charset='UTF-8' />" +
  "</head>" +
  "<body>" +
  "<form action='/upload' enctype='multipart/form-data' method='post'>" +
  "<input type='file' name='upload'></input>" +
  "<input type='submit' value='Subir Archivo Coqueto' />" +
  "</form>" +
  "</body>" +
  "</html>" ;
  response.writeHead(200,{"Content-Type":"text/html"});
  response.write(body);
  response.end();
}

function upload(response,request){
  console.log("Request handler upload was called.");
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error,fields,files){
    console.log("parsing done");
    /* En windows tuve un error por que tenía que poner un archivo existente */
    fs.rename(files.upload.path,"/home/liodebian/hola.pdf", function (err){
      if (err){
        fs.unlink("/home/liodebian/hola.pdf");
        console.log("Value of files.upload.path : " + files.upload.path );
        fs.rename(files.upload.path,"/home/liodebian/hola.pdf");
      }
    });
    response.writeHead(200, {"Content-Type" : "text/html" } );
    response.write("PDF Subido: <br/>");
    response.write("<a href='/ver'>/ver</a>");
    response.end();
  });
}

function ver(response, request){
  console.log("Request handler ver was called.");
  fs.readFile("/home/liodebian/hola.pdf","binary", function(error,file){
    if (error){
      response.writeHead(500, {"Content-Type": "text/plain" });
      response.write(error + "\n");
      response.end();
    }
    else{
      response.writeHead(200, {"Content-Type" : "application/pdf" });
      response.write(file, "binary" );
      response.end();
    }
  });
}
exports.start = start;
exports.upload = upload;
exports.ver = ver;