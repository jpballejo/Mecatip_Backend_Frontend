console.log('Socket-enEspera cargado...');
exports.funcionInit = () => console.log('socket-enEspera inicio');
enEspera = [];
enEsperaDeSala = [];
exports.ponerEnEspera = (userRetador, userContendientes) => {
  if(!enEspera.filter(u => u.retador == userRetador)[0]) {
    //  if(userContendientes.length > -1) {
    enEsp = {
      retador: userRetador,
      contendientes: userContendientes || []
    }
    enEspera.push(enEsp);
    console.log('En_espera: ' + userRetador + ' mando a: ' + userContendientes);
    return true;
    //  }
    /*if(userContendientes.length < -1) {
      enEsp = {
        retador: userRetador,
        contendientes: []
      }
      enEspera.push(enEsp);
      console.log('En espera creado sin userContendientes....');
      //    console.log('En_espera: ' + userRetador + ' mando a: ' + userContendientes);
      return true;
    }*/
  }
  return false;
};
exports.meterEnEspera = (userRetador, username) => {
  let espeRet = enEspera.filter(u => u.retador == userRetador)[0]
  if(espRet) {
    if(!espRet.contendientes.filter(u => u == username)[0]) {
    espRet.contendientes.push(username);
    console.log('En_espera: ' + userRetador + ' mando a: ' + username);
    return true;
  }
  return false;
}
};
exports.sacarDeEspera = (userRetador, username) => {
  let espeRet = enEspera.filter(u => u.retador == userRetador)[0];
  let index = espeRet.contendientes.indexOf(`${username}`);
  if(index > -1) {
    console.log('Encontre en el Index: ', index, ' a: ', username);
    espeRet.contendientes.splice(index, 1);
    console.log('Saque de espera al index: ', index, ' pertenecia al username: ', username);
    return true;
  }
  return false;
};
exports.sacarDeEsperaYPonerAesperarSalaArray = (userRetador, userContendientes) => {
  let espeRet = enEspera.filter(u => u.retador == userRetador)[0];
  if(espRet) {
    eliminarDeEspera(userRetador, userContendientes);
    meterEnEsperaDeSala(userRetador, userContendientes);
  }
};
var eliminarDeEspera = (userRetador, userContendientes) => {
  for(let i = 0; i <= userContendientes.length; i++) {
    console.log('elimine de espera: ' + userContendientes[i]);
    sacarDeEspera(userRetador, userContendientes[i]);
  }
}
var meterEnEsperaDeSala = (userRetador, userContendientes) => {
  let espSala = enEsperaDeSala.filter(u => u.retador)[0];
  if(espSala) {
    if(espSala.contendientes.length > -1) {
      for(let i = 0; i <= userContendientes.length; i++) {
        espSala.contendientes.push(userContendientes[i]);
        console.log('Meti a espera a: ' + userContendientes[i]);
      }
    } else {
      espSala.contendientes = userContendientes;
      console.log('Meti contendientes a espera de sala: ' + userContendientes);
    }
  } else {
    enEsperaDeSala.push({
      retador: userRetador,
      contendientes: userContendientes
    });
    console.log('Cree la nueva espera de sala y setee los contendientes!');
  }
}
exports.aEsperarSala = (userRetador) => {
  if(!enEsperaDeSala.filter(espS => espS.retador == userRetador)[0]) {
    enEsperaDeSala.push({
      retador: userRetador,
      contendientes: []
    });
    console.log('Agregue a espera!');
    return true;
  }
  return false;
};
exports.meterAEsperarSala = (userRetador, userContendiente) => {
  let espS = enEsperaDeSala.filter(esp => esp.retador == userRetador)[0];
  if(espS) {
    if(espS.contendientes.indexOf(`${userContendiente}`) <= -1) {
      return espS.contendientes.push(userContendiente);
    }
  }
};
exports.sacarDeEsperarSala = (userRetador, userContendiente) => {
  let espS = enEsperaDeSala.filter(esp => esp.retador == userRetador)[0];
  if(espS) {
    index = espS.contendientes.indexOf(`${userContendiente}`);
    return tespS.contendientes.splice(index, 1);
  }
  return;
};
exports.estaEsperandoSala = (username) => {
  return enEsperaDeSala.filter(salas => salas.contendientes.filter(u => u == username)[0])[0];
};
exports.restantesEnEspera = (retador) => {
  let espS = enEspera.filter(esp => esp.retador == userRetador)[0];
  return espS.contendientes.length;
}
