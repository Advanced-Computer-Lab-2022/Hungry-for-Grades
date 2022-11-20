import { model, Schema } from 'mongoose';
import { IAdmin } from './admin.interface';
import { genSalt, hash } from 'bcrypt';
import { requiredString } from '@/Common/Models/common';
import { Gender } from '@/User/user.enum';
import Email from '@/User/user.schema';

const adminSchema = new Schema<IAdmin>({
  active: {
    default: true,
    type: Boolean,
  },
  address: {
    city: String,
    country: String,
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
    default: 'https://res.cloudinary.com/dzcmadjl1/image/upload/v1593641365/avatars/avatar-1_tkzq9r.png',
    type: String,
  },
  username: {
    match: [/^[a-zA-Z0-9]+$/, ' username is invalid'],
    required: [true, " username can't be blank"],
    type: String,
    unique: true,
  },
});

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
