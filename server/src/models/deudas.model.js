import mongoose from 'mongoose';

const deudasEsquema = new mongoose.Schema({
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
    entidad: {
        type: String,
        required: true
    },
    intereses: {
        type: Number,
        required: true
    },   
     estado: {
        type: String,
        required: true
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Deudas', deudasEsquema);