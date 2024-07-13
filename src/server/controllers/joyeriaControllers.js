// src/server/controllers/joyeriaController.js
const JoyeriaModel = require('../models/joyeriaModels');
const generarHATEOAS = require('../helpers/hateoasHelpers');

const obtenerJoyas = async (req, res) => {
  const { limites = 10, pagina = 1, orden_por = 'stock_ASC' } = req.query;
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

const obtenerJoyaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const joya = await JoyeriaModel.obtenerJoyaPorId(id);
    if (!joya) {
      return res.status(404).json({ mensaje: 'Joya no encontrada' });
    }
    const respuesta = {
      ...joya,
      links: {
        self: `${req.protocol}://${req.get('host')}/joyas/${joya.id}`,
        all: `${req.protocol}://${req.get('host')}/joyas`,
      }
    };
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

module.exports = { obtenerJoyas, filtrarJoyas,obtenerJoyaPorId };


