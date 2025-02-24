import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/crypto');
        console.log('>>> DB is connected');

    } catch (error) {
        console.log('>>> Error connecting to DB');
        console.log(error);
    }
}

export { connectDB };
