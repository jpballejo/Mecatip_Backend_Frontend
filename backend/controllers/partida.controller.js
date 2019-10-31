////////////////////////////////imports
var Usuario = require('../models/usuario.modelo'); //importo el modelo
var Partida = require('../models/partida.modelo');
var InfoPartida = require('../models/infoPartida.modelo');
var Nivel = require('../models/nivel.model');
var utilidades = require('../utilidades/util');
//------------------------------------------------------------------------------//
/*
Controlador: Partida
created by: by Jp.
 */
//------------------------------------------------------------------------------//
//------------------------------------------------------------------------------//
//////////////////////FUNCIONES///////////////////////////////////////////////////
async function getUsuario(username_Email) {
  var result = Usuario.findOne({
    $or: [{
      email: username_Email
    }, {
      username: username_Email
    }]
  }, {
    isOcultar: false
  }, {}, (err, user) => {
    if(user) return user;
    if(err) {
      console.log(err);
    }
  });
  console.log('Este es el resulltado: ' + result);
  return result
};
var buscarPartida = async (idPartida) => {
  //console.log(idPartida);
  var result = Partida.findOne({
    idPartida: idPartida
  }, (err, partida) => {
    if(err) return err;
    if(!partida) return 'No se encontro ninguna partida con id: ', idPartida;
    if(partida) return partida;
  });
  console.log('Este es el resulltado: ' + result);
  return result;
}
var buscarYBorrarInfosPartidasAsociados = async (idPartida) => {}
var buscarYEliminarInfosPartidasAsociados = async (idPartida) => {}
//------------------------------------------------------------------------------//
////////////////////////////////////PARTIDA//////////////////////
////////////////////////////////////////////***altaPartida***//////////////////////////////////////////////////////
exports.altaPartida = (req, res, next) => {
  var idAuto = utilidades.generateID();
  var idPartida = 'Partida:_' + idAuto;
  var partidaNew = new Partida({
    idPartida: idPartida,
    tipoPartida: req.params.tipopartida
  });
  partidaNew.save((err, partida) => {
    if(err) return next(err);
    if(partida) {
      return res.json({
        'idPartida': partida.idPartida
      });
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***borrarPartidaById***//////////////////////////////////////////////////////
exports.borrarPartidaById = (req, res, next) => {
  var query = {
    idPartida: req.param.idPartida
  };
  Partida.where(query).update({
    isOcultar: true
  }).exec(() => {
    if(buscarYBorrarInfosPartidasAsociados(req.param.idPartida)) return res.send('ok')
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***eliminarPartidaById***//////////////////////////////////////////////////////
exports.eliminarPartidaById = (req, res, next) => {
  Partida.findOneAndDelete({
    idPartida: req.param.idPartida
  }, (err, partida) => {
    if(err) return next('Error eliminarPartidabyId:' + err);
    if(partida) {
      if(buscarYEliminarInfosPartidaAsociados(req.param.idPartida)) return res.json(partida);
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***getPartidaById***//////////////////////////////////////////////////////
exports.getPartidaById = (req, res, next) => {
  var query = {
    idPartida: req.idPartida
  };
  Partida.findOne(query, (err, partida) => {
    if(err) return next(err);
    if(!partida) {
      var idp = req.idPartida;
      return res.send('No se esncontro una partida con idPartida: ' + idp);
    }
    if(partida) {
      return res.json(partida);
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***getPartidas***//////////////////////////////////////////////////////
exports.getPartidas = (req, res, next) => {
  Partida.find({
    isOcultar: false
  }, (err, partidas) => {
    if(err) return next(err);
    if(!partidas) {
      return res.send('No se encontraron partidas.');
    }
    if(partidas) {
      return res.json(partidas);
    }
  })
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////INFOPARTIDA//////////////////////
////////////////////////////////////////////***crearInfoPartida***//////////////////////////////////////////////////////
exports.crearInfoPartida = async (req, res, next) => {
  var idAuto = utilidades.generateID();
  var idInfoPartida = 'InfoPartida:_' + `${req.user.username}` + '_' + idAuto;
  var infoPartida = new InfoPartida(req.body);
  infoPartida.idInfoPartida = idInfoPartida;
  infoPartida.contrincante = req.body.idJugador;
  infoPartida.idPartida = req.body.idPartida;
  infoPartida.save().then((infoPartida) => {
    if(infoPartida) {
      Usuario.findOne({
        username: `${req.user.username}`
      }, (err, user) => {
        if(err) return err;
        if(user) {
          console.log(infoPartida);
          user.infoPartidas.addToSet(infoPartida)
          user.save((err, user) => {
            if(err) return next(err);
            if(user) {
              return res.json(infoPartida);
            }
          });
        }
      });
    }
  });
  return;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***modificarInfoPartidaById***//////////////////////////////////////////////////////
exports.modificarInfoPartidaById = (req, res, next) => {
  var query = {
    idInfoPartida: req.idInfoPartida
  };
  InfoPartida.where(query).update(req.body).exec((infoPartida) => res.json(infoPartida));
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***borrarInfoPartidaById***//////////////////////////////////////////////////////
exports.borrarInfoPartidaById = (req, res, next) => {
  InfoPartida.where({
    idInfoPartida: req.idInfoPartida
  }).update({
    isOcultar: true
  }).exec((infoPartida) => res.json(infoPartida));
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***borrarInfoPartidaByIds***//////////////////////////////////////////////////////
exports.borrarInfosPartidaByIds = (req, res, next) => {
  return async () => {
    const result = await InfoPartida.updateMany({
      idInfoPartida: /req.body.idInfoPartida$/
    }, {
      isOcultar: true
    });
    return res.send(result.nModified);
  }
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***eliminarInfoPartidaById***//////////////////////////////////////////////////////
exports.eliminarInfoPartidaById = (req, res, next) => {
  InfoPartida.deleteOne({
    idInfoPartida: req.idInfoPartida
  }).then(() => res.send('Ok, eliminada...'));
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***eliminarInfosPartidaByIds***//////////////////////////////////////////////////////
exports.eliminarInfosPartidaByIds = (req, res, next) => {
  InfoPartida.deleteMany({
    idInfoPartida: /req.idInfoPartidas$/
  }).then(() => res.send('Ok, eliminadas...'));
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***getinfoPartidas***//////////////////////////////////////////////////////
exports.getinfoPartidas = (req, res, next) => {
  InfoPartida.find({}).where({
    isOcultar: false
  }).populate('partida').populate('usuario').select('-created -id -isOcultar').exec((err, infospartidas) => {
    if(err) return next(err);
    if(infospartidas) return res.json(infospartidas);
    if(!infospartidas) return res.send('No hay registros.');
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***getInfosPartidaByIdPartida***//////////////////////////////////////////////////////
exports.getInfosPartidaByIdPartida = (req, res, next) => {

  InfoPartida.find({
    idPartida: req.param.idPartida
  }).where({
    isOcultar: false
  }).populate('partida').populate('usuario').select('-created -id').exec((err, infopartida) => {
    if(err) return next(err);
    if(infopartida) return res.json(infopartida);
    if(!infopartida) return res.send('No hay registros.');
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////NIVEL///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.altaNivel = (req, res, next) => {
  var nuevoNivel = new Nivel(req.body);
  nuevoNivel.save((err, nivel) => {
    if(err) return next(err);
    if(nivel) return res.json(nivel);
  })
};
exports.getNivel = (req, res, next) => {
  Nivel.findOne({
    nivel: req.nivel
  }, (err, nivel) => {
    if(err) return next(err);
    if(nivel) return res.json(nivel);
  })
};
exports.getNiveles = (req, res, next) => {
  Nivel.find({}, (err, niveles) => {
    if(err) return next(err);
    if(niveles) return res.json(niveles);
  })
};
exports.modificarNivel = (req, res, next) => {
  Nivel.where({
    nivel: req.nivel
  }).update(req.updateNivel).exec(() => res.send('Ok, actualizado'));
};
exports.eliminarNivel = (req, res, next) => {
  Nivel.deleteOne({
    nivel: req.nivel
  }).exec(() => res.send('Ok,eliminado'));
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
