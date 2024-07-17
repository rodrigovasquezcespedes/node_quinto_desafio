const express = require('express')
const cors = require('cors')
const joyeriaRoutes = require('./routers/joyeriaRouters')
const registraRuta = require('./middlewares/registraRuta')
const app = express()

app.use(cors())
app.use(express.json())
app.use(registraRuta)

app.use('/', joyeriaRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('¡Algo salió mal!')
})

module.exports = app
