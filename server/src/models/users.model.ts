import { User } from '@interfaces/users.interface';
import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const SALT_WORK_FACTOR = 10;

const Email: Schema = new Schema({
  address: { type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
  // Change the default to true if you don't need to svalidate a new user's email address
  validated: { type: Boolean, default: false },
});

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      unique: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: Email,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    _instructor: { type: Schema.Types.ObjectId, ref: 'Instructor' },
    _trainee: { type: Schema.Types.ObjectId, ref: 'Trainee' },
    _corporate: { type: Schema.Types.ObjectId, ref: 'Corporate' },
    role: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    profileImage: {
      type: String,
      default: 'https://res.cloudinary.com/dzcmadjl1/image/upload/v1593641365/avatars/avatar-1_tkzq9r.png',
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  next();
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
