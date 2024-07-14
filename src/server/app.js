const express = require('express')
const cors = require('cors')
const joyeriaRoutes = require('./routers/joyeriaRouters')
const logger = require('./middlewares/logger')
const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

// Rutas
app.use('/', joyeriaRoutes)

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('¡Algo salió mal!')
})

module.exports = app
