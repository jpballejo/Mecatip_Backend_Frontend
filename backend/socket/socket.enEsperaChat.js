console.log('Socket-enEsperaChat cargado...');
exports.funcionInit = () => console.log('socket-enEsperaChat inicio');
aEspera = [];

exports.agregarAEspera = (userAuspiciante, usersInvitados) => {
  if(!aEspera[`${userAuspiciante}`]) {
    chatEspera = {};
    if(usersInvitados.length > -1) {
      console.log('Hay invitados!');
      chatEspera = {
        usuarioAuspiciante: userAuspiciante,
        invitados: usersInvitados
      }
      this.aEspera[`${userAuspiciante}`] = chatEspera;
      return true;
    }
    if(usersInvitados.length < -1) {
      console.log('No hay invitados!');
      chatEspera = {
        usuarioAuspiciante: userAuspiciante,
        invitados: []
      }
      this.aEspera[`${userAuspiciante}`] = chatEspera;
      return true;
    }
  } else return false;
};
exports.meterEnEspera = (userAuspiciante, username) => {
  if(this.aEspera[`${userAuspiciante}`]) {
    if(!this.verificarEspera(userAuspiciante, username)) {
      this.aEspera[`${userAuspiciante}`].invitados.push(username);
      console.log('En_espera: ' + userAuspiciante + ' mando a: ' + username);
      return true;
    }
    return false;
  }
};
exports.verificarEspera = (userAuspiciante, userInvitado) => {
  return this.aEspera[`${userAuspiciante}`].invitados.forEach((user) => {
    if(user == userInvitado) return user;
  });
}
exports.sacarDeEspera = (userAuspiciante, userInvitado) => {
  index = this.aEspera[`${userAuspiciante}`].invitados
  if(index>-1){
    console.log('Encontre en el Index: ', index, ' a: ', userInvitado);
    this.aEspera[`${userAuspiciante}`].invitados.splice(index,1);
    console.log('Saque de espera al index: ', index, ' pertenecia al username: ', userInvitado);
    return true;
  }
}
