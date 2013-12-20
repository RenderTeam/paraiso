var lol = require('./../mongo-queries').lol,
    assert = require('assert');
var expect = require('expect.js');
var request = require('request').defaults({ encoding: null });
var app = require("../app");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Avoids DEPTH_ZERO_SELF_SIGNED_CERT error for self-signed certs


describe('Get to index', function () {
  it('should serve a 200', function (done) {
    request.get('http://localhost:3000/tasks/tasks', 
      function ( err, res, body ) {
        expect(res.statusCode).to.be(200);
        done();
      }
    );
  });
});