const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema para las opciones de las preguntas
const OpcionSchema = new Schema({
  texto: { type: String, required: true },
  valor: { type: String, required: true }
});

// Esquema para las preguntas
const PreguntaSchema = new Schema({
  id: { type: Number, required: true },
  texto: { type: String, required: true },
  opciones: { type: [OpcionSchema], required: true }
});

// Esquema para los criterios de las carreras
const CriterioSchema = new Schema({
  pregunta: { type: Number, required: true },
  respuesta: { type: String, required: true },
  puntaje: { type: Number, required: true }
});

// Esquema para las carreras
const CarreraSchema = new Schema({
  nombre: { type: String, required: true },
  criterios: { type: [CriterioSchema], required: true }
});

// Esquema principal para el cuestionario
const CuestionarioSchema = new Schema({
  Preguntas: { type: [PreguntaSchema], required: true },
  Carreras: { type: [CarreraSchema], required: true }
});

// Especificar el nombre de la colección como 'cuestionario'
module.exports = mongoose.model('Cuestionario', CuestionarioSchema, 'cuestionario');
