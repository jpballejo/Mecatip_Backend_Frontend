var JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
var Usuario = require('../../models/usuario.modelo');
var jwtSecret = require('../jwtConfig');
const opts = {//,ExtractJwt.fromAuthHeaderWithScheme('JWT')
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret.secret
};
console.log(opts);
// fromAuthHeaderAsBearerToken()
module.exports = function(passport) {
//el return importa!!!
return  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

    Usuario.findOne({username:jwt_payload.username}).exec((err, user) => {
      console.log(err, user);
      if(err) {
        return done(err, false);
      }
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    })
  }));
};
