import { Router, Request, Response } from 'express';
import Chat from '../models/Chat';
import { verifyUser } from '../middleware/verifyUser';
import { JwtPayload } from 'jsonwebtoken';
import { createDefaultChats } from '../services/defaultChat';

export interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

const router = Router();

router.post('/chats', verifyUser, async (req: CustomRequest, res: Response) => {
    const { firstName, lastName } = req?.body;
    if (!firstName || !lastName) {
        res.status(400).json({ message: 'First and last names are required.' });
        return;
    }

    try {
        const chat = await Chat.create({
            firstName,
            lastName,
            createdBy: req.user,
        });
        res.status(201).json(chat);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create chat', error: err });
    }
});

router.put('/chats/:id', verifyUser, async (req: CustomRequest, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            id,
            { firstName, lastName },
            { new: true }
        );
        if (!updatedChat) {
            res.status(404).json({ message: 'Chat not found' });
            return;
        }

        res.json(updatedChat);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update chat', error: err });
    }
});

router.delete('/chats/:id', verifyUser, async (req: CustomRequest, res: Response) => {
    const { id } = req.params;

    try {
        const chat = await Chat.findByIdAndDelete(id);
        if (!chat) {
            res.status(404).json({ message: 'Chat not found' });
            return;
        }

        res.json({ message: 'Chat deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete chat', error: err });
    }
});
router.get('/chats', verifyUser, async (req: CustomRequest, res: Response) => {
    try {
        const chats = await Chat.find({ createdBy: req.user });;

        if (chats.length === 0) {
            await createDefaultChats(req.user);
        }
        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch chats', error: err });
    }
});


export default router;