const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB conectado');
  } catch (error) {
    console.error('Error de conexión a DB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
