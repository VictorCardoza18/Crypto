import Inversion from '../models/inversion.model.js';



const emptyInversionList = [{
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
    tipoinversion: {
        type: String,
        required: true
    },
    optimista: {
        type: Number,
        required: true
    },
    neutral: {
        type: Number,
        required: true
    },
    pesimista: {
        type: Number,
        required: true
    },
}]


export const getInversiones = async (req, res) => {
    const inversion = await Inversion.find({ user: req.user.id }).populate('user')
    if (inversion.length === 0) return res.json(emptyInversionList)
    res.json(inversion)
}

export const createInversion = async (req, res) => {
    const { title, description, date, monto, tipoinversion, optimista, neutral, pesimista } = req.body
    const newInversion = new Inversion({ title, description, date, monto, tipoinversion, optimista, neutral, pesimista, user: req.user.id })
    const savedInversion = await newInversion.save()
    res.json(savedInversion)
}

export const getInversion = async (req, res) => {
    const inversion = await Inversion.findById(req.params.id).populate('user')
    if (!inversion) return res.status(404).json({ message: 'Inversion not found' })
    res.json(inversion)
}

export const deleteInversion = async (req, res) => {
    const inversion = await Inversion.findByIdAndDelete(req.params.id)
    if (!inversion) return res.status(404).json({ message: 'inversion not found' })
    return res.sendStatus(204)
}

export const updateInversion = async (req, res) => {
    const inversion = await Inversion.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!inversion) return res.status(404).json({ message: 'ingreso not found' })
    res.json(inversion)
}
