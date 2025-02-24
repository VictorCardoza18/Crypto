import Adeudo from '../models/adeudos.model.js';

export const getAdeudos = async (req, res) => {
    const adeudos = await Adeudo.find({ user: req.user.id }).populate('user')
    res.json(adeudos)
}

export const createAdeudo = async (req, res) => {
    const { nombreAdeudo, descripcion, monto, categoria, fecha, idTarjeta } = req.body
    const newAdeudo = new Adeudo({ nombreAdeudo, monto, descripcion, categoria, fecha, user: req.user.id, idTarjeta: idTarjeta })
    const savedAdeudo = await newAdeudo.save()
    res.json(savedAdeudo)
}

export const getAdeudo = async (req, res) => {
    const adeudo = await Adeudo.findById(req.params.id).populate('user')
    if (!adeudo) return res.status(404).json(['Adeudo not found'])
    res.json(adeudo)
}

export const deleteAdeudo = async (req, res) => {
    const adeudo = await Adeudo.findByIdAndDelete(req.params.id)
    if (!adeudo) return res.status(404).json(['Adeudo not found'])
    return res.sendStatus(204)
}

export const updateAdeudo = async (req, res) => {
    try {
        console.log(req.body)
        const adeudo = await Adeudo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!adeudo) return res.status(404).json(['Adeudo not found'])
        res.json(adeudo)
    }
    catch (error) {
        console.log(error);
    }
}
