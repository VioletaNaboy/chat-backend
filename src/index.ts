import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

import connectDB from './config/db';
import app from './app';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './config/passport';

import authRoutes from './routes/auth';
import chatsRoutes from './routes/chat';
import messageRoutes from './routes/message'

dotenv.config();

const PORT = process.env.PORT || 5000;

const secret = process.env.JWT_SECRET as string || 'default-secret';
app.use(cookieParser());

app.use(
    session({
        secret: secret,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
    })
); app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api', chatsRoutes);
app.use('/api', messageRoutes);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
