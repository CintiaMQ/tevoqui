const { MongoClient } = require('mongodb');

// Función para conectar a MongoDB
async function conectarMongoDB() {
  try {
    const url = 'mongodb://localhost:27017'; // URL de tu instancia de MongoDB
    const dbName = 'miBasedeDatos'; // Nombre de tu base de datos

    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);
    
    console.log('Conexión exitosa a MongoDB');
    
    return db;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

module.exports = conectarMongoDB;
