import { z } from 'zod';

export const createInversionSchema = z.object({
    title:
        z.string({
            required_error: 'Title is required'
        }),
    description:
        z.string({
            required_error: 'Description is required'
        }),
    date:
        z.string().datetime({
            required_error: 'Date is required'
        }).optional(),
    tipoinversion:
        z.string({
            required_error: 'Title is required'
        }),
    monto:
        z.number({
            required_error: 'Title is required'
        }),
    optimista:
        z.number({
            required_error: 'la propiedad optimista es requerida'
        }),
    neutral:
        z.number({
            required_error: 'la propiedad neutral es requerida'
        }),
    pesimista:
        z.number({
            required_error: 'La propiedad pesimista es requerida'
        }),
})

