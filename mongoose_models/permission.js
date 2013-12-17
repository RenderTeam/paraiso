var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PermissionSchema = new Schema({
  username:         { type: String, required: true},

  tasks:{
    status: { type: String, default: 'danger'},
    can: {
      saveTask:     { type: Boolean, default: false},
      getAllTasks:  { type: Boolean, default: false}
    }
  },

  employees:{
    status: { type: String, default: 'danger'},
    can: {
      saveEmployee: { type: Boolean, default: false}
    }
  },

  control_panel:{
    status: { type: String, default: 'success'},
    can: {
      accessPermissions:  { type: Boolean, default: true},
      updatePermissions:  { type: Boolean, default: true}
    }
  },

  departments:{
    status: { type: String, default: 'warning'},
    can: {
      lol:  { type: Boolean, default: false},
      rofl:  { type: Boolean, default: true}
    }
  }
});

module.exports = mongoose.model('Permission', PermissionSchema);