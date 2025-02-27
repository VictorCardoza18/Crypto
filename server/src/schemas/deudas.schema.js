import { z } from 'zod';

export const createDeudasSchema = z.object({
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
    categoria:
        z.string({
            required_error: 'Title is required'
        }),
    monto:
        z.number({
            required_error: 'Title is required'
        }),
    entidad:
        z.string({
            required_error: 'Entidad is required'
        }),
    intereses:
        z.number({
            required_error: 'Intereces is required'
        }),
    estado:
        z.string({
            required_error: 'estado is required'
        }),            
})

