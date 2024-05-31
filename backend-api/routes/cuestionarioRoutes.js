const express = require('express');
const router = express.Router();
const Cuestionario = require('../models/Cuestionario'); // Asegúrate de que este modelo esté correctamente definido

// Ruta para obtener todos los cuestionarios
router.get('/', async (req, res) => {
  try {
    const cuestionarios = await Cuestionario.find();
    res.status(200).json(cuestionarios);
  } catch (err) {
    console.error('Error fetching cuestionarios:', err);
    res.status(500).json({ message: 'Failed to fetch cuestionarios', error: err.message });
  }
});

module.exports = router;
