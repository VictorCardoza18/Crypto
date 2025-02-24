import { Router } from "express"
import { authRequired } from '../middlewares/validateToken.js'
import { getAdeudos, createAdeudo, getAdeudo, deleteAdeudo, updateAdeudo } from "../controllers/adeudos.controller.js"
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createAdeudoSchema } from '../schemas/adeudos.schema.js'

const router = Router()
// Consulta todas los adeudos
router.get('/adeudos', authRequired, getAdeudos)
// Consulta un adeudo
router.get('/adeudos/:id', authRequired, getAdeudo)
// Crea un adeudo
router.post('/adeudos', authRequired, validateSchema(createAdeudoSchema), createAdeudo)
// Elimina un adeudo
router.delete('/adeudos/:id', authRequired, deleteAdeudo)
// Actualiza un adeudo
router.put('/adeudos/:id', authRequired, updateAdeudo)

export default router;