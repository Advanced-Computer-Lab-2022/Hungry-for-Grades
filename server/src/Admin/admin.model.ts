import { model, Schema } from 'mongoose';
import { IAdmin } from './admin.interface';
import { genSalt, hash } from 'bcrypt';
import { requiredString } from '@/Common/Models/common';
import { Gender } from '@/User/user.enum';
import Email from '@/User/user.schema';
const adminSchema = new Schema<IAdmin>(
  {
    active: {
      default: true,
      type: Boolean,
    },
    country: String,
    dateOfBirth: {
      trim: true,
      type: Date,
    },
    email: {
      required: true,
      type: Email,
    },
    gender: {
      enum: Object.values(Gender),
      type: String,
    },
    lastLogin: {
      type: Date,
    },
    name: requiredString,
    password: { ...requiredString, minlength: 8 },
    phone: String,
    profileImage: {
      default: 'https://i.stack.imgur.com/l60Hf.png',
      type: String,
    },
    username: {
      match: [/^[a-zA-Z0-9]+$/, ' username is invalid'],
      required: [true, " username can't be blank"],
      type: String,
      unique: true,
    },
  },
  {
    versionKey: false,
  },
);

adminSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await genSalt();

  // this.lastLogin = new Date();
  this.password = await hash(this.password, salt);
  next();
});

const adminModel = model<IAdmin>('Admin', adminSchema);
export default adminModel;
