import dotenv from 'dotenv';
import connectDB from './config/db';
import app from './app';
import passport from 'passport';
import session from 'express-session';
import './config/passport';

import authRoutes from './routes/auth';

dotenv.config();

const PORT = process.env.PORT || 5000;


app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);


const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
