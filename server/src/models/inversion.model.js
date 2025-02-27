import mongoose from 'mongoose';

const inversionEsquema = new mongoose.Schema({
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Inversion', inversionEsquema);