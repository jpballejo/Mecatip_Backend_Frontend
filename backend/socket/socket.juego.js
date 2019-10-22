module.exports = (juego, socketClientes, socketEnEspera, socketSalas) => {

  juego.on('desafiar', (socket, usuariosDesafiados) => {
    enEspera.ponerEnEspera(socket.decoded_token.username, usuariosDesafiados);
    desafiar(socket.decoded_token.username, usuariosDesafiados);
    socketEnEspera.enEsperaDeSala(socket.decoded_token.username);
  })
  desafiar = (uRetador, usuariosDesafiados) => {
    usuariosDesafiados.forEach((username) => {
      socketClientes.getClienteUsername(username).socketClient.emit('teDesafio', uRetador);
    })
  };
  juego.on('aceptoDesafio', (socket, uRetador) => {
    contendiente = socket.decoded_token.username;
    if(socketEnEspera.sacarDeEspera(uRetador, contendiente)) {
      socketEnEspera.sacarDeEspera(uRetador, socket.decoded_token.username);
      socketEnEspera.meterAEsperarSala(uRetador, socket.decoded_token.username);
      aceptoDesafio(uRetador, socket.decoded_token.username);
    }
  });
  var aceptoDesafio = (retador, contendiente) => {
    clienteR = socketClientes.getClienteUsername(retador);
    clienteR.socketClient.emit('aceptoDes', {
      contendiente: contendiente,
      faltan: `${socketEnEspera.restantesEnEspera(retador)}`
    });
  }
  juego.on('declinarDesafio', (socket, uRetador) => {
    socketEnEspera.sacarDeEspera(uRetador, socket.decoded_token.username);
    declinoDesafio(uRetador, socket.decoded_token.username);
  });
  var declinoDesafio = (retador, contendiente) => {
    clienteR = socketClientes.getClienteUsername(retador);
    clienteR.socketClient.emit('declinoDes', {
      contendiente: contendiente,
      faltan: `${socketEnEspera.restantesEnEspera(retador)}`
    });
  }
  juego.on('armarPartida', (idPartida, clientes, socket) => {
    clientesSocket = socketClientes.armarClientesPartida(clientes);
    retadorSocket = socketClientes.getClienteSocket(socket);
    if(socketSalas.agregarASala(idPartida, clientesSocket, 'JUEGO', retadorSocket)) {
      emparejarEnRoom(idPartida, clientesSocket, retadorSocket);
    }
  });
  var emparejarEnRoom = (idPartida, clientesSocket, retadorSocket) => {
    clientesSocket.forEach((cliente) => {
      cliente.socketClient.join(idPartida, () => {
        juego.to(idPartida).emit('seConecto', cliente.usuario.username);
      });
    });
    retadorSocket.socketClient.join(idPartida, () => {
      juego.to(idPartida).emit('seConecto ', retadorSocket.usuario.username);
    });
  }
  juego.on('finPartida', (idPartida) => {
    desemparejarDeRoom(idPartida);
    socketSalas.eliminarSala(idPartida);
  });
  var desemparejarDeRoom = (salaAlimpiar) => {
    salaAlimpiar.clientes.forEach((cliente) => {
      cliente.socketClient.emit('terminado');
      cliente.socketClient.leave(idPartida);
    });
    salaAlimpiar.creador.socketClient.leave(idPartida);
  }
}
