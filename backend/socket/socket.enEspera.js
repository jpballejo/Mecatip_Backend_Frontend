console.log('Socket-enEspera cargado...');
exports.funcionInit = () => console.log('socket-enEspera inicio');
enEspera = [];
enEsperaDeSala = [];
exports.ponerEnEspera = (userRetador, userContendientes) => {
  if(!this.enEspera[`${userRetador}`]) {
    if(userContendientes.length > -1) {
      enEsp = {
        retador: userRetador,
        contendientes: userContendientes
      }
      this.enEspera[`${userRetador}`] = enEsp;
      console.log('En_espera: ' + userRetador + ' mando a: ' + userContendientes);
      return true;
    }
    if(userContendientes.length < -1) {
      enEsp = {
        retador: userRetador,
        contendientes: []
      }
      this.enEspera[`${userRetador}`] = enEsp;
      console.log('En espera creado sin userContendientes....');
      //    console.log('En_espera: ' + userRetador + ' mando a: ' + userContendientes);
      return true;
    }
  }
  return false;
};
exports.meterEnEspera = (userRetador, username) => {
  if(this.enEspera[`${userRetador}`]) {
    if(!this.verificarEspera(userRetador, username)) {
      this.enEspera[`${userRetador}`].contendientes.push(username);
      console.log('En_espera: ' + userRetador + ' mando a: ' + username);
      return true;
    }
    return false;
  }
};
exports.verificarEspera = (userRetador, username) => {
  return this.enEspera[`${userRetador}`].contendientes.forEach(
    (contendiente) => {
      if(contendiente == username) {
        console.log('Encontre: ', contendiente);
        return contendiente;
      }
    });
};
exports.sacarDeEspera = (userRetador, username) => {
  index = this.enEspera[`${userRetador}`].contendientes.indexOf(`${username}`);
  if(index > -1) {
    console.log('Encontre en el Index: ', index, ' a: ', username);
    this.enEspera[`${userRetador}`].contendientes.splice(index, 1);
    console.log('Saque de espera al index: ', index, ' pertenecia al username: ', username);
    return true;
  }
  return false;
};
exports.sacarDeEsperaYPonerAesperarSala = (userRetador, userContendiente) => {
  if(this.enEsperaDeSala[`${userRetador}`]) {
    this.sacarDeEspera(userRetador,userContendiente);
    this.enEsperaDeSala[`${userRetador}`].aSala.push(userContendiente);
    console.log('Saque de espera y puse a sala al jugador: ', userContendiente);
    return true;
  }
  return false;
};
exports.aEsperarSala = (userRetador) => {
  if(!this.enEsperaDeSala[`${userRetador}`]) {
    espSala = {
      retador: userRetador,
      contendientes: []
    }
    this.enEsperaDeSala[`${userRetador}`] = espSala;
    return true;
  }
  return false;
};
exports.meterAEsperarSala = (userRetador, userContendiente) => {
  if(this.enEsperaDeSala[`${userRetador}`]) {
    if(this.enEsperaDeSala[`${userRetador}`].contendientes.indexOf(`${userContendiente}`) <= -1) {
      return this.enEsperaDeSala[`${userRetador}`].contendientes.push(userContendiente);
    }
  }
};
exports.sacarDeEsperarSala = (userRetador, userContendiente) => {
  if(this.enEsperaDeSala[`${userRetador}`]) {
    index = this.enEsperaDeSala[`${userRetador}`].contendientes.indexOf(`${userContendiente}`);
    return this.enEsperaDeSala[`${userRetador}`].contendientes.splice(index, 1);
  }
  return;
};
exports.estaEsperandoSala = (username) => {
  return this.enEsperaDeSala.forEach((salas) => {
    salas.contendientes.forEach((contUser) => {
      if(contUser == username) return contUser;
    })
  })
};
exports.restantesEnEspera = (retador) => {
  if(this.enEspera[`${retador}`]) return enEspera[`${retador}`].contendientes.length;
}
