module.exports = (server, cookieParser, passport) => {
  var ExtractJwt = require('passport-jwt').ExtractJwt,
    passportJwtSocketIo = require('passport-jwt.socketio'),
    jwtSecret = require('../passport/jwtConfig');
  var io = require('socket.io')(server);
  var Usuario = require('../models/usuario.modelo');
  const options = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: jwtSecret.secret
  }
  var usuarios = [];
  var salas = [];
  var socket = null;

  function verify(jwtPayload, done) {
    // token is valid
    // we still can verify the token
    Usuario.findOne({
      username: jwtPayload.username
    }, (err, user) => {
      console.log('Error: ',err);
      console.log('user: ',user);
      if(err) done(err, false);
      if(user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
    // the user passed is set to socket.request.user
  }
  io.use(passportJwtSocketIo.authorize(options, verify));
};
