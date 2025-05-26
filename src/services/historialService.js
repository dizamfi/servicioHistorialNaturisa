const Historial = require('../models/Historial');

const crearEvento = async ({ finca, piscina, estado }) => {
  return await Historial.create({ finca, piscina, estado });
};

const obtenerHistorial = async (finca, piscina) => {
  const filtro = {};
  if (finca) filtro.finca = finca;
  if (piscina) filtro.piscina = piscina;

  return await Historial.find(filtro).sort({ timestamp: -1 });
};

module.exports = {
  crearEvento,
  obtenerHistorial,
};
