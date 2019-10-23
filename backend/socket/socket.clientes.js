console.log('Socket-Clientes cargado...');
exports.funcionInit = () => {
  console.log('socket-clientes inicio');
}
usuarios = [];
/////////////////////////////////////////////////////////////////////////
exports.agregarCliente = (socket, user) => {
  if(!usuarios[user.username]) {
    var cliente = {
      socketId: socket.id,
      socketClient: socket,
      usuario: user
    }
    usuarios[`${user.username}`] = cliente;
    console.log('Agrege cliente: ', user, 'Cliente socketId: ', socket.id);
    return true;
  } else {
    if(usuarios[user.username]) {
      if(usuarios[user.username].socketClient != socket || usuarios[user.username].socketClient == null) {
        console.log('encontre cliente ya en session: ', user.username);
        usuarios[user.username].socketClient = socket;
        console.log('Actualize socket: ', socket.id);
        usuarios[user.username].socketId = socket.id;
        return true;
      }
    }
  }
  return false;
};
/////////////////////////////////////////////////////////////////////////
exports.desconectarCliente = (username) => {
  if(usuarios[username]) {
    console.log('Encontre cliente...');
    usuarios[`${username}`].socketClient = null;
    console.log('Limpie socketClient');
    usuarios[`${username}`].socketId = null;
    console.log('Limpie socketId');
    return true;
  } else return false;
};
/////////////////////////////////////////////////////////////////////////
exports.getClienteUsername = (username) => {
  if(usuarios[username]) {
    console.log('Encontre: ', username);
    return usuarios[username];
  } else {
    return;
  }
};
/////////////////////////////////////////////////////////////////////////
exports.getClienteSocket = (socket) => {
  return usuarios.forEach((cliente) => {
    if(cliente.socketId == socket.id) {
      console.log('Encontre socket: ', socket.id);
      return cliente;
    }
  })
}
/////////////////////////////////////////////////////////////////////////
exports.armarClientesPartida = (clientesU) => {
  clientes = [];
  if(clienteU.length > -1) {
    clientesU.forEach((cliente) => {
      if(usuarios[`${cliente}`]) {
        this.clientes[`${cliente}`] = usuarios[`${cliente}`];
      }
    });
  }
  return clientes;
};
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
