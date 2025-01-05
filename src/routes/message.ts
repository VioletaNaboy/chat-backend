import { Router, Request, Response } from 'express';
import Chat from '../models/Chat';
import Message from '../models/Message';
import { verifyUser } from '../middleware/verifyUser';
import { getRandomQuote } from '../services/getRandomQuote';
import { CustomRequest } from './chat';

const router = Router();

router.post('/messages', verifyUser, async (req: CustomRequest, res: Response) => {
    const { chatId, content } = req.body;

    try {
        const message = await Message.create({
            chatId,
            sender: 'user',
            content,
        });

        await Chat.findByIdAndUpdate(chatId, { $push: { messages: message.id } });

        setTimeout(async () => {
            const botMessage = await Message.create({
                chatId,
                sender: 'bot',
                content: await getRandomQuote(),
            });
            await Chat.findByIdAndUpdate(chatId, { $push: { messages: botMessage.id }, $set: { lastMessage: botMessage.content } }
            );
        }, 3000);

        res.json(message);
    } catch (err) {
        res.status(500).json({ message: 'Failed to send message', error: err });
    }
});

router.put('/messages/:messageId', verifyUser, async (req: CustomRequest, res: Response) => {
    const { messageId } = req.params;
    const { content } = req.body;

    try {
        const message = await Message.findById(messageId);

        if (!message) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }

        if (message.sender !== 'user') {
            res.status(403).json({ message: 'You can only update your own messages' });
            return;
        }

        message.content = content;
        await message.save();

        res.status(200).json(message);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update message', error: err });
    }
});

export default router;
