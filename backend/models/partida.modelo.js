'use strict'
const mongoose = require('mongoose');
const partidaSchema= require('../schemas/partida.schema');
module.exports = mongoose.model('partida', partidaSchema);
