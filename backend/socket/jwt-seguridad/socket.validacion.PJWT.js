module.exports = (io,jwtSecret) => {
  var ExtractJwt = require('passport-jwt').ExtractJwt,
    passportJwtSocketIo = require('passport-jwt.socketio');

  var Usuario = require('../models/usuario.modelo');

  const options = {
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
    secretOrKey: jwtSecret.secret
  }

  function verify(jwtPayload, done) {
    // token is valid
    // we still can verify the token
    Usuario.findOne({
      username: jwtPayload.username
    }, (err, user) => {
      console.log('Error: ', err);
      console.log('user: ', user);
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
