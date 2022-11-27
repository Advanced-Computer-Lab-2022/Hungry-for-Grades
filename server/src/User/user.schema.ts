import { Schema } from 'mongoose';

const Email: Schema = new Schema(
  {
    address: {
      lowercase: true,
      match: [/\S+@\S+\.\S+/, ' Email is invalid'],
      required: [true, " Email can't be left blank"],
      type: String,
    },
    isVerified: {
      default: false,
      type: Boolean,
    },
  },
  { _id: false },
);
export default Email;
