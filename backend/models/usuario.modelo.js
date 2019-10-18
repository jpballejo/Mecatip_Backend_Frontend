'use strict'
const mongoose = require('mongoose');
var userSchema = require('../schemas/usuario.schema');


userSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
module.exports = mongoose.model('usuario', userSchema);
