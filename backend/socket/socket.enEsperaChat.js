console.log('Socket-enEsperaChat cargado...');
exports.funcionInit = () => console.log('socket-enEsperaChat inicio');
aEspera = [];
exports.agregarAEspera = (userAuspiciante, usersInvitados) => {
  let esp = aEspera.filter(c => c.usuarioAuspiciante == userAuspiciante)[0];
  if(!esp) {
    aEspera.push({
      usuarioAuspiciante: userAuspiciante,
      invitados: usersInvitados || []
    });
    return true;
  } else return false;
};
exports.meterEnEspera = (userAuspiciante, username) => {
  let esp = aEspera.filter(c => c.usuarioAuspiciante == userAuspiciante)[0];
  if(esp) {
    if(!esp.invitados.includes(username)) {
      console.log('Agregue aEspera a: ' + username + ' el usuario: ' + userAuspiciante + 'Solicito espera');
      return esp.invitados.push(username);
    }
  }
};
exports.verificarEspera = (userAuspiciante, userInvitado) => {
  let esp = aEspera.filter(c => c.usuarioAuspiciante == userAuspiciante)[0];
  return esp.invitados.includes(userInvitado);
}
exports.sacarDeEspera = (userAuspiciante, userInvitado) => {
  let esp = aEspera.filter(c => c.usuarioAuspiciante == userAuspiciante)[0];
  index = esp.invitados.indexOf(userInvitado);
  if(index > -1) {
    console.log('Encontre en el Index: ', index, ' a: ', userInvitado);
    esp.invitados.splice(index, 1);
    console.log('Saque de espera al index: ', index, ' pertenecia al username: ', userInvitado);
    return true;
  }
}
