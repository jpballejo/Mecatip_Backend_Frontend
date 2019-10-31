var express = require('express');
var cerberus = require('./cerberus/cerberus');
var router = express.Router();
var controladorPalabras = require('../controllers/palabras.controller');
console.log('rutas palabras');
/////////////////////////GET-GET-GET-GET
router.get('/', controladorPalabras.getPalabras);
router.get('/all', controladorPalabras.getAllPalabras);
router.get('/nivel/:lvl', controladorPalabras.palabrasXlvl);
//////////////////////////////////////////////////////////////////////
///////////////////////POST-POST-POST-POST
router.post('/nuevaPalabra', controladorPalabras.altaPalabra);
//////////////////////////////////////////////////////////////////////
///////////////////////DELETE-DELETE-DELETE-DELETE
router.delete('/borrar/:idPalabra', controladorPalabras.eliminarLogicamente);
router.delete('/remove/:idPalabra', controladorPalabras.eliminarPalabra);
//////////////////////////////////////////////////////////////////////
module.exports = router;
