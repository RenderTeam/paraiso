var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema();

TaskSchema.add({
  assigned:       [String],
  creation_date:  { type: Date, default: Date.now },
  creator:        [String],
  deadline:       { type: Date, default: Date.now },
  description:    String,
  label:          String,
  priority:       Number,
  reminder:       [Number],
  dateReviewed:   Date,//día de la última revisión
  title:          String,
  percentageDone: String,
  subTasks:       [{
    title     :String,
    priority  :Number,
    assigned  :[]
  } ],
  status:        String,//estado general de la tarea toDo , not done, in revision, done
  comments:     [{
    _id: false,
    user:      String,
    comment:   String,
    date:   Date//día del comentario
  }]//comentarios asignados a la revisión de la tarea por organizados
})

module.exports = mongoose.model('Task', TaskSchema);
