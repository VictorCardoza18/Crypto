import mongoose from 'mongoose';

const tarjetaSchema = new mongoose.Schema({
    numeroTarjeta: {
        type: String,
        required: true,
        minlength: 16,
        maxlength: 16,
    },
    nombreTarjeta: {
        type: String,
        required: true
    },
    fechaExp: {
        type: Date,
        required: true
    },
    cvv: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 4,
    },
    limiteCredito: {
        type: String,
        optional: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Tarjeta', tarjetaSchema);