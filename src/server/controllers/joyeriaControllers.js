const JoyeriaModel = require('../models/joyeriaModels')
const generarHATEOAS = require('../helpers/hateoasHelpers')

const obtenerJoyas = async (req, res) => {
  const { limits = 10, page = 1, order = 'id_ASC' } = req.query
  try {
    const joyas = await JoyeriaModel.obtenerTodasLasJoyas(limits, page, order)
    const respuesta = generarHATEOAS(req, joyas, limits, page, order)
    res.json(respuesta)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error del servidor')
  }
}

const filtrarJoyas = async (req, res) => {
  try {
    const { precioMin, precioMax, categoria, metal } = req.query
    const joyas = await JoyeriaModel.filtroJoyas(precioMin, precioMax, categoria, metal)
    res.json(joyas)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las joyas', detalle: error.message })
  }
}

const obtenerJoyaPorId = async (req, res) => {
  const { id } = req.params
  try {
    const joya = await JoyeriaModel.obtenerJoyaPorId(id)
    const respuesta = {
      ...joya,
      links: {
        self: `${req.protocol}://${req.get('host')}/joyas/${joya.id}`,
        all: `${req.protocol}://${req.get('host')}/joyas`
      }
    }
    res.json(respuesta)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error del servidor')
  }
}

module.exports = { obtenerJoyas, filtrarJoyas, obtenerJoyaPorId }
