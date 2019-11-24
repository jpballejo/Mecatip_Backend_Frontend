var Usuario = require('../models/usuario.modelo'); //importo el modelo
var utilidades = require('../utilidades/util');
/*
Controlador: Usuario
created by: by Jp.
 */
/////////////////////////////////////listaUsuarios-GET/////////////////////////////////////////////////////////////////////////////////////
/**
 * [listaUsuario Lista todos los usuarios del sistema]
 * @param  {[type]}   req  [request]
 * @param  {[type]}   res  [response]
 * @param  {Function} next [funcion next()]
 * @return {[type]}        [retorna un json con el array de usuarios]
 */
exports.listaUsuario = (req, res, next) => {
  Usuario.find({}, (err, user) => {
    if(err) {
      return next(err);
    } else {
      res.status(200);
      res.json(user);
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////getUsuarios-GET/////////////////////////////////////////////////////////////////////////////////////
/**
 * [getUsuarios Funcion que lista los usuarios activos descrimindo los campos (password,proveedor,proveedorId)]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getUsuarios = (req, res, next) => {
  var query = Usuario.find({});
  query.where({
    isOcultar: false
  }); //filtra la eliminacion logica
  query.populate('infoPartida');
  query.select('-password -proovedor -proveedorId');
  query.exec((err, usuarios) => {
    if(err) {
      return next(err);
    } else {
      res.status(200);
      res.json(usuarios);
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////getUsuario-GET//////////////////////////////////////////////////////////////////////////////////////
/**
 * [getUsuario description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.getUsuario = (req, res, next) => {
  console.log('request ', req.params.usuario);
  var query = Usuario.findOne({
    username: req.params.usuario
  });
  query.where({
    isOcultar: false
  });
  query.populate('infoPartida');
  query.select('-password -proovedor -proveedorId');
  query.exec((err, user) => {
    if(err) {
      return next(err);
    } else {
      res.status(200).json(user);
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////updateUsuario-PUT/////////////////////////////////////////////////////////////////////////////////////
/**
 * [updateUsuario Actualiza un usuario]
 * @param  {[type]}   req  [se debe definir un json en la cleve newUser]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.updateUsuario = (req, res, next) => {
  console.log('USUARIO NUEVO UPDATE: ', req.body);

  Usuario.findOneAndUpdate({
    username: req.body.username
  }, req.body, (err, usuario) => {
    if(err) {
      return next(err);
    } else {
      res.status(200).json(usuario);
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////eliminarUsuario-DELETE/////////////////////////////////////////////////////////////////////////////////////
/**
 * [eliminarUsuario description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.eliminarUsuario = (req, res, next) => {
  console.log("username", req.body.username);
  Usuario.where({
    username: req.body.username
  }).update({
    isOcultar: true
  }).exec(() => {
    //  req.logout();
    //res.status(200);
    return res.send('OK Usuario Eliminado');
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////removeUsuarioById-DELETE/////////////////////////////////////////////////////////////////////////////////////
/**
 * [removeUsuarioById description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.removeUsuarioById = (req, res, next) => {
  Usuario.findByIdAndRemove(req.body.idUser, function(user, err) {
    if(err) {
      return next(err);
    } else {
      res.status(200).json(user);
      //res.send('Usuario removido')
      //    res.
    }
  })
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////cambiarPassword-PUT/////////////////////////////////////////////////////////////////////////////////////
exports.cambiarPassword = (req, res, next) => {
  console.log('body ', req.user.username);
  var query = {
    username: req.user.username
  };
  Usuario.where(query).update({
    password: utilidades.hashPassword(req.body.newPassword)
  }).exec(() => res.send('OK'));
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////resetPasswd-POST///////////////////////////////////////////////////////////////////////////////
exports.resetPasswd = (req, res, next) => {
  Usuario.findOne({
    email: req.body.email
  }, (err, user) => {
    console.log(user, req.email);
    var cadena = utilidades.generarCadena();
    user.password = cadena;
    user.save((err, user) => {
      if(err) next(err);
      if(user) {
        res.send('Password reset ok.');
        var mailOP = utilidades.getMailOptions();
        mailOP.from = 'jballejo@gmail.com';
        mailOP.to = req.email;
        mailOP.subject = 'Reset Password';
        mailOP.text = 'Su contraseña autogenerada: ', cadena;
        utilidades.enviarMail(mailOP);
        //utilidades.resetPswd(user, cadena);
      }
    })
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////****************/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////****************/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
