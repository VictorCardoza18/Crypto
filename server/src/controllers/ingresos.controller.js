import ingreso from '../models/ingresos.model.js';
const emptyIngresoList = [{
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
}]


export const getIngresos = async (req, res) => {
    const ingresos = await ingreso.find({ user: req.user.id }).populate('user')
    if (ingresos.length === 0) return res.json(emptyIngresoList)
    res.json(ingresos)
}

export const createIngreso = async (req, res) => {
    const { title, description, date, monto, categoria } = req.body
    const newIngreso = new ingreso({ title, description, date, monto, categoria, user: req.user.id })
    const savedIngreso = await newIngreso.save()
    res.json(savedIngreso)
}

export const getIngreso = async (req, res) => {
    const ingresos = await ingreso.findById(req.params.id).populate('user')
    if (!ingresos) return res.status(404).json({ message: 'ingreso not found' })
    res.json(ingresos)
}

export const deleteIngreso = async (req, res) => {
    const ingresos = await ingreso.findByIdAndDelete(req.params.id)
    if (!ingresos) return res.status(404).json({ message: 'ingreso not found' })
    return res.sendStatus(204)
}

export const updateIngreso = async (req, res) => {
    const ingresos = await ingreso.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!ingresos) return res.status(404).json({ message: 'ingreso not found' })
    res.json(ingresos)
}
