module.exports = (passport) => {

return isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', {
      session: false
    }, (err, user, info) => {
      console.log("Cerberus estrategia: jwt");
      //si hubo un error relacionado con la validez del token (error en su firma, caducado, etc)
      if(info) {
        return next( info.message);
      }
      //si hubo un error en la consulta a la base de datos
      if(err) {
        return next('error ',err);
      }
      //si el token está firmado correctamente pero no pertenece a un usuario existente
      if(!user) {
        return next("You are not allowed to access.");
      }
      //inyectamos los datos de usuario en la request
      req.user = user;
      console.log('APROVED');
      next();
    })(req, res, next);
  }

}
