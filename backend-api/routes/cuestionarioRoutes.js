const express = require('express');
const router = express.Router();
const cuestionarioController = require('../controllers/cuestionarioController');

// Ruta para listar todos los cuestionarios
router.get('/', cuestionarioController.listarCuestionarios);



module.exports = router;
