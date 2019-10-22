module.exports = (chat, enEspera, socketClientes, socketSalas) => {
  chat.on('msgnew', (msg, socket) => {
    chat.emit('msg', {
      emisor: socket.decoded_token.username,
      mensaje: msg
    });
  });
  chat.on('typing', (socket) => {
    chat.broadcast.emit('typing', {
      username: socket.decoded_token.username
    });
  });
  // when the client emits 'stop typing', we broadcast it to others
  chat.on('stop typing', (socket) => {
    chat.broadcast.emit('stop typing', {
      username: socket.decoded_token.username
    });
  });
  chat.on('crearSala', (usuarios, socket) => {
    clientesSocket = socketClientes.armarClientesPartida(usuarios);
    enEspera.ponerEnEspera(socket.decoded_token.username, usuarios);
    notificarSalaDeChat(usuarios, socket);
  })
}
