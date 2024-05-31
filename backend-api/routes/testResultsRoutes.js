const express = require('express');
const router = express.Router();
const TestResult = require('../models/TestResult');

// Ruta para obtener todos los resultados de las pruebas
router.get('/', async (req, res) => {
  try {
    const results = await TestResult.find();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching test results:', err);
    res.status(500).json({ message: 'Failed to fetch test results', error: err.message });
  }
});

module.exports = router;
