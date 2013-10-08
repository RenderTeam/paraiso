var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var resourcesSchema = new Schema({

  //Opcion de poner un idGenerado o una clave
  brand:          String,
  description:    String,
  location:       [String], //Checar el nombre, si si va a quedar laboratorio o que va a quedar al final
  name:           String,
  model:          String,
  reference_bill: String, //Buscar como MongoDB manipula archivos para cambiar el tippo.
  serial_number:  String,
});

module.exports = mongoose.model('Resources', resourcesSchema);