import { Newsletter } from '@/interfaces/newsletter.interface';
import { Document, model, Schema } from 'mongoose';
const newsLetterSchema = new Schema<Newsletter>(
  {
    emails: {
      index: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      required: [true, "can't be blank"],
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const newsLetterModel = model<Newsletter & Document>('Newsletter', newsLetterSchema);

export default newsLetterModel;
