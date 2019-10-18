var express = require('express');
var cerberus = require('./cerberus/cerberus');
var router = express.Router();
var controladorPalabras=require('../controllers/palabras.controller');
console.log('rutas palabras');

/////////////////////////GET-GET-GET-GET
router.get('/',controladorPalabras.getPalabras);
router.get('/all',controladorPalabras.getAllPalabras);
router.get('/nivel',controladorPalabras.palabrasXlvl);
router.get('/partida',controladorPalabras.palabrasXPartida);
//////////////////////////////////////////////////////////////////////
///////////////////////POST-POST-POST-POST
router.post('/nuevaPalabra',controladorPalabras.altaPalabra);
//////////////////////////////////////////////////////////////////////
///////////////////////DELETE-DELETE-DELETE-DELETE
router.delete('/borrar',controladorPalabras.eliminarLogicamente);
router.delete('/remove',controladorPalabras.eliminarPalabra);
//////////////////////////////////////////////////////////////////////

module.exports = router;
