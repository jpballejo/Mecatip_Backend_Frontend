console.log('Socket-salas cargado...');
exports.funcionInit = () => console.log('socket-salas inicio');
salas = [];
validaArray = (array) => array.length > -1;
////////////////////////////////////////////////////////////////////////////
exports.agregarSala = (sala, clientes, tipo, creador) => {
  if(!salas[`${sala}`]) {
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
    salas[`${sala}`] = salaNueva;
    console.log('Agrege sala: ', sala);
    return salaNueva;
  } else {
    console.log('Ya existe!');
    return;
  }
};
/////////////////////////////////////////////////////////////////////////
exports.agregarASala = (sala, cliente) => {
  if(salas[`${sala}`]) {
    if(!salas[`${sala}`].clientes[`${cliente.usuario.username}`]) {
      console.log('Agrege a sala: ', sala);
      salas[`${sala}`].clientes[`${cliente.usuario.username}`] = cliente;
      return true;
    }
  }
  return false;
}
/////////////////////////////////////////////////////////////////////////
exports.eliminarSala = (sala) => {
  if(salas[`${sala}`]) {
    index = salas.indexOf(sala);
    console.log('Econtre sala: ', sala, ' en el index: ', index);
    if(indez > -1) {
      salas.splice(index, 1);
      console.log('Elimine la sala en el index: ', index);
      return true;
    }
  }
  return false;
}
/////////////////////////////////////////////////////////////////////////
exports.getClientesSala = (sala) => {
  if(salas[`${sala}`] && salas[`${sala}`].clientes) {
    console.log('Encontre sala: ', sala, ' clientes en sala: ', salas[`${sala}`].clientes);
    return salas[`${sala}`].clientes;
  } else return;
}
/////////////////////////////////////////////////////////////////////////
exports.getCLienteEnSala = (username) => {
  salas.forEach((salas) => {
    if(salas.clientes[`${username}`]) {
      console.log('Encontre sala: ', sala, ' cliente en sala: ', salas.clientes[`${username}`]);
      return salas.clientes[`${username}`];
    }
  })
}
/////////////////////////////////////////////////////////////////////////
exports.sacarDeSala = (username) => {
  return salas.forEach((salas) => {
    if(salas.clientes[`${username}`]) {
      index = salas.clientes.indexOf(`${username}`);
      return salas.clientes.splice(index, 1);
    }
  });
}
/////////////////////////////////////////////////////////////////////////
exports.getSala = (sala) => salas[`${sala}`];
