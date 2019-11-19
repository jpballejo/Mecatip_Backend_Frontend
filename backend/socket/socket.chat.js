module.exports = (chat, socketEnEsperaChat, socketClientes, socketSalas) => {
  var utilidades = require('../utilidades/util');
  var soketSalas = require('./socket.salas');

  salasChat = [];
  var notificarSalaDeChat = (usuarios, userAuspiciante) => {}
  usuarios.forEach((user) => {
//    socketEnEsperaChat.getClienteUsername(user).socketClient.emit('invChat', userAuspiciante);
  });
 
  //***************************************************************************//
  
  
  
 chat.on('msgnew', (msg, sala, socket) => {
    console.log("entra on msgnew");
    console.log(Object.values(sala)[0]);
    var nSala= Object.values(sala)[0];

    console.log(salasChat);
     let salA = soketSalas.getSalaPorNombre(nSala);


    console.log("sala en sistema",salA);
    console.log(msg.msg);
    
    salA.mensajes.push(msg.msg); 
    console.log(salasChat);
   
    socketClientes.getClientesOnlineUsuario().forEach((user) => user.socketClient.emit('nuevosMsj',{msg: msg.msg, sala: nSala}));
//    if(sala.sala == 'GENERAL') {
 //     chat.emit('msg', {
  //      emisor: socket.decoded_token.username,
   //     mensaje: msg
    //  });
   // }
   // if(existeSala(sala)) {
     // chat.to(sala).emit('msg', {
     //   emisor: socket.decoded_token.username,
     //   mensaje: msg
     // });
   // }
  });


  chat.on('typing', (socket, sala) => {
    if(sala == 'GENERAL') {
      chat.broadcast.emit('typing', {
        username: socket.decoded_token.username
      });
    }
    if(existeSala(sala)) {
      chat.to(sala).emit('typing', {
        username: socket.decoded_token.username
      });
    }
  });
  // when the client emits 'stop typing', we broadcast it to others
  chat.on('stop typing', (socket) => {
    if(sala == 'GENERAL') {
      chat.broadcast.emit('stop typing', {
        username: socket.decoded_token.username
      });
    }
    if(existeSala(sala)) {
      chat.to(sala).emit('stop typing', {
        username: socket.decoded_token.username
      });
    }
  });
  chat.on('invitarSala', (usuarios, socket) => {
    this.socketEnEsperaChat.agregarAEspera(socket.decoded_token.username, usuarios);
    this.notificarSalaDeChat(usuarios, socket.decoded_token.username);
    this.crearSala(socket.decoded_token.username);
  });
  chat.on('aceptoChat', (socket, userAuspiciante) => {
    userResp = socket.decoded_token.username;
    if(this.socketEnEsperaChat.verificarEspera(userAuspiciante, userResp)) {
      this.socketEnEsperaChat.sacarDeEspera(userAuspiciante, userResp);
      var c = this.socketClient.getClienteUsername(userResp);
      var sala = this.getSala(userAuspiciante);
      this.socketSalas.agregarASala(sala, c);
      this.conectarASala(userResp, sala);
    }
  });
  chat.on('rechazoChat', (socket, userAuspiciante) => {
    userResp = socket.decoded_token.username;
    if(this.socketEnEsperaChat.verificarEspera(userAuspiciante, userResp)) {
      this.socketEnEsperaChat.sacarDeEspera(userAuspiciante, userResp);
      console.log('Rechazo chat: ', userResp);
    }
  });
  chat.on('limpiarSala', (socket, idSala) => {
    if(salasChat[`${idSala}`]) {
     socketSalas.eliminarSala(idSala);
    }
  });

 chat.on('crearSala', (userCreador) => {
    console.log("llega3");
    console.log(userCreador.userCreator);
    soketSalas.crearSala(userCreador.userCreator);

    
  });
  
  chat.on('SalasTodas', () => {
    
    chat.emit('allSalas', {
      salasChat: soketSalas.salasChat
    });

   

    
  });





}
