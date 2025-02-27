import { Router } from "express"
import { authRequired } from '../middlewares/validateToken.js'
import { getTarjetas, createTarjeta, getTarjeta, updateTarjeta, deleteTarjeta } from '../controllers/tarjetas.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createTarjetaSchema } from "../schemas/tarjetas.schema.js"

const router = Router()
router.get('/tarjetas', authRequired, getTarjetas)
router.get('/tarjetas/:id', authRequired, getTarjeta)
router.post('/tarjetas', authRequired, validateSchema(createTarjetaSchema), createTarjeta)
router.delete('/tarjetas/:id', authRequired, deleteTarjeta)
router.put('/tarjetas/:id', authRequired, updateTarjeta)

export default router;