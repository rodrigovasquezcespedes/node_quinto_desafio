const express = require('express')
const router = express.Router()
const joyeriaController = require('../controllers/joyeriaControllers')

router.get('/joyas', joyeriaController.obtenerJoyas)
router.get('/joyas/filtros', joyeriaController.filtrarJoyas)
router.post('/joyas', joyeriaController.insertarJoya)
router.put('/joyas/:id', joyeriaController.actualizarJoya)
router.delete('/joyas/:id', joyeriaController.eliminarJoya)
module.exports = router
