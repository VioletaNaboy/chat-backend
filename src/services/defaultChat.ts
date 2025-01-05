import Chat from "../models/Chat";

export const createDefaultChats = async (userId: any) => {
    const defaultChats = [
        { name: 'General Chat', createdBy: userId },
        { name: 'Work Chat', createdBy: userId },
        { name: 'Friends Chat', createdBy: userId },
    ];

    for (let chat of defaultChats) {
        await Chat.create(chat);
    }
};