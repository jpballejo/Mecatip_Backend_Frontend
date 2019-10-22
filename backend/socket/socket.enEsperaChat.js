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
      aEspera[`${userAuspiciante}`] = chatEspera;
      return true;
    }
    if(usersInvitados.length < -1) {
      console.log('No hay invitados!');
      chatEspera = {
        usuarioAuspiciante: userAuspiciante,
        invitados: []
      }
      aEspera[`${userAuspiciante}`] = chatEspera;
      return true;
    }
  } else return false;
};

exports.meterEnEspera=(user)=>{}
