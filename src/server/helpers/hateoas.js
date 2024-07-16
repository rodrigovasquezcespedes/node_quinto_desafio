const generarHATEOAS = (req, items, limits, page, order, precioMin, precioMax, categoria, metal, totalJoyas, totalStock) => {
  return {
    totalJoyas,
    totalStock,
    result: items.map(item => ({
      ...item,
      links: {
        self: `${req.protocol}://${req.get('host')}/joyas/filtros?id=${item.id}&precio_min=${precioMin}&precio_max=${precioMax}&categoria=${categoria}&metal=${metal}`
      }
    })),
    _links: {
      self: `${req.protocol}://${req.get('host')}/joyas?limits=${limits}&page=${page}&order=${order}`,
      next: `${req.protocol}://${req.get('host')}/joyas?limits=${limits}&page=${parseInt(page) + 1}&order=${order}`,
      prev: page > 1 ? `${req.protocol}://${req.get('host')}/joyas?limits=${limits}&page=${parseInt(page) - 1}&order=${order}` : null
    }
  }
}

module.exports = generarHATEOAS
