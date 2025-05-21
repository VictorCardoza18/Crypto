import { z } from 'zod';

export const registerSchema = z.object({
    username:
        z.string({
            required_error: 'Username is required'
        }),
    email:
        z.string({
            required_error: 'Email is required'
        }).email({
            message: 'Invalid email'
        }),
    password:
        z.string({
            required_error: 'Password is required'
        }).min(6, {
            message: 'Password must be at least 6 characters'
        })
})

export const loginSchema = z.object({
    email:
        z.string({
            required_error: 'Email is required'
        }).email({
            message: 'Invalid email'
        }),
    password:
        z.string({
            required_error: 'Password is required'
        }).min(6, {
            message: 'Password must be at least 6 characters'
        })
})

export const passwordResetRequestSchema = z.object({
    email:
        z.string({
            required_error: 'Email is required'
        }).email({
            message: 'Invalid email'
        })
            .refine((email) => email.endsWith('@gmail.com'), {
                message: 'Solo se permiten correos de Gmail para recuperación de contraseña'
            })
})

export const passwordResetSchema = z.object({
    token:
        z.string({
            required_error: 'Token is required'
        }),
    newPassword:
        z.string({
            required_error: 'Nueva contraseña es requerida'
        }).min(6, {
            message: 'La contraseña debe tener al menos 6 caracteres'
        })
})