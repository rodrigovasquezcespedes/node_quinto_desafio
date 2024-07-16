const generarHATEOAS = (req, items, limits, page, order) => {
  return {
    items: items.map(item => ({
      ...item,
      links: {
        self: `${req.protocol}://${req.get('host')}/joyas/${item.id}`
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
