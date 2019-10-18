//var passport = require('passport');
var mongoose = require('mongoose');
var Usuario = require('../../models/usuario.modelo');
var login = require('../estrategias/login');

//var resetPSW = require('../estrategias/resetPsswd');
//console.log(passport);
module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
  //  console.log('serializing user: ', user);
    //  console.log(user);
    done(null, user);
  });
  passport.deserializeUser(function(id, done) {
    Usuario.findOne({
      _id: id
    }, '-password -salt', function(err, user) {
      done(err, user);
    });
  });
  login(passport);
  
};
