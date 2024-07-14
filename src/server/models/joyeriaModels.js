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
  const filtro = []
  const values = []

  if (precioMin !== undefined) {
    filtro.push('precio >= %L')
    values.push(precioMin)
  }

  if (precioMax !== undefined) {
    filtro.push('precio <= %L')
    values.push(precioMax)
  }

  if (categoria) {
    filtro.push('categoria = %L')
    values.push(categoria)
  }

  if (metal) {
    filtro.push('metal = %L')
    values.push(metal)
  }

  let query = 'SELECT * FROM inventario'
  if (filtro.length > 0) {
    query = format(query + ' WHERE ' + filtro.join(' AND '), ...values)
  }

  const result = await pool.query(query)
  return result.rows
}

const obtenerJoyaPorId = async (id) => {
  const query = 'SELECT * FROM inventario WHERE id = $1'
  const result = await pool.query(query, [id])
  return result.rows[0]
}

module.exports = { obtenerTodasLasJoyas, filtroJoyas, obtenerJoyaPorId }
