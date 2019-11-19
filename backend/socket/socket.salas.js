console.log('Socket-salas cargado...');
exports.funcionInit = () => console.log('socket-salas inicio');

var socketClientes = require('./socket.clientes');
var salasChat = [];
validaArray = (array) => {
  if(array != null) {
    return array.length > -1;
  }
  return false;
}
////////////////////////////////////////////////////////////////////////////
/*exports.agregarSala = (sala, clientes, tipo, creador) => {
  let sal = salas.filter(s => s.sala == sala);
  if(sal) {
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


*/
exports.getSalas = () => {  
  
 return salasChat;

};


//////////////////////////////////////////////////////
exports.crearSala = (userCreador) => {
  console.log("llega4");
  var idSala = utilidades.generarID('Chat');
  console.log(idSala);
  //this.agregarSala(idSala, null, 'CHAT', userCreador);
  //this.conectarASala(userCreador, idSala);
  this.guardarSala(idSala, userCreador);



}
exports.conectarASala = (user, sala) => {
  console.log("usuario",user);
  socketClientes.getClienteUsername(user).socketClient.join(sala, () => {
    chat.to(sala).emit('seConecto', user);
  });
}


exports.getSalass = () => salasChat.map(s=>s);


exports.getSalaPorNombre =(nSala)=>{
  return salasChat.find(salA => salA.sala == nSala);
}

exports.guardarSala = (idSala, userAuspiciante) => {

  let salass=salasChat.filter(s => s.idSala == idSala)[0];
  console.log(salass);
  if(!salass) {
    salasChat.push({
      sala: idSala,
      creador: userAuspiciante,
      //clientes: clientes,
      mensajes: ["Bienvenidos a la sala: "+`${idSala}`]
    }); 
    console.log(salasChat);
    var salA= salasChat.find(salA => salA.sala == idSala)
  

    socketClientes.getClientesOnlineUsuario().forEach((user) => user.socketClient.emit('darSalas',salA));

  }

};
exports.getSala = (userCreador) => {
  return salasChat.forEach((sala) => {
    if(sala.creador == userCreador) return sala.sala;
  })
}
exports.existeSala = (sala) => salasChat[sala];
exports.getCreador = (idSala) => salasChat[idSala].creador;