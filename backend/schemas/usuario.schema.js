'use-strict'
const mongoose = require('mongoose');
var bCrypt = require('bcrypt');
//var infoPartida = require('./infoPartida.schema');
const Schema = mongoose.Schema;
var usuarioSchema = new Schema({
  id: {
 type: Schema.Types.ObjectId,
    //unique:true
  },
  nombre: String,
  apellido: String,
  email: {
    type: String,
    index: true,
    required: true,
    match: /.+\@.+\..+/
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    validate: [function(password) {
      return password && password.length >= 5;
    }, 'La contrasenia debe de ser mas larga '],
    required: true
  },
  imagenPerfil: {
    type: String,
    default: 'sin-imagen'
  },
  infoPartidas: [{
    type: Schema.Types.ObjectId,
    ref: 'infoPartida'
  }],
  tipoUsuario: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  },
  proveedor: {
    type: String,
    required: 'El proveedor es necesario'
  },
  proveedorId: String,
  proveedorData: {},
  created: {
    type: Date,
    default: Date.now
  },
  isOcultar: {
    type: Boolean,
    default: false
  },
});
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////***************FUNCIONES************//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////****DELETE****///////////////////////////////////////////////////////////////////
/**
 * [Funcion que elimina logicamente un usuario]
 * @return {[type]} [description]
 */
usuarioSchema.statics.Delete = function(next) {
  console.log('DELETE: usuario');
  var _this = this;
  _this.isOcultar = true;
  next(_this.isOcultar);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////****hashPasword****///////////////////////////////////////////////////////////////////
/**
 * [funcion que encripta el password]
 * @param  {[type]} password [Recibe una cadena ]
 * @return {[type]}          [devuelve la cadena cifrada]
 */
usuarioSchema.methods.hashPassword = function(password) {
  console.log('hashPasword');
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////****Authenticar*****////////////////////////////////////////////////////////////////////////
/**
 * [Funcion que valida el password]
 * @param  {[type]} password [cadena sin cifrar]
 * @return {[type]}          [true or false]
 */
usuarioSchema.methods.authenticar = function(password) {
  console.log('Authenticar');
  var _this = this;
  console.log(typeof(password));
  console.log("password viene:", password, "password schema=>", _this.password);
  return bCrypt.compareSync(password, this.password);
  //  return password == this.password;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////****SAVE****///////////////////////////////////////////////////////////////////
/**
 * [description]
 * @param  {Function} next [funcion siguiente]
 * @return {[type]}        [description]
 */
usuarioSchema.pre('save', function(next) {
  console.log('SAVE');
  if(this.password) {
    this.password = this.hashPassword(this.password);
    console.log(this.password);
  }
  next();
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////*************************///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = usuarioSchema;
