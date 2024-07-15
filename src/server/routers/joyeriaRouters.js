const express = require('express')
const router = express.Router()
const joyeriaController = require('../controllers/joyeriaControllers')

router.get('/joyas', joyeriaController.obtenerJoyas)
router.get('/joyas/filtros', joyeriaController.filtrarJoyas)

module.exports = router
