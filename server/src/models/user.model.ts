import { Role, User } from '@/interfaces/user.interface';
import { requiredString } from '@models/common';
import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const SALT_WORK_FACTOR = 10;

const Email: Schema = new Schema({
  address: {
    index: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    required: [true, "can't be blank"],
    type: String,
  },
  // Change the default to true if you don't need to validate a new user's email address upon registration
  isValidated: {
    default: false,
    type: Boolean,
  },
});

const userSchema = new Schema<User>(
  {
    _corporate: {
      ref: 'Corporate',
      type: Schema.Types.ObjectId,
    },
    _instructor: {
      ref: 'Instructor',
      type: Schema.Types.ObjectId,
    },
    _trainee: {
      ref: 'Trainee',
      type: Schema.Types.ObjectId,
    },
    active: {
      default: true,
      type: Boolean,
    },
    address: {
      city: requiredString,
      country: requiredString,
    },
    email: {
      required: true,
      type: Email,
      unique: true,
    },
    gender: {
      enum: ['Male', 'Female'],
      required: true,
      type: String,
    },
    name: requiredString,
    password: requiredString,
    phone: requiredString,
    profileImage: {
      default: 'https://res.cloudinary.com/dzcmadjl1/image/upload/v1593641365/avatars/avatar-1_tkzq9r.png',
      type: String,
    },
    role: {
      enum: Object.values(Role),
      required: true,
      type: String,
    },
    username: {
      index: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      required: [true, "can't be blank"],
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(uniqueValidator, {
  message: 'is already taken.',
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
  next();
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
