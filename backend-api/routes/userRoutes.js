const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Esta es la línea que importa jwt
const conectarMongoDB = require('../config/db'); // Importar la función de conexión a MongoDB
cost conectarMongoDB = require('../config/db')
// Ruta para registrar un usuario
router.post('/register', async (req, res) => {
  const { email, password, role, name, surname, age, educationLevel, acceptTerms } = req.body;
  try {
    if (role === "user" && (!name || !surname || !age || !educationLevel || !acceptTerms)) {
      return res.status(400).json({ message: 'All fields are required for user registration' });
    }

    const db = await conectarMongoDB(); // Obtener la conexión a MongoDB
    const usersCollection = db.collection('users'); // Obtener la colección de usuarios

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Crear el nuevo usuario en la colección de usuarios
    await usersCollection.insertOne({ email, password: hashedPassword, role, name, surname, age, educationLevel, acceptTerms });

    res.status(200).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error in /register:', err);
    res.status(500).json({ message: 'Failed to register user', error: err.message });
  }
});

// // Ruta para iniciar sesión
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   console.log(`Login attempt for email: ${email}`);

//   try {
//     const db = await conectarMongoDB(); // Obtener la conexión a MongoDB
//     const usersCollection = db.collection('users'); // Obtener la colección de usuarios

//     const user = await usersCollection.findOne({ email });
//     if (!user) {
//       console.log('User not found');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       console.log('Invalid password');
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role, userName: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Failed to login', error: err.message });
//   }
// });

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt for email: ${email}`);

  try {
    const db = await conectarMongoDB(); // Obtener la conexión a MongoDB
    const usersCollection = db.collection('users'); // Obtener la colección de usuarios

    const user = await usersCollection.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role, userName: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role, userName: user.name });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Failed to login', error: err.message });
  }
});



module.exports = router;
