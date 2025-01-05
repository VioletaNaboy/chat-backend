import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../services/authService';
import { IUser } from '../models/User';
import Chat from '../models/Chat';
import { createDefaultChats } from '../services/defaultChat';



const router = Router();


router.get('/google', passport.authenticate('google', { scope: ['email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    async (req, res) => {
        if (req.isAuthenticated()) {

            const user = req.user as IUser;
            const token = generateToken(user?.googleId as string);
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });

            const existingChats = await Chat.find({ createdBy: user.googleId });

            if (existingChats.length === 0) {
                await createDefaultChats(user.googleId);
            }

            res.status(200).json({ message: 'Logged in successfully', user: req.user });
        } else { res.status(401).json({ message: 'Authentication failed' }); }
    });

export default router;
