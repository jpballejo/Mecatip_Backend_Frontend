const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var infoPartida = new Schema({
  id: {
    type: Schema.Types.ObjectId
  },
  idInfoPartida: {
    type: String,
    index: true
  },
  contrincante: { //link con el jugadorSchema.Types.Mixed,
    type: String,
    //  ref: 'usuario'
  },
  idPartida: { //link con la partida Schema.Types.Mixed
    type: String,
    //   ref: 'partida'
  },
  puntos_ganados: {
    type: Number,
    default: 0
  },
  puntos_perdidos: {
    type: Number,
    default: 0
  },
  puntos_plus: {
    type: Number,
    default: 0
  },
  nivelAlcanzado: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    default: 1
  },
  created: {
    type: Date,
    default: Date.now
  },
  isOcultar: {
    type: Boolean,
    default: false
  }, //este campo es para el borrado logico
  jugada: {
    type: Boolean,
    default: false
  }
});
/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////***************FUNCIONES************//////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////*************************///////////////////////////////////////////////////////////////////
//
module.exports = infoPartida;
