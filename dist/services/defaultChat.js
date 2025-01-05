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
exports.createDefaultChats = void 0;
const Chat_1 = __importDefault(require("../models/Chat"));
const createDefaultChats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const defaultChats = [
        { name: 'General Chat', createdBy: userId },
        { name: 'Work Chat', createdBy: userId },
        { name: 'Friends Chat', createdBy: userId },
    ];
    for (let chat of defaultChats) {
        yield Chat_1.default.create(chat);
    }
});
exports.createDefaultChats = createDefaultChats;
