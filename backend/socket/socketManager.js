var Usuarios = require('../models/usuario.modelo');
module.exports = (server) => {
  jwtSecret = require('../passport/jwtConfig');
  var socketIo = require('socket.io')(server);
  var socketSJWT = require('./jwt-seguridad/socket.validacion.SJWT');
  //let socketClientes = require('./socket.clientes');
  let socketEnEspera = require('./juego-socket/socket.enEspera');
  let socketSalasJuego = require('./juego-socket/socket.salas');
  let mannagerJuego = require('./juego-socket/socket.juego');
  let socketClientesJuego = require('./juego-socket/socket.clientes');
  let mannagerChat = require('./chat-socket/socket.chat');
  let socketEnEsperaChat = require('./chat-socket/socket.enEspera');
  let socketClienteschat = require('./chat-socket/socket.cliente');
  let socketSalasChat=require('./chat-socket/socket.salas');
  socketSalasJuego.funcionInit();
  socketEnEspera.funcionInit();
  socketEnEsperaChat.funcionInit();
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
      mannagerJuego(socket, socketClientesJuego, socketEnEspera, socketSalasJuego);
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
    mannagerChat(socket, socketEnEsperaChat, socketClienteschat, socketSalasChat)
  });
};
