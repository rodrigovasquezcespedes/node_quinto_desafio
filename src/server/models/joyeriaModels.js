const pool = require('../config/db')
const format = require('pg-format')

const obtenerTodasLasJoyas = async (limits, page, order) => {
  const [colum, sort] = order.split('_')
  const offset = Math.abs(page > 0 ? page - 1 : 0) * limits
  const query = format('SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s', colum, sort, limits, offset)
  const result = await pool.query(query)
  return result.rows
}

const filtroJoyas = async (id, precioMin, precioMax, categoria, metal) => {
  let query = 'SELECT * FROM inventario'
  const filtro = []
  const values = []

  if (id) {
    values.push(id)
    filtro.push(`id = $${values.length}`)
  }
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

const insertarJoya = async (joya) => {
  const { nombre, categoria, metal, precio, stock } = joya
  const query = 'INSERT INTO inventario (nombre, categoria, metal, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *'
  const result = await pool.query(query, [nombre, categoria, metal, precio, stock])
  return result.rows[0]
}
const actualizarJoya = async (id, joya) => {
  const { nombre, categoria, metal, precio, stock } = joya
  const query = 'UPDATE inventario SET nombre = $1, categoria = $2, metal = $3, precio = $4, stock = $5 WHERE id = $6 RETURNING *'
  const result = await pool.query(query, [nombre, categoria, metal, precio, stock, id])
  return result.rows[0]
}

const eliminarJoya = async (id) => {
  const query = 'DELETE FROM inventario WHERE id = $1 RETURNING *'
  const result = await pool.query(query, [id])
  return result.rows[0]
}

module.exports = { obtenerTodasLasJoyas, filtroJoyas, insertarJoya, actualizarJoya, eliminarJoya }
