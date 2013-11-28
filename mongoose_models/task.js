var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({

  assigned:       [String],
  creation_date:  { type: Date, default: Date.now },
  creator:        [String],
  deadline:       { type: Date, default: Date.now},
  description:    String,
  label:          String,
  priority:       Number,
  reminder:       [Number],
  status:         String,
  title:          String
});

/*TaskSchema.methods.getOneTask = function ( req, res ) {
  var condition = {
    _id: req.body._id
  };

  var query = Task.findOne( condition );

  query.select('-reminder').exec( function ( err, task ) {
    if ( err ) throw err;
    res.send( task );
  })
  return this.model('Task').findOne( condition , cb );
};

animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({ type: this.type }, cb);
}*/

module.exports = mongoose.model('Task', TaskSchema);