require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const testResultsRoutes = require('./routes/testResultsRoutes');
const cuestionarioRoutes = require('./routes/cuestionarioRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Usar body-parser para manejar JSON

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('No MongoDB URI specified in .env file');
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Usar las rutas
app.use('/api/users', userRoutes);
app.use('/api/test-results', testResultsRoutes);
app.use('/api/cuestionarios', cuestionarioRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
