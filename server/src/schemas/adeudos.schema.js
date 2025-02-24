import { z } from 'zod';

export const createAdeudoSchema = z.object({
    nombreAdeudo:
        z.string({
            required_error: 'Title is required'
        }),
    monto:
        z.number({
            required_error: 'monto must be a number'
        }),
    descripcion:
        z.string({
            required_error: 'descripcion is required'
        }),
    categoria:
        z.string({
            required_error: 'Category is required'
        }),
    fecha:
        z.string().datetime({
            required_error: 'Date is required'
        }),
    idTarjeta:
        z.string({
            required_error: 'Id tarjeta debe ser un String'
        })
})