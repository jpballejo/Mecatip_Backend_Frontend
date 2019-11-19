module.exports = (juego, socketClientes, socketEnEspera, socketSalas) => {
  juego.on('recibo', (data) => {
    juego.emit('devuelvo', {
      data: data
    });
  });
  ////////////////////**************************-----------------------////////////////////////////////////////////////
  juego.on('desafiar', (usuariosDesafiados) => {
    console.log('desafiar');
    if(usuariosDesafiados) {
      let uDes = Array.of(usuariosDesafiados);
      socketEnEspera.ponerEnEspera(juego.decoded_token.username, uDes);
      desafiar(juego.decoded_token.username, usuariosDesafiados);
      socketEnEspera.aEsperarSala(juego.decoded_token.username);
    } else console.log('USUARIOSDESAFIADOS NULL');
  })
  desafiar = (uRetador, usuariosDesafiados) => {
    usuariosDesafiados.forEach((username) => {
      socketClientes.getClienteUsername(username).socketClient.emit('teDesafio', uRetador);
    });
  };
  ////////////////////**************************-----------------------////////////////////////////////////////////////
  juego.on('aceptoDesafio', (uRetador) => {
    console.log('aceptoDesafio');
    if(uRetador) {
      contendiente = juego.decoded_token.username;
      if(socketEnEspera.verificarEspera(uRetador, contendiente)) {
        socketEnEspera.sacarDeEspera(uRetador, contendiente);
        socketEnEspera.meterAEsperarSala(uRetador, contendiente);
        aceptoDesafio(uRetador, contendiente);
      }
    } else console.log('URETADOR NULL');
  });
  ////////////////////**************************-----------------------////////////////////////////////////////////////
  var aceptoDesafio = (retador, contendiente) => {
    clienteR = socketClientes.getClienteUsername(retador);
    let acept = {
      contendiente: contendiente,
      faltan: socketEnEspera.restantesEnEspera(retador)
    };
    console.log(acept);
    clienteR.socketClient.emit('aceptoDes', {
      acept
    });
  }
  ////////////////////**************************-----------------------////////////////////////////////////////////////
  juego.on('declinarDesafio', (uRetador) => {
    console.log('declinarDesafio ');
    if(uRetador) {
      contendiente = juego.decoded_token.username;
      console.log('Retador:  ', uRetador);
      contendiente = juego.decoded_token.username;
      if(socketEnEspera.verificarEspera(uRetador, contendiente)) {
        socketEnEspera.sacarDeEspera(uRetador, contendiente);
        declinoDesafio(uRetador.uRetador, contendiente);
      }
    } else console.log('URETADOR NULL');
  });
  ////////////////////**************************-----------------------////////////////////////////////////////////////
  var declinoDesafio = (retador, contendiente) => {
    clienteR = socketClientes.getClienteUsername(retador);
    if(clienteR) {
      let restantes = socketEnEspera.restantesEnEspera(retador);
      clienteR.socketClient.emit('declinoDes', {
        contendiente: contendiente,
        faltan: restantes
      });
    }
  }
  ////////////////////**************************-----------------------////////////////////////////////////////////////
  juego.on('armarPartida', (idPartida) => {
    console.log('armarPartida');
    if(idPartida) {
      let retador = juego.decoded_token.username;
      console.log('idPartida: ', idPartida.idPartida);
      clientes = socketEnEspera.getJugadoresEnEsperaDeSala(retador);
      console.log('clientes', clientes);
      if(clientes) {
        clientesSocket = socketClientes.armarClientesPartida(clientes);
        retadorSocket = socketClientes.getClienteUsername(retador);
        console.log('RETADOR SOCKET', retadorSocket);
        console.log('infoClientesSocket: ', clientesSocket.length);
        socketSalas.agregarSala(idPartida.idPartida, clientesSocket, 'JUEGO', retadorSocket);
      } else console.log('IDPARTIDA NULL');
    }
  });
  ////////////////////**************************-----------------------////////////////////////////////////////////////
  var emparejarEnRoom = (idPartida, clientesSocket, retadorSocket) => {
    clientesSocket.forEach((cliente) => {
      cliente.socketClient.join(idPartida, () => {
        let rooms = Object.keys(cliente.socketClient.rooms);
        console.log(rooms.map(u => u));
        juego.to(idPartida).emit('seConecto', cliente.usuario.username);
      });
    });
    retadorSocket.socketClient.join(idPartida, () => {
      juego.to(idPartida).emit('seConecto ', retadorSocket.usuario.username);
    });
  }
  ////////////////////**************************-----------------------////////////////////////////////////////////////
  var desemparejarDeRoom = (salaAlimpiar) => {
    salaAlimpiar.clientes.forEach((cliente) => {
      cliente.socketClient.emit('terminado', {
        data: 'ok'
      });
      cliente.socketClient.leave(idPartida);
    });
    salaAlimpiar.creador.socketClient.leave(idPartida);
  }
  ////////////////////**************************-----------------------////////////////////////////////////////////////
  ///////////////////////////////////////EMITIR-------------------************/////////
  let emitir = (idSala, evento, data, username, emisor) => {
    console.log('emitir evento: ', evento);
    let sal = socketSalas.getSala(idSala);
    console.log('emitir sala: ', sal);
    console.log('emitir emisor: ', emisor);
    console.log('emitir data que viene: ', data);
    dt = {
      usernameEmisor: emisor,
      data: data,
      idPartida: idSala
    }
    console.log('emitir data formateada: ');
    if(!username) {
      console.log('emitir No tiene username! ');
      if(sal) {
        console.log('emitir Encontre sala!');
        sal.clientes.forEach((cli) => {
          cli.socketClient.emit(evento, dt)
          console.log('emitir Emiti al cliente: ', cli.id);
        });
        sal.creador.socketClient.emit(evento, dt);
      }
    } else {
      console.log('emitir tiene username!');
      if(sal) {
        console.log('emitir Encontre sala!');
        let cli = sal.clientes.filter(c.cliente.username == username)[0]
        if(cli) {
          cli.socketClient.emit(evento, dt);
          console.log('emitir Emiti al cliente: ', cli.id);
        }
        sal.creador.socketClient.emit(evento, dt);
      }
    }
  }
  ///////-----------------------------------***************************//////
  ///////////////////////////////////FUNCIONES///////////////////////////////
  //GENERICA
  juego.on('generica', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('generica');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'generica', data.data, data.username, emisor);
  });
  //GENERICA
  ///////-----------------------------------***************************//////
  juego.on('empezar', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('empezar');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'empezar', data.data, data.username, emisor);
  });
  ///////-----------------------------------***************************//////
  juego.on('finPartida', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('finPartida');
    console.log('DATA: ', data);
    if(data.idPartida) {
      emitir(data.idPartida, 'terminar', data.data, data.username, emisor);
      socketSalas.eliminarSala(data.idPartida);
    } else console.log('IDPARTIDA NULL');
  });
  ///////-----------------------------------***************************//////
  juego.on('palabrasPartida', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('palabrasParaPartida');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'palabrasParaPartida', data.data, null, emisor);
  });
  ///////-----------------------------------***************************//////
  juego.on('idPartida', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('idPartida');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'idPart', data.data, null, emisor);
  });
  ///////-----------------------------------***************************//////
  juego.on('comenzar', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('comenzar');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'comienza', data.data, null, emisor);
  });
  ///////-----------------------------------***************************//////
  juego.on('GO', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('GO');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'GOO', data.data, null, emisor);
  })
  ///////-----------------------------------***************************//////
  juego.on('goo', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('goo');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'gooo', data.data, null, emisor);
  })
  ///////-----------------------------------***************************//////
  juego.on('cambioPalabra', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('cambioPalabra');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'cambiarPalabra', data.data, null, emisor);
  })
  ///////-----------------------------------***************************//////
  juego.on('resultadoFinal', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('resultadoFinal');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'resultadoJugador', data.data, null, emisor);
  })
  ///////-----------------------------------***************************//////
  juego.on('dificultad', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('dificultad');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'dificil', data.data, null, emisor);
  })
  ///////-----------------------------------***************************//////
  juego.on('contrincantes', (data) => {
    let emisor = juego.decoded_token.username;
    console.log('dificultad');
    console.log('DATA: ', data);
    emitir(data.idPartida, 'contrincantesPartida', data.data, null, emisor);
  })
  ///////-----------------------------------***************************//////
}
