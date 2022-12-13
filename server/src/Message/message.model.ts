import { model, Schema, Document } from 'mongoose';
import { IMessage } from './message.interface';
const MessageSchema = new Schema<IMessage>(
  {
    message: {
      text: { required: true, type: String },
    },
    sender: {
      ref: 'Trainee',
      required: true,
      type: Schema.Types.ObjectId,
    },
    users: Array,
  },
  {
    timestamps: true,
  },
);

const messageModel = model<IMessage & Document>('Messages', MessageSchema);
export default messageModel;
