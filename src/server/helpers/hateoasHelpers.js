// src/server/helpers/hateoasHelper.js
const generarHATEOAS = (req, items, limites, pagina, orden_por) => {
  return {
    items: items.map(item => ({
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
};

module.exports = generarHATEOAS;
