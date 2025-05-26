const mongoose = require('mongoose');

const HistorialPSSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },

    finca: {
        type: String,
        required: true
    },

    piscina: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        enum: ['ENCENDIDO', 'APAGADO'],
        required: true
    },

    
});

module.exports = mongoose.model('HistorialPS', HistorialPSSchema);
