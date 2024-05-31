const mongoose = require('mongoose');

const OpcionSchema = new mongoose.Schema({
  texto: String,
  valor: String
});

const PreguntaSchema = new mongoose.Schema({
  id: Number,
  texto: String,
  opciones: [OpcionSchema]
});

const CriterioSchema = new mongoose.Schema({
  pregunta: Number,
  respuesta: String,
  puntaje: Number
});

const CarreraSchema = new mongoose.Schema({
  nombre: String,
  criterios: [CriterioSchema]
});

const CuestionarioSchema = new mongoose.Schema({
  nombre: String,
  Preguntas: [PreguntaSchema],
  Carreras: [CarreraSchema]
});

module.exports = mongoose.model('Cuestionario', CuestionarioSchema);
