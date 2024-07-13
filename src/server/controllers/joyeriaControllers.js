// src/server/controllers/joyeriaController.js
const JoyeriaModel = require('../models/joyeriaModel');
const generarHATEOAS = require('../helpers/hateoasHelper');

const obtenerJoyas = async (req, res) => {
  const { limites = 10, pagina = 1, orden_por = 'id' } = req.query;
  try {
    const offset = (pagina - 1) * limites;
    const joyas = await JoyeriaModel.obtenerTodasLasJoyas(limites, offset, orden_por);
    
    const respuesta = generarHATEOAS(req, joyas, limites, pagina, orden_por);

    res.json(respuesta);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

const filtrarJoyas = async (req, res) => {
  const { precio_min, precio_max, categoria, metal } = req.query;
  try {
    const joyas = await JoyeriaModel.filtrarJoyas(precio_min, precio_max, categoria, metal);
    const respuesta = generarHATEOAS(req, joyas, req.query.limites, req.query.pagina, req.query.orden_por);
    res.json(respuesta);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

module.exports = { obtenerJoyas, filtrarJoyas };


