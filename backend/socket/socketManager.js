var Usuarios = require('../models/usuario.modelo');
module.exports = (server) => {
  jwtSecret = require('../passport/jwtConfig');
  var socketIo = require('socket.io')(server);
  var socketSJWT = require('./socket.validacion.SJWT');
  let socketClientes = require('./socket.clientes');
  let socketEnEspera = require('./socket.enEspera');
  let socketSalas = require('./socket.salas');
  let mannagerJuego = require('./socket.juego');
  let mannagerChat = require('./socket.chat');
  let socketEnEsperaChat = require('./socket.enEsperaChat');
  let socketClientesJuego = require('./socket.clientesJuego');
  let socketClienteschat = require('./socket.clienteChat');
  socketClientes.funcionInit();
  socketSalas.funcionInit();
  socketEnEspera.funcionInit();
  socketEnEsperaChat.funcionInit();
  //socketSJWT(socketIo, jwtSecret);
  const juego = socketIo.of('/juego');
  const chat = socketIo.of('/chat');
  socketSJWT(juego, jwtSecret);
  socketSJWT(chat, jwtSecret);
  juego.on('connection', (socket) => {
    console.log('hello juego! ', socket.decoded_token.username);
    if(socket.decoded_token.username) {
      Usuarios.findOne({
        username: socket.decoded_token.username
      }, (err, user) => {
        socketClientesJuego.agregarCliente(socket, user);
        juego.emit('listaUserUpdate', {
          usuariosOnline: socketClientesJuego.getClientesOnline()
        });
      });
      socket.on('disconnect', () => socketClientesJuego.desconectarCliente(socket.decoded_token.username));
      mannagerJuego(socket, socketClientesJuego, socketEnEspera, socketSalas);
    }
  });
  chat.on('connection', (socket) => {
    console.log('hello chat! ', socket.decoded_token.username);
    if(socket.decoded_token.username) {
      Usuarios.findOne({
        username: socket.decoded_token.username
      }, (err, user) => {
        socketClienteschat.agregarCliente(socket, user);
        chat.emit('listaUserUpdate', {
          usuariosOnline: socketClienteschat.getClientesOnline()
        });
      });
      socket.on('disconnect', () => {
        socketClienteschat.desconectarCliente(socket.decoded_token.username)
      });
    }
    mannagerChat(socket, socketEnEsperaChat, socketClienteschat, socketSalas)
  });
};
