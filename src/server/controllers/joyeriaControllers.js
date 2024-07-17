const JoyeriaModel = require('../models/joyeriaModels')
const generarHATEOAS = require('../helpers/hateoas')

const obtenerJoyas = async (req, res) => {
  const { limits = 10, page = 1, order = 'id_ASC' } = req.query
  try {
    const joyas = await JoyeriaModel.obtenerTodasLasJoyas(limits, page, order)
    if (!joyas) {
      return res.status(404).json({ error: 'No se pudieron listar las Joyas' })
    }
    const respuesta = generarHATEOAS(req, joyas, limits, page, order)
    res.status(200).json(respuesta)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error del servidor obtener joyas')
  }
}

const filtrarJoyas = async (req, res) => {
  const { id = 0, precioMin = 0, precioMax = 0, categoria = 'collar', metal = 'oro', limits = 10, page = 1, order = 'id_ASC' } = req.query
  try {
    const joyas = await JoyeriaModel.filtroJoyas(id, precioMin, precioMax, categoria, metal)
    if (!joyas.length) {
      return res.status(404).json({ mensaje: 'No se encontraron joyas con los filtros proporcionados' })
    }
    const respuesta = generarHATEOAS(req, joyas, limits, page, order, precioMin, precioMax, categoria, metal)
    res.status(200).json(respuesta)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error del servidor al filtrar joyas')
  }
}

const insertarJoya = async (req, res) => {
  const joya = req.body
  try {
    const nuevaJoya = await JoyeriaModel.insertarJoya(joya)
    res.status(201).json(nuevaJoya)
    console.log('joya fue creada exitozamente')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error del servidor al insertar joya')
  }
}

const actualizarJoya = async (req, res) => {
  const { id } = req.params
  const joya = req.body
  try {
    const joyaActualizada = await JoyeriaModel.actualizarJoya(id, joya)
    if (!joyaActualizada) {
      return res.status(404).json({ mensaje: 'Joya no encontrada' })
    }
    res.status(200).json(joyaActualizada)
    console.log('joya con id' + ' ' + id + ' ' + 'fue actualizada')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error del servidor al actualizar joya')
  }
}

const eliminarJoya = async (req, res) => {
  const { id } = req.params
  try {
    const joyaEliminada = await JoyeriaModel.eliminarJoya(id)
    if (!joyaEliminada) {
      return res.status(404).json({ mensaje: 'Joya no encontrada' })
    }
    res.status(204).json(joyaEliminada)
    console.log('joya con id' + ' ' + id + ' ' + 'fue eliminada')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Error del servidor al eliminar joya')
  }
}

module.exports = { obtenerJoyas, filtrarJoyas, insertarJoya, actualizarJoya, eliminarJoya }
