module.exports = (passport) => {
  /**
   * [isAuthorized: funcion que valida si es un usuario ADMIN]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
return isAuthenticated = (req, res, next) => {
    passport.authenticate('jwt', {
      session: false
    }, (err, user, info) => {
      console.log("ejecutando *callback auth* de authenticate para estrategia jwt");
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
      next();
    })(req, res, next);
  }
}
