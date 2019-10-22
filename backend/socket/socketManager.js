var Usuarios = require('../models/usuario.modelo');
module.exports = (server) => {
  jwtSecret = require('../passport/jwtConfig');
  var socketIo = require('socket.io')(server);
  var socketSJWT = require('./socket.validacion.SJWT');
  let socketClientes = require('./socket.clientes');
  let socketEnEspera = require('./socket.enEspera');
  let socketSalas = require('./socket.salas');
  let mannagerJuego = require('./socket.juego');
  socketClientes.funcionInit();
  socketSalas.funcionInit();
  socketEnEspera.funcionInit();
  socketSJWT(socketIo, jwtSecret);
  const juego = socketIo.of('/juego');
  const chat = socketIo.of('/chat');
  //  var socketPJWT = require('./socket.validacion.PJWT');
  socketIo.on('connection', (socket) => {
    console.log('hello! ', socket.decoded_token.username);
    if(socket.decoded_token.username) {
      Usuarios.findOne({
        username: socket.decoded_token.username
      }, (err, user) => {
        if(err) return console.log(err);
        if(user) {
          socketClientes.agregarCliente(socket, user);
          socketIo.sockets.emit('usuario_online', {
            usuario: user.username
          });
        }
      });
      socket.on('disconnect', () => socketClientes.desconectarCliente(socket.decoded_token.username));
    }
  });
  juego.on('connection', (socket) => {
    console.log('hello! ', socket.decoded_token.username);
    if(socket.decoded_token.username) {
      Usuarios.findOne({
        username: socket.decoded_token.username
      }, (err, user) => {
        if(err) return console.log(err);
        if(user) {
          socketClientes.agregarCliente(socket, user);
          juego.sockets.emit('usuario_online', {
            usuario: user.username
          });
        }
      });
      socket.on('disconnect', () => socketClientes.desconectarCliente(socket.decoded_token.username));
    }
  });
  chat.on('connection', (socket) => {
    console.log('hello! ', socket.decoded_token.username);
    if(socket.decoded_token.username) {
      Usuarios.findOne({
        username: socket.decoded_token.username
      }, (err, user) => {
        if(err) return console.log(err);
        if(user) {
          socketClientes.agregarCliente(socket, user);
          chat.sockets.emit('usuario_online', {
            usuario: user.username
          });
        }
      });
      socket.on('disconnect', () => socketClientes.desconectarCliente(socket.decoded_token.username));
    }
  });
  mannagerJuego(juego, socketClientes, socketEnEspera, socketSalas);
};
