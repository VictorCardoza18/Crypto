import mongoose from 'mongoose';

const adeudoSchema = new mongoose.Schema({
    nombreAdeudo: {
        type: String,
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
    descripcion: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    idTarjeta: {
        type: String,
        optional: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Adeudo', adeudoSchema);