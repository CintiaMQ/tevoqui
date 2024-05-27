const mongoose = require('mongoose');

const conectarMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error('No MongoDB URI specified in .env file');
      process.exit(1);
    }

    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Aumenta el tiempo de espera a 30 segundos
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
};

module.exports = conectarMongoDB;
