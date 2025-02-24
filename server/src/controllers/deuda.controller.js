import Deudas from '../models/deudas.model.js';

export const getDeudas = async (req, res) => {
    const deudas = await Deudas.find({ user: req.user.id }).populate('user')
    res.json(deudas)
}

export const createDeudas = async (req, res) => {
    const { title, description, date, monto, categoria, entidad, intereses, estado } = req.body
    const newDeudas = new Deudas({ title, description, date, monto, categoria, entidad, intereses, estado, user: req.user.id })
    const savedDeudas = await newDeudas.save()
    res.json(savedDeudas)
}

export const getDeuda = async (req, res) => {
    const deudas = await Deudas.findById(req.params.id).populate('user')
    if (!deudas) return res.status(404).json({ message: 'ingreso not found' })
    res.json(deudas)
}

export const deleteDeudas = async (req, res) => {
    const deudas = await Deudas.findByIdAndDelete(req.params.id)
    if (!deudas) return res.status(404).json({ message: 'ingreso not found' })
    return res.sendStatus(204)
}

export const updateDeudas = async (req, res) => {
    const deudas = await Deudas.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!deudas) return res.status(404).json({ message: 'ingreso not found' })
    res.json(deudas)
}
