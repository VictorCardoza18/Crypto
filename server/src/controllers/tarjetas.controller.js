import Tarjeta from '../models/tarjetas.model.js';

export const getTarjetas = async (req, res) => {
    try {
        const tarjeta = await Tarjeta.find({ user: req.user.id }).populate('user')
        res.json(tarjeta)
    } catch (error) {
        res.status(404).json(['Cannot get tarjetas'])
    }
}

export const createTarjeta = async (req, res) => {
    try {
        const { numeroTarjeta, nombreTarjeta, fechaExp, cvv, limiteCredito } = req.body
        const newTarjeta = new Tarjeta({ numeroTarjeta, nombreTarjeta, fechaExp, cvv, limiteCredito, user: req.user.id })
        const savedTarjeta = await newTarjeta.save()
        res.json(savedTarjeta)
    } catch (error) {
        console.log(error)
        res.status(400).json(['Tarjeta not saved'])
    }
}

export const getTarjeta = async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findById(req.params.id).populate('user')
        if (!tarjeta) return res.status(404).json(['Tarjeta not found'])
        res.json(tarjeta)
    } catch (error) {
        res.status(404).json(['Cannot get tarjeta'])
    }
}

export const deleteTarjeta = async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findByIdAndDelete(req.params.id)
        if (!tarjeta) return res.status(404).json(['Tarjeta not found'])
        res.status(204).json(['Tarjeta deleted'])
    } catch (error) {
        res.status(404).json(['Tarjeta not found'])
    }
}

export const updateTarjeta = async (req, res) => {
    try {
        const tarjeta = await Tarjeta.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!tarjeta) return res.status(404).json(['Tarjeta not found'])
        res.json(tarjeta)
    } catch (error) {
        console.log(error)
        res.status(404).json(['Cannot update tarjeta'])
    }
}
