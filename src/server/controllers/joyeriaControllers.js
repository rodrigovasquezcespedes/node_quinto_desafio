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
    res.status(500).send('Error del servidor obtener joyas')
  }
}
const filtrarJoyas = async (req, res) => {
  const { precioMin = 0, precioMax = 0, categoria = 'collar', metal = 'oro' } = req.query
  try {
    const joyas = await JoyeriaModel.filtroJoyas(precioMin, precioMax, categoria, metal)
    if (!joyas.length) {
      return res.status(404).json({ mensaje: 'No se encontraron joyas con los filtros proporcionados' })
    }
    const respuesta = generarHATEOAS(req, joyas)
    res.json(respuesta)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error del servidor al filtrar joyas')
  }
}

module.exports = { obtenerJoyas, filtrarJoyas }
