import { z } from 'zod';

export const createTarjetaSchema = z.object({
    numeroTarjeta:
        z.string({
            required_error: 'Numero tarjeta is required'
        }),
    nombreTarjeta:
        z.string({
            required_error: 'Nombre tarjeta is required'
        }),
    fechaExp:
        z.string().datetime({
            required_error: 'Fecha de expiracion es requerida'
        }),
    cvv:
        z.string({
            required_error: 'CVV es requerido'
        }),
    limiteCredito:
        z.string({
            required_error: 'Limite de credito es requerido'
        }),
})

