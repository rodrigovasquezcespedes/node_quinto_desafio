require('dotenv').config()
const app = require('./src/server/app')
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor está corriendo en el puerto ${PORT}`)
})
