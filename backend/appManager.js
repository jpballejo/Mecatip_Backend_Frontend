module.exports = (app, cookieParser, passport, headers, express, path, flash) => {
  //import///////////////////////////////////////////
  var socketRouter = require('./routes/socket.routes');
  var passportRouter = require('./routes/passport.routes');
  var usersRouter = require('./routes/users.routes');
  var palabrasRouter = require('./routes/palabras.router');
  var juegoRouter = require('./routes/juego.routes');
  var initPassport = require('./passport/modulo/init');
  var cerberus = require('./routes/cerberus/cerberus');
  //////////////////////////////////////middleware////////////////////////////////////
  /*  app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');*/
  /*app.use(expressSession({
    store: mySessionStore,
    secret: 'session_secret',
    key: 'express.sid',
    saveUninitialized: true,
    resave: true,
  }));*/
  //  console.log(sessionStore);
  app.use(headers);
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));
  initPassport(passport);
  var isAuthenticated=cerberus(passport);
  app.use(passport.initialize()); //para passport
  app.use(passport.session()); //para passport
  app.use(flash());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public'))); //directorio publico
  ////////////////////////////////////////////////////////////////////////////////////
  //routes////////////////////////////////////////////////////////////////////////////
  // Initialize Passport
  app.use('/', passportRouter(passport)); //indice de rutas aca va socket y passport
  app.use('/users', isAuthenticated, usersRouter); //rutas del usuario
  app.use('/palabras', palabrasRouter); //rutas de la api para agregar y consumir palabras
  app.use('/juego', isAuthenticated,juegoRouter); //rutas de la api del juego??
  app.use('/socket', socketRouter);

  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////
}
