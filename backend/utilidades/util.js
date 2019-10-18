/////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////MODULO UTILIDADES////////////////////////////////////////////////////
///////////////////////////////Funciones de uso general////////////////////////////////////////////
//////////////////////////////IMPORT///////////////////////
var crypto = require("crypto");
var bCrypt = require('bcrypt');
var enviarMail = require('../email/nodeMail');
//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////FUNCIONES EXPORTS////////////////////////////////////////////////////
exports.generarCadena = () => {
  var ps = crypto.randomBytes(20).toString('hex');
  console.log(ps);
  return ps;
}
exports.isEmail = (cadena) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/).test(cadena);
exports.hashPassword = (password) => {
  console.log(password);
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
exports.resetPswd = (user, passwordnuevo) => {
  console.log(user.email, cadena)
  var mailOptions = enviarMail.getMailOptions();
  mailOptions.to = user.email;
  mailOptions.subject = 'Reseteo de contraseña';
  mailOptions.text = 'Su contraseña nueva es: ', passwordnuevo, ' se recomienda cambiarla a la brevedad...';
  enviarMail.enviarMail(mailOptions);
};
exports.generateID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
//////////////////////////////////////////////////////////////////////////////////////////////////
