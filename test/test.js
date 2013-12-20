/*var queries = require('./../mongo-queries'),
    assert = require('assert'),
    expect = require('expect.js'),
    request = require('request').defaults({ encoding: null }),
    app = require("../app");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs

describe('Get to index', function () {
  it('should serve a 200', function (done) {
    request.get('http://localhost:3000/', 
      function ( err, res, body ) {
        expect(res.statusCode).to.be(200);
        done();
      }
    );
  });
});

describe('User post' , function () {
  it('should get one user', function ( done ) {
    request(
      { method: 'POST',
        uri: 'http://localhost:3000/getOneUser',
        headers: { 'content-type': 'application/json' ,
          'accept': 'application/json' },
        json: { "username": 'dan' },
        
      }
    , function ( err, response, body ){
      expect(response.statusCode).to.be(200);
      expect(response.body.username).to.be('dan');
      done();
    });
  });
});

describe('User post' , function () {
  it('should get one user', function ( done ) {
    var req = { method: 'POST',
          uri: 'http://localhost:3000/getOneUser',
          headers: { 'content-type': 'application/json' ,
            'accept': 'application/json' },
          body: { "username": 'dan' }
        };
    console.log(queries.getOneUser(req));
    expect(queries.getOneUser(req)).to.be('dan');
  });
});*/