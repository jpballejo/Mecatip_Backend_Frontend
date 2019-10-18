const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var nivelSchema = new Schema({
  nivel: {
    type: Number,
    require: true,
    index: true
  },
  tiempo: {
    type: Number,
    require: true
  },
  puntoResta: {
    type: Number,
    require: true
  },
  puntosSuma: {
    type: Number,
    require: true
  },
  puntosPlus: {
    type: Number,
    require: true
  },
  isOcultar: {
    type: Boolean,
    default: false
  }
});
module.exports = nivelSchema;
