var expect = require('expect.js')
  , mongoose = require('mongoose')
  , Dummy    = mongoose.model('Dummy', new mongoose.Schema({a:Number}))
;

describe("Example spec for a model", function() {
  
  beforeEach(function(done){
    done();
  });

  afterEach(function(done){    
    //delete all the customer records    
    Dummy.remove({}, function() {
      done();
    });
  });

  it("can be saved", function(done) {
    Dummy.create({a: 1}, done);
  });

  it("can save another", function(done) {
    Dummy.create({a: 2}, done);
  });

  it("can be listed", function(done) {
     Dummy.find({}, function(err, models){
      expect(err).to.not.exist;
      expect(models).to.have.length(0);
      done();
     });
  });

  it("can be listed", function(done) {
    new Dummy({a: 1}).save(function(err, model){
      if (err) return done(err);

      new Dummy({a: 2}).save(function(err, model){
        if (err) return done(err);

        Dummy.find({}, function(err, docs){
          if (err) return done(err);
          expect(docs).to.have.length(2);
          done();
        });
      });
    });
  });
});