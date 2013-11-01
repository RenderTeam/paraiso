var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormDescriptionSchema = new Schema({
  name: { type: String, required: true, index: { unique: true } },
  description: String
});

module.exports = mongoose.model('FormsDescription', FormDescriptionSchema);