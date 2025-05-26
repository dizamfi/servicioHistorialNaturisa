const { Schema, model, models } = require('mongoose');

const HistorialBombaSchema = Schema({
    date: {
        type: Date,
        //required: true
    },

    estacion: {
        type: String,
        required: true
    },

    bomba: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        required: true
    }

});

module.exports = model('HistorialBomba', HistorialBombaSchema);