const pool = require('../config/db')
const format = require('pg-format')

const obtenerTodasLasJoyas = async (limits, page, order) => {
  const [colum, sort] = order.split('_')
  const offset = Math.abs(page > 0 ? page - 1 : 0) * limits
  const query = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', colum, sort, limits, offset)
  const result = await pool.query(query)
  return result.rows
}

const filtroJoyas = async (precioMin, precioMax, categoria, metal) => {
  let query = 'SELECT * FROM inventario'
  const filtro = []
  const values = []

  if (precioMin) {
    values.push(precioMin)
    filtro.push(`precio >= $${values.length}`)
  }
  if (precioMax) {
    values.push(precioMax)
    filtro.push(`precio <= $${values.length}`)
  }
  if (categoria) {
    values.push(categoria)
    filtro.push(`categoria = $${values.length}`)
  }
  if (metal) {
    values.push(metal)
    filtro.push(`metal = $${values.length}`)
  }

  if (filtro.length > 0) {
    query += ' WHERE ' + filtro.join(' AND ')
  }

  const result = await pool.query(query, values)
  return result.rows || []
}

module.exports = { obtenerTodasLasJoyas, filtroJoyas }
