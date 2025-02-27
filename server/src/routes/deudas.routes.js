import { Router } from "express"
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createDeudas, deleteDeudas, getDeuda, getDeudas, updateDeudas } from "../controllers/deuda.controller.js"
import { createDeudasSchema } from "../schemas/deudas.schema.js"

    
const router = Router()
/* cambiar los demas cuando se creen */
router.get('/deudas', authRequired, getDeudas)
router.get('/deudas/:id', authRequired, getDeuda)
router.post('/deudasCrear', authRequired, validateSchema(createDeudasSchema), createDeudas)
router.delete('/deudas/:id', authRequired, deleteDeudas)
router.put('/deudasActualizar/:id', authRequired, updateDeudas)

export default router;