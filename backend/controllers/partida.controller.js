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
function getUsuario(username_Email) {
  Usuario.findOne({
    $or: [{
      email: username
    }, {
      username: username
    }]
  }).where({
    isOcultar: false
  }).exec((err, user) => {
    if(user) return user;
    if(err) {
      console.log(err);
    }
  })
};
var buscarPartida = (idPartida) => Partida.findOne({
  idPartida: idPartida
}, (err, partida) => {
  if(err) return err;
  if(!partida) return 'No se encontro ninguna partida con id: ', idPartida;
  if(partida) return partida;
});
//var setearInfoPartida =
//------------------------------------------------------------------------------//
////////////////////////////////////PARTIDA//////////////////////
////////////////////////////////////////////***altaPartida***//////////////////////////////////////////////////////
exports.altaPartida = (req, res, next) => {
  var idAuto = utilidades.generateID();
  var idPartida = 'Partida:_',
    idAuto;
  var partidaNew = new Partida({
    idPartida: idPartida,
    tipoPartida: req.tipoPartida
  });
  partidaNew.save((err, partida) => {
    if(err) return next(err);
    if(partida) {
      //  res.status(200);
      return res.json({
        'idPartida': partidaNew.idPartida
      });
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***borrarPartidaById***//////////////////////////////////////////////////////
exports.borrarPartidaById = (req, res, next) => {
  var query = {
    idPartida: req.body.idPartida
  };
  Partida.where(query).update({
    isOcultar: true
  }).exec(() => res.send('ok'));
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***eliminarPartidaById***//////////////////////////////////////////////////////
exports.eliminarPartidaById = (req, res, next) => {
  Partida.findOneAndDelete({
    idPartida: req.idPartida
  }, (err, partida) => {
    if(err) return next(err);
    if(partida) {
      //  res.status(200);
      //res.send('ok');
      return res.json(partida);
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
      res.status(200);
      return res.send('No se esncontro una partida con idP,artida: ', req.idPartida);
    }
    if(partida) {
      //  res.send(200);
      return res.json(partida);
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***getPartidas***//////////////////////////////////////////////////////
exports.getPartidas = (req, res, next) => {
  Partida.find({}, (err, partidas) => {
    if(err) return next(err);
    if(!partidas) {
      //  res.status(200);
      return res.send('No se esncontraron partidas.');
    }
    if(partidas) {
      //  res.send(200);
      return res.json(partidas);
    }
  })
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////INFOPARTIDA//////////////////////
////////////////////////////////////////////***crearInfoPartida***//////////////////////////////////////////////////////
exports.crearInfoPartida = (req, res, next) => {
  var idAuto = utilidades.generateID();
  var idIPartida = 'InfoPartida:_' + `${req.user.username}` + '_' + idAuto;
  var infoPartida = new InfoPartida(req.infoPartida);
  infoPartida.idInfoPartida = idIPartida;
  infoPartida.jugador = getUsuario(req.idJugador);
  infoPartida.partida = buscarPartida(req.idPartida);
  infoPartida.save().then((infoPartida) => {
    Usuario.findOne({
      username: req.user.username
    }, (err, user) => {
      if(err) return err;
      if(user) {
        user.infoPartida.push(infoPartida);
        user.save((err, user) => {
          if(err) return next(err);
          if(user) return res.json(infoPartida);
        });
      }
    });
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***modificarInfoPartidaById***//////////////////////////////////////////////////////
exports.modificarInfoPartidaById = (req, res, next) => {
  var query = {
    idInfoPartida: req.idInfoPartida
  };
  InfoPartida.where(query).update(req.infoPartidaMod).exec((infoPartida) => res.json(infoPartida));
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
  }).populate('partida').populate('usuario').select('-created -id').exec((err, infospartidas) => {
    if(err) return next(err);
    if(infospartidas) return res.json(infospartidas);
    if(!infospartidas) return res.send('No hay registros.');
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////***getInfosPartidaByIdPartida***//////////////////////////////////////////////////////
exports.getInfoPartidaByIdPartida = (req, res, next) => {
  InfoPartida.find({
    idInfoPartida: req.idInfoPartida
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
