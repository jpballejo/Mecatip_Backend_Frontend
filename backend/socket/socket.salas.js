console.log('Socket-salas cargado...');
exports.funcionInit = () => console.log('socket-salas inicio');
salas = [];
////////////////////////////////////////////////////////////////////////////
exports.agregarSala = (idSala, clientes, tipo, creador) => {
  console.log('agregarSala');
  console.log('Sala: ', idSala);
  console.log('salas', salas.length);
  let sal = salas.filter(s => s.sala == idSala)[0]
  if(!sal) {
    let salaNueva = {
      creador: creador,
      sala: idSala,
      clientes: clientes,
      tipo: tipo
    }
    salas.push(salaNueva);
    console.log('Agrego a salas? ', salas.length);
    console.log('Agrege sala: ', salaNueva);
    return salaNueva;
  } else {
    console.log('Ya existe sala: ' + sal);
    return sal;
  }
};
/////////////////////////////////////////////////////////////////////////
exports.agregarASala = (sala, cliente) => {
  let sal = salas.filter(s => s.sala == sala);
  if(sal) {
    console.log('sala');
    console.log(sal);
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
exports.eliminarSala = (sala) => salas = salas.filter(u => u.sala != sala);
/////////////////////////////////////////////////////////////////////////
exports.getClientesSala = (sala) => {
  let sal = salas.filter(s => s.sala == sala)[0];
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
/////////////////////////////////////////////////////////////////////////
exports.getCLiente = (idSala, username) => {
  let sal = salas.filter(sal => sal.sala = idSala)[0];
  if(sal) {
    let cli = sal.clientes.filter(c => c.ususario.username == username)[0]
    if(cli) return cli;
  }
  return null;
}
/////////////////////////////////////////////////////////////////////////
exports.getSalas = () => salas.map(s => s);
/////////////////////////////////////////////////////////////////////////
