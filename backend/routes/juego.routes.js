var express = require('express');
var controladorJuego = require('../controllers/partida.controller');
var router = express.Router();
console.log('rutas juego');
router.get('/', controladorJuego.getPartidas);
router.get('/partida/:idPartida', controladorJuego.getPartidaById);
router.get('/infopartida', controladorJuego.getinfoPartidas);
router.get('/infopartida/:idPartida', controladorJuego.getInfosPartidaByIdPartida);
router.post('/altainfopartida/:infopartida', controladorJuego.crearInfoPartida);
router.post('/altapartida/:tipopartida', controladorJuego.altaPartida);
router.put('/modificarinfopartida/:infoPartida', controladorJuego.modificarInfoPartidaById);
router.delete('/borrarinfospartida', controladorJuego.borrarInfosPartidaByIds);
router.delete('/borrarInfoPartida/:idInfoPartida', controladorJuego.borrarInfoPartidaById);
router.delete('/borrarpartida/:idPartida', controladorJuego.borrarPartidaById);
router.delete('/eliminarPartida/:idPartida', controladorJuego.eliminarPartidaById);
router.post('/altanivel', controladorJuego.altaNivel);
router.get('/nivel/:lvl', controladorJuego.getNivel);
router.get('/nivel', controladorJuego.getNiveles);
router.put('/modificarnivel', controladorJuego.modificarNivel);
router.delete('eliminarnivel/:lvl', controladorJuego.eliminarNivel);
module.exports = router;
