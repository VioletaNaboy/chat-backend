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
const verifyUser_1 = require("../middleware/verifyUser");
const defaultChat_1 = require("../services/defaultChat");
const router = (0, express_1.Router)();
router.post('/chats', verifyUser_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName } = req === null || req === void 0 ? void 0 : req.body;
    if (!firstName || !lastName) {
        res.status(400).json({ message: 'First and last names are required.' });
        return;
    }
    try {
        const chat = yield Chat_1.default.create({
            firstName,
            lastName,
            createdBy: req.user,
        });
        res.status(201).json(chat);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to create chat', error: err });
    }
}));
router.put('/chats/:id', verifyUser_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    try {
        const updatedChat = yield Chat_1.default.findByIdAndUpdate(id, { firstName, lastName }, { new: true });
        if (!updatedChat) {
            res.status(404).json({ message: 'Chat not found' });
            return;
        }
        res.json(updatedChat);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to update chat', error: err });
    }
}));
router.delete('/chats/:id', verifyUser_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const chat = yield Chat_1.default.findByIdAndDelete(id);
        if (!chat) {
            res.status(404).json({ message: 'Chat not found' });
            return;
        }
        res.json({ message: 'Chat deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to delete chat', error: err });
    }
}));
router.get('/chats', verifyUser_1.verifyUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const chats = yield Chat_1.default.find({ createdBy: req.user });
        ;
        if (chats.length === 0) {
            yield (0, defaultChat_1.createDefaultChats)(req.user);
        }
        res.json(chats);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to fetch chats', error: err });
    }
}));
exports.default = router;
