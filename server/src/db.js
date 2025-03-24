import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/crypto');
        console.log('>>> DB is connected');

    } catch (error) {
        console.log('>>> Error connecting to DB');
        console.log(error);
    }
}

export { connectDB };
