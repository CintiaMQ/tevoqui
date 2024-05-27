require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const conectarMongoDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const testResultsRoutes = require('./routes/testResultsRoutes');
const cuestionarioRoutes = require('./routes/cuestionarioRoutes'); // Asegúrate de que este archivo se llama cuestionarios.js

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Usar body-parser para manejar JSON

// Conectar a MongoDB
conectarMongoDB()
  .then(() => {
    // Usar las rutas solo después de que la conexión esté establecida
// Usar las rutas
app.use('/api/users', userRoutes);
app.use('/api/test-results', testResultsRoutes);

    app.use('/api/cuestionarios', cuestionarioRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al iniciar el servidor:', err);
  });
