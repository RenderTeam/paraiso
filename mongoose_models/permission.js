var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PermissionSchema = new Schema({
  username:         { type: String, required: true},

  permissions: [{
    module:   { type: String },
    label:   { type: String },
    status:   { type: String },
    actions:  [{
      what:   { type: String },
      label:   { type: String },
      value: { type: Boolean }
    }]
  }]
});

module.exports = mongoose.model('Permission', PermissionSchema);