import { Router } from "express"
import { register, login, logout, profile, verifyToken, requestPasswordReset, resetPassword } from '../controllers/auth.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { registerSchema, loginSchema, passwordResetRequestSchema, passwordResetSchema } from '../schemas/auth.schema.js'

const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/verify-token', verifyToken)
router.post('/forgot-password', validateSchema(passwordResetRequestSchema), requestPasswordReset)
router.post('/reset-password', validateSchema(passwordResetSchema), resetPassword)

export default router;