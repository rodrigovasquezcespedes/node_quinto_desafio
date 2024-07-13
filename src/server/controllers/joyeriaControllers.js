const JoyeriaModel = require('../models/joyeriaModels');

const obtenerJoyas = async (req, res) => {
  const { limites = 10, pagina = 1, orden_por = 'id' } = req.query;
  try {
    const offset = (pagina - 1) * limites;
    const joyas = await JoyeriaModel.obtenerTodasLasJoyas(limites, offset, orden_por);
    
    const respuesta = {
      items: joyas.map(item => ({
        ...item,
        links: {
          self: `${req.protocol}://${req.get('host')}/joyas/${item.id}`,
        }
      })),
      _links: {
        self: `${req.protocol}://${req.get('host')}/joyas?limites=${limites}&pagina=${pagina}&orden_por=${orden_por}`,
        next: `${req.protocol}://${req.get('host')}/joyas?limites=${limites}&pagina=${parseInt(pagina) + 1}&orden_por=${orden_por}`,
        prev: pagina > 1 ? `${req.protocol}://${req.get('host')}/joyas?limites=${limites}&pagina=${parseInt(pagina) - 1}&orden_por=${orden_por}` : null,
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
    res.json(joyas);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

module.exports = {
  obtenerJoyas,
  filtrarJoyas,
};

