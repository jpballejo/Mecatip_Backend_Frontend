module.exports = (io, jwtSecret) => {
  console.log('socketJWT cargado');
  var socketioJwt = require("socketio-jwt");
  io.use(socketioJwt.authorize({
    secret: jwtSecret.secret,
    handshake: true,
    auth_header_required: true
  }));
/*  io.on('connection', function(socket) {

    // in socket.io 1.0
    console.log('hello! ', socket.decoded_token.name);


  })*/

  /*io.sockets
  .on('connection', socketioJwt.authorize({
    secret: 'your secret or public key',
    timeout: 15000 // 15 seconds to send the authentication message
  }))
  .on('authenticated', (socket) => {
    //this socket is authenticated, we are good to handle more events from it.
    console.log(`hello! ${socket.decoded_token.name}`);
  });*/
};
