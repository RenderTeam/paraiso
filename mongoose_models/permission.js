var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PermissionSchema = new Schema({
  username:         { type: String, required: true},

  permissions: [{
    _id: false,
    module:   { type: String },
    label:   { type: String },
    status:   { type: String },
    actions:  [{
      _id: false,
      what:   { type: String },
      label:   { type: String },
      value: { type: Boolean }
    }]
  }]
});

module.exports = mongoose.model('Permission', PermissionSchema);