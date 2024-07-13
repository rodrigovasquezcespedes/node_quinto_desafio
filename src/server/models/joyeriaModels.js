const pool = require('../config/db');

const obtenerTodasLasJoyas = async (limites, offset, ordenPor) => {
  const query = `SELECT * FROM inventario ORDER BY ${ordenPor} LIMIT $1 OFFSET $2`;
  const result = await pool.query(query, [limites, offset]);
  return result.rows;
};

const filtrarJoyas = async (precioMin, precioMax, categoria, metal) => {
  const query = `SELECT * FROM inventario WHERE precio >= $1 AND precio <= $2 AND categoria = $3 AND metal = $4`;
  const result = await pool.query(query, [precioMin, precioMax, categoria, metal]);
  return result.rows;
};

module.exports = {
  obtenerTodasLasJoyas,
  filtrarJoyas,
};
