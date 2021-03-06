var utilidades = require('../utilidades/util');
var Palabra = require('../models/palabras.modelo');
var partidaPalabras = new Array();
/*var palabras = require('../palabras.json');
palabras.forEach((pal) => {
  console.log(pal);
  np = new Palabra(pal);
  np.save((err, palabra) => {
    console.log(palabra);
  })
});*/
//cosas
//------------------------------------------------------------------------------//
/*
Controlador: Palabras
created by: by Jp.
 */
//------------------------------------------------------------------------------//
/////////////////////////////////////**altaPalabra-POST/////////////////////////////////////////////////////////////////////////////////////
/**
 * [altaPalabra]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.altaPalabra = function(req, res, next) {
  var nuevaP = new Palabra(req.body);
  nuevaP.save(function(err, palabra) {
    if(err) return next(err);
    if(palabra) {
      console.log('Agrege palabra: ', palabra);
      return res.send("OK");
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////**eliminarLogicamente-DELETE/////////////////////////////////////////////////////////////////////////////////////
/**
 * [eliminarLogicamente]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.eliminarLogicamente = function(req, res, next) {
  Palabra.findByIdAndUpdate({
    id: req.params.idPalabra
  }, {
    isOcultar: true
  }, (err, palabra) => {
    if(palabra) return res.send('OK');
    if(err) return next(err);
  })
  console.log('borrar palabra');
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////**findOneAndDelete-DELETE/////////////////////////////////////////////////////////////////////////////////////
exports.eliminarPalabra = function(req, res, next) {
  Palabra.findByIdAndRemove({
    id: req.params.id
  }, (err, palabra) => {
    if(err) return next(err);
    if(palabra) {
      //  res.status(200);
      return res.json(palabra);
      //res.send('OK, eliminado');
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////**listarPalabras-GET/////////////////////////////////////////////////////////////////////////////////////
exports.getPalabras = (req, res, next) => {
  Palabra.find({}, 'palabra_frase nivel -_id', (err, palabras) => {
    if(err) return next(err);
    if(palabras) {
      console.log(palabras);
      return res.json(palabras);
      //return res.send('OK');
    }
    if(!palabras) {
      return res.send('No hay palabras registradas');
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////**listarAllPalabras-GET/////////////////////////////////////////////////////////////////////////////////////
exports.getAllPalabras = (req, res, next) => {
  Palabra.find({}, (err, palabras) => {
    if(err) return next
    if(palabras) {
      return res.json(palabras);
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////**buscarYRemplazar-PUT/////////////////////////////////////////////////////////////////////////////////////
exports.buscaYremplaza = (req, res, next) => {
  Palabra.replaceOne({
    _id: req.body.idPalabra
  }, {
    palabra_frase: req.body.palabraNew
  }).exec((err, palabra) => {
    return res.json(palabra);
  })
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////**getPalabrasXNivel-GET/////////////////////////////////////////////////////////////////////////////////////
exports.palabrasXlvl = (req, res, next) => {
  Palabra.findRandom({
    nivel: `${req.params.lvl}`
  }, {}, {
    limit: 12
  }, (err, pal) => {
    if(err) return next(err);
    if(pal) return res.json(pal);
    if(!palabras) return res.send('No hay palabras registradas');
  });
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////****************/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////****************/////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
