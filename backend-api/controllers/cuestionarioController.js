const Cuestionario = require('../models/Cuestionario');

// Listar todos los cuestionarios
exports.listarCuestionarios = async (req, res) => {
  try {
    console.log('Intentando listar todos los cuestionarios...');
    console.log('Modelo Cuestionario:', Cuestionario);
    console.log('Colección asociada al modelo:', Cuestionario.collection.name);

    const cuestionarios = await Cuestionario.find();
    console.log('Cuestionarios obtenidos:', cuestionarios);
    res.status(200).json(cuestionarios);
  } catch (err) {
    console.error('Error al obtener los cuestionarios:', err);
    res.status(500).json({ error: 'Error al obtener los cuestionarios' });
  }
};
