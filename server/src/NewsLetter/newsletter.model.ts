import { type INewsletter } from '@/NewsLetter/newsletter.interface';
import { Document, model, Schema } from 'mongoose';
const newsLetterSchema = new Schema<INewsletter>(
  {
    email: {
      lowercase: true,
      match: [/\S+@\S+\.\S+/, ' Email is invalid'],
      required: [true, "can't be blank"],
      type: String,
    },
    role: {
      enum: ['admin', 'guest', 'instructor', 'trainee'],
      required: true,
      type: String,
    },
  },
  { versionKey: false }
);

const newsLetterModel = model<INewsletter & Document>('Newsletter', newsLetterSchema);

export default newsLetterModel;
