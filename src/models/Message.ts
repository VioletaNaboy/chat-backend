import mongoose, { Schema, Document } from 'mongoose';


interface Message extends Document {
    chatId: mongoose.Types.ObjectId;
    sender: string;
    content: string;
}

const MessageSchema = new Schema<Message>({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: String, enum: ['user', 'bot'], required: true },
    content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<Message>('Message', MessageSchema);
