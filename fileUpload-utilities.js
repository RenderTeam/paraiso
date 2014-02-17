var http = require('http'),
    multiparty = require('multiparty'),
    util= require('util'),
    fs = require('fs');

/*var server = http.createServer(function(req, res) {
  switch (req.uri.path) {
    case '/':
      display_form(req, res);
      break;
    case '/upload':
      upload_file(req, res);
      break;
    default:
      show_404(req, res);
      break;
  }
});*/

exports.Example = function(req,res){
  console.log('Hoola2', req.url);
  if (req.url === '/Example' && req.method === 'POST') {
    // parse a file upload
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      console.log('Temporal',files);
      fs.readFile(files.uploadedFile[0].path, function (err, data) {
  // 
        console.log(data);
        var newPath = __dirname + "/views/UploadFiles/"+
        files.uploadedFile[0].originalFilename;
        fs.writeFile(newPath, data, function (err) {
          console.log('Rout',newPath);
          console.log('DONE');
        });
      });



      res.end(util.inspect({fields: fields, files: files}));
      
    });
    

    return;
  }
}

exports.uploadFile = function (req, res) {
  //req.setEncoding('binary');
  console.log('Hola',req);
  var stream = new multipart.Stream(req);
  stream.addListener('part', function(part) {
    part.addListener('body', function(chunk) {
      var progress = (stream.bytesReceived / stream.bytesTotal * 100).toFixed(2);
      var mb = (stream.bytesTotal / 1024 / 1024).toFixed(1);

      console.log("Uploading "+mb+"mb ("+progress+"%)\015");

      // chunk could be appended to a file if the uploaded file needs to be saved
    });
  });
  stream.addListener('complete', function() {
    res.sendHeader(200, {'Content-Type': 'text/plain'});
    res.sendBody('Thanks for playing!');
    res.finish();
    console.log("Done")
  });
}
