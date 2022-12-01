import { type INewsletter } from '@/NewsLetter/newsletter.interface';
import { Document, model, Schema } from 'mongoose';
const newsLetterSchema = new Schema<INewsletter>(
  {
    email: {
      index: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      required: [true, "can't be blank"],
      type: String,
      unique: [true, 'email is taken'],
    },
    role: {
      enum: ['admin', 'guest', 'instructor', 'trainee'],
      required: true,
      type: String,
    },
  },
  { versionKey: false },
);

const newsLetterModel = model<INewsletter & Document>('Newsletter', newsLetterSchema);

export default newsLetterModel;
