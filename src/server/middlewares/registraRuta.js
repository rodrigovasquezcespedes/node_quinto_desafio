const rutaTiempo = (req, res, next) => {
  const { method, url } = req
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] 'Metodo'${method} - 'Ruta' ${url}`)
  next()
}

module.exports = rutaTiempo
