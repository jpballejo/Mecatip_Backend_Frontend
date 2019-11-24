var socketClientes = require('./socket.cliente');
var salasChat = [];
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
