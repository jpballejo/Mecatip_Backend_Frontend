var infoPartidaSchema = require('../schemas/infoPartida.schema');
var mongoose = require('mongoose');
module.exports = mongoose.model('infoPartida',infoPartidaSchema);
