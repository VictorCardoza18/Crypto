import { Router } from "express"
import { authRequired } from '../middlewares/validateToken.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createIngreso, deleteIngreso, getIngreso, getIngresos, updateIngreso } from "../controllers/ingresos.controller.js"
import { createIngresoSchema } from "../schemas/ingresos.schema.js"


const router = Router()
/* cambiar los demas cuando se creen */
router.get('/ingresos', authRequired, getIngresos)
router.get('/ingresos/:id', authRequired, getIngreso)
router.post('/ingresosCrear', authRequired, validateSchema(createIngresoSchema), createIngreso)
router.delete('/ingresos/:id', authRequired, deleteIngreso)
router.put('/ingresosActualizar/:id', authRequired, updateIngreso)

export default router;