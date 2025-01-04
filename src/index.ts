import dotenv from 'dotenv';
import connectDB from './db';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
