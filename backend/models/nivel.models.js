var nivelSchema = require('../schemas/nivel.schema');
var mongoose = require('mongoose');
module.exports = mongoose.model('nivel',nivelSchema);
