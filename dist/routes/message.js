"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Chat_1 = __importDefault(require("../models/Chat"));
const Message_1 = __importDefault(require("../models/Message"));
const verifyUser_1 = require("../middleware/verifyUser");
const getRandomQuote_1 = require("../services/getRandomQuote");
const router = (0, express_1.Router)();
router.post('/messages', verifyUser_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, content } = req.body;
    try {
        const message = yield Message_1.default.create({
            chatId,
            sender: 'user',
            content,
        });
        yield Chat_1.default.findByIdAndUpdate(chatId, { $push: { messages: message.id } });
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            const botMessage = yield Message_1.default.create({
                chatId,
                sender: 'bot',
                content: yield (0, getRandomQuote_1.getRandomQuote)(),
            });
            yield Chat_1.default.findByIdAndUpdate(chatId, { $push: { messages: botMessage.id }, $set: { lastMessage: botMessage.content } });
        }), 3000);
        res.json(message);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to send message', error: err });
    }
}));
router.put('/messages/:messageId', verifyUser_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = req.params;
    const { content } = req.body;
    try {
        const message = yield Message_1.default.findById(messageId);
        if (!message) {
            res.status(404).json({ message: 'Message not found' });
            return;
        }
        if (message.sender !== 'user') {
            res.status(403).json({ message: 'You can only update your own messages' });
            return;
        }
        message.content = content;
        yield message.save();
        res.status(200).json(message);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to update message', error: err });
    }
}));
exports.default = router;
