var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormDescriptionSchema = new Schema({
  category: String,
  description: String,
  name: { type: String, required: true, index: { unique: true } }
});

module.exports = mongoose.model('FormsDescription', FormDescriptionSchema);