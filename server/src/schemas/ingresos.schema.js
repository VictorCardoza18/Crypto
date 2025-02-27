import { z } from 'zod';

export const createIngresoSchema = z.object({
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
})

