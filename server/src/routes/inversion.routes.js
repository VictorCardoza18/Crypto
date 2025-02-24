import { Router } from "express"
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createInversion, deleteInversion, getInversion, getInversiones, updateInversion } from "../controllers/inversion.controller.js"
import { createInversionSchema } from "../schemas/inversion.schema.js"


const router = Router()
/* cambiar los demas cuando se creen */
router.get('/inversion', authRequired, getInversiones)
router.get('/inversion/:id', authRequired, getInversion)
router.post('/inversionCrear', authRequired, validateSchema(createInversionSchema), createInversion)
router.delete('/inversion/:id', authRequired, deleteInversion)
router.put('/inversionActualizar/:id', authRequired, updateInversion)

export default router;