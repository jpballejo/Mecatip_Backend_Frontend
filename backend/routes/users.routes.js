var express = require('express');
var router = express.Router();
var controladorUsuario = require('../controllers/usuario.controller');

/* RUTAS */
router.get('/',  controladorUsuario.getUsuarios);
router.put('/update', controladorUsuario.updateUsuario);//???
router.get('/:usuario',controladorUsuario.getUsuario);
router.delete('/borrar', controladorUsuario.eliminarUsuario);
router.put('/changePassword',  controladorUsuario.cambiarPassword);
router.put('/resetPasswd', controladorUsuario.resetPasswd);
router.get('/all',  controladorUsuario.listaUsuario);
module.exports = router;
