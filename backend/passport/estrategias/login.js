var LocalStrategy = require('passport-local').Strategy;
var Usuario = require('../../models/usuario.modelo');
var JWTstrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJWT;
var jwtEs = require('../estrategias/jwtEstrategia');
var jwt = require('jsonwebtoken');
var jwtSecret = require('../jwtConfig');
module.exports = function(passport) {
  passport.use(new LocalStrategy({
    session: false
  }, function(username, password, done) {
    console.log(username, password);
    Usuario.findOne({
      $or: [{
        email: username
      }, {
        username: username
      }]
    }).where({
      isOcultar: false
    }).exec(function(err, user) {
      // Si hay un error uso done con el error
      if(err) return done(err);
      // si el usuario no existe genero un log y retorno done
      if(!user) {
        console.log('Usuario no encontrado ' + username + '.');
        return done(null, false, {
          message: 'Usuario no encontrado.'
        });
      }
      // si exite el usuario pero es incorrecto el password
      if(!user.authenticar(String(password))) {
        console.log('Password incorrecto.');
        return done(null, false, {
          message: 'Password incorrecto.'
        }); // redirigo al login
      }
      //si existe el usuario y es correcto el password retorno el usuario con el metodo done

      return done(null, user);
    });
  }));
  jwtEs(passport);
}
