import { Role, User } from '@interfaces/users.interface';
import bcrypt from 'bcrypt';
import { Document, model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const SALT_WORK_FACTOR = 10;

const Email: Schema = new Schema({
  address: { index: true, lowercase: true, match: [/\S+@\S+\.\S+/, 'is invalid'], required: [true, "can't be blank"], type: String },
  // Change the default to true if you don't need to svalidate a new user's email address
  validated: { default: false, type: Boolean },
});

const userSchema = new Schema<User>(
  {
    _corporate: { ref: 'Corporate', type: Schema.Types.ObjectId },
    _instructor: { ref: 'Instructor', type: Schema.Types.ObjectId },
    _trainee: { ref: 'Trainee', type: Schema.Types.ObjectId },
    active: {
      default: true,
      type: Boolean,
    },
    email: {
      required: true,
      type: Email,
      unique: true,
    },
    name: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    profileImage: {
      default: 'https://res.cloudinary.com/dzcmadjl1/image/upload/v1593641365/avatars/avatar-1_tkzq9r.png',
      type: String,
    },
    role: {
      required: true,
      enum: Object.values(Role),
      type: String,
    },
    username: {
      index: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      required: [true, "can't be blank"],
      type: String,
      unique: true,
    },
    gender: {
      enum: ['Male', 'Female'],
      type: String,
      required: true,
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
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
