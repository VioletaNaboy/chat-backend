import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const mongoUrl = process.env.MONGODB_URL;


const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoUrl || '');
        console.log('MongoDB connected');
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${(err as Error).message}`);
        process.exit(1);
    }
};

export default connectDB;
