console.log('Socket-Clientes-juego cargado...');
exports.funcionInit = () => {
  console.log('socket-clientes inicio');
}
usuarios = [];
/////////////////////////////////////////////////////////////////////////
exports.agregarCliente = (socket, user) => {
  let _user = usuarios.filter(u => u.id == `${user._id}`)[0];
  if(!_user) {
    usuarios.push({
      id: user._id,
      socketClient: socket,
      usuario: user
    });
    console.log('Agrege cliente Juego: ' + user.username);
  //  console.log('usuarios',usuarios);
    return true;
  }
  usuarios = usuarios.map(u => (u.id == user.id) ? {
    id: user.id,
    socketClient: socket,
    usuario: user
  } : u)
  return true;
};
/////////////////////////////////////////////////////////////////////////
exports.desconectarCliente = (username) => usuarios = usuarios.filter(u => u.usuario.username != username);
/////////////////////////////////////////////////////////////////////////
exports.getClienteUsername = (username) => usuarios.filter(u => u.usuario.username == username)[0] || null;
/////////////////////////////////////////////////////////////////////////
exports.getClienteSocket = (socket) => usuarios.filter((cliente) => cliente.socketId == socket.id)[0] || {};
/////////////////////////////////////////////////////////////////////////
exports.armarClientesPartida = (clientesU) => usuarios.filter(usuario => !!clientesU.includes(usuario.usuario.username));
/////////////////////////////////////////////////////////////////////////
exports.getClientesOnline = () => usuarios.map((user) => user.usuario.username);
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
