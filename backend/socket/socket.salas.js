console.log('Socket-salas cargado...');
exports.funcionInit = () => console.log('socket-salas inicio');
salas = [];
validaArray = (array) => {
  if(array != null) {
    return array.length > -1;
  }
  return false;
}
////////////////////////////////////////////////////////////////////////////
exports.agregarSala = (sala, clientes, tipo, creador) => {
  if(!this.salas[`${sala}`]) {
    var salaNueva = {}
    if(validaArray(clientes)) {
      salaNueva = {
        creador: creador,
        sala: sala,
        clientes: clientes,
        tipo: tipo
      };
    } else {
      salaNueva = {
        creador: creador,
        sala: sala,
        clientes: [],
        tipo: tipo
      };
    }
    this.salas[`${sala}`] = salaNueva;
    console.log('Agrege sala: ', sala);
    return salaNueva;
  } else {
    console.log('Ya existe!');
    return;
  }
};
/////////////////////////////////////////////////////////////////////////
exports.agregarASala = (sala, cliente) => {
  if(this.salas[`${sala}`]) {
    if(!this.salas[`${sala}`].clientes[`${cliente.usuario.username}`]) {
      console.log('Agrege a sala: ', sala);
      this.salas[`${sala}`].clientes[`${cliente.usuario.username}`] = cliente;
      return true;
    }
  }
  return false;
}
/////////////////////////////////////////////////////////////////////////
exports.eliminarSala = (sala) => {
  if(this.salas[`${sala}`]) {
    this.salas[`${sala}`].clientes.forEach((cli) => {
      cli.socketClient.leave(sala);
      console.log('Desconecte de sala: ', cli.socketClient.id);
    });
    index = this.salas.indexOf(sala);
    console.log('Econtre sala: ', sala, ' en el index: ', index);
    if(index > -1) {
      this.salas.splice(index, 1);
      console.log('Elimine la sala en el index: ', index);
      return true;
    }
  }
  return false;
}
/////////////////////////////////////////////////////////////////////////
exports.getClientesSala = (sala) => {
  if(this.salas[`${sala}`] && salas[`${sala}`].clientes) {
    console.log('Encontre sala: ', sala, ' clientes en sala: ', salas[`${sala}`].clientes);
    return this.salas[`${sala}`].clientes;
  } else return;
}
/////////////////////////////////////////////////////////////////////////
exports.getCLienteEnSala = (username) => {
  this.salas.forEach((salas) => {
    if(salas.clientes[`${username}`]) {
      console.log('Encontre sala: ', sala, ' cliente en sala: ', salas.clientes[`${username}`]);
      return salas.clientes[`${username}`];
    }
  })
}
/////////////////////////////////////////////////////////////////////////
exports.sacarDeSala = (username) => {
  return this.salas.forEach((salas) => {
    if(salas.clientes[`${username}`]) {
      salas.clientes[`${username}`].socketClient.leave(salas.sala);
      console.log('Desconecte cliente: ', username);
      index = salas.clientes.indexOf(`${username}`);
      return salas.clientes.splice(index, 1);
    }
  });
}
/////////////////////////////////////////////////////////////////////////
exports.getSala = (sala) => this.salas[`${sala}`];
