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
  let sal = salas.filter(s => s.sala == sala);
  if(!sal) {
    var salaNueva = {
      creador: creador,
      sala: sala,
      clientes: clientes || [],
      tipo: tipo
    }
    salas.push(salaNueva);
    console.log('Agrege sala: ', salaNueva);
    return salaNueva;
  } else {
    console.log('Ya existe sala: '+ sal);
    return sal;
  }
};
/////////////////////////////////////////////////////////////////////////
exports.agregarASala = (sala, cliente) => {
  let sal = salas.filter(s => s.sala == sala);
  if(sal) {
    let cli = sal.clientes.filter(c => c.id == cliente.usuario._id)[0];
    if(!cli) {
      console.log('Agrege a sala: ', sala);
      sal.clientes.push(cliente);
      return cliente;
    } else {
      console.log('Ya estaba en sala!');
      return cli;
    }
  }
  return false;
}
/////////////////////////////////////////////////////////////////////////
exports.eliminarSala = (sala) => {
  let sal = salas.filter(s => s.sala == sala);
  if(sal) {
    sal.clientes.forEach((cli) => {
      cli.socketClient.leave(sala);
      console.log('Desconecte de sala: ', cli.socketClient);
    });
    index = salas.indexOf(sala);
    console.log('Econtre sala: ', sala, ' en el index: ', index);
    if(index > -1) {
      salas.splice(index, 1);
      console.log('Elimine la sala en el index: ', index);
      return true;
    }
  }
  return false;
}
/////////////////////////////////////////////////////////////////////////
exports.getClientesSala = (sala) => {
  let sal = salas.filter(s => s.sala == sala);
  if(sal && sal.clientes) {
    console.log('Encontre sala: ', sala, ' clientes en sala: ', sal.clientes);
    return sal.clientes;
  } else return null;
}
/////////////////////////////////////////////////////////////////////////
exports.getCLienteEnSala = (username) => {
  let sal = salas.filter(sal => sal.clientes.find(cli => cli.usuario.username == username))[0];
  return sal;
}
/////////////////////////////////////////////////////////////////////////
exports.sacarDeSala = (username) => {
  let sal = salas.filter(sal => sal.clientes.find(cli => cli.usuario.username == username))[0];
  if(sal) {
    console.log('Encontre sala!');
    console.log('Saco cliente: ' + username);
    let index = sal.clientes.indexOf(username);
    return sal.clientes.splice(index, 1);
  }
  return null;
}
/////////////////////////////////////////////////////////////////////////
exports.getSala = (sala) => salas.filter(sal => sal.sala = sala)[0];
