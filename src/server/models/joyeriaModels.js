const pool = require('../config/db');

const obtenerTodasLasJoyas = async (limites, offset, ordenPor) => {
  const query = `SELECT * FROM inventario ORDER BY ${ordenPor} LIMIT $1 OFFSET $2`;
  const result = await pool.query(query, [limites, offset]);
  return result.rows;
};

const filtroJoyas = async (precioMin, precioMax, categoria, metal) => {
  const query = `SELECT * FROM inventario WHERE precio >= $1 OR precio <= $2 OR categoria = $3 OR metal = $4`;
  const result = await pool.query(query, [precioMin, precioMax, categoria, metal]);
  return result.rows;
};

const obtenerJoyaPorId = async (id) => {
  const query = `SELECT * FROM inventario WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = { obtenerTodasLasJoyas, filtroJoyas, obtenerJoyaPorId };
