import { requiredString } from '@Common/Models/common';
import { ITrainee } from '@/Trainee/trainee.interface';
import { Document, model, Schema } from 'mongoose';
import { hash, genSalt } from 'bcrypt';
import { Gender } from '@/User/user.enum';
import Email from '@/User/user.schema';

const traineeSchema = new Schema<ITrainee>(
  {
    _cart: [{ ref: 'Course', type: Schema.Types.ObjectId }],
    _enrolledCourses: [
      {
        _course: {
          ref: 'Course',
          type: Schema.Types.ObjectId,
        },
        dateOfEnrollment: Date,
        examGrade: {
          default: 0,
          type: Number,
        },
        notes: [
          {
            content: String,
            createdAt: Date,
            title: String,
          },
        ],
        progress: {
          default: 0,
          type: Number,
        },
      },
    ],
    _wishlist: [{ ref: 'Course', type: Schema.Types.ObjectId }],
    active: {
      default: true,
      type: Boolean,
    },
    address: {
      city: String,
      country: String,
    },
    balance: {
      default: 0,
      type: Number,
    },
    creditCards: [
      {
        cardHolderName: requiredString,
        cardNumber: requiredString,
        cvv: requiredString,
        expirationDate: Date,
      },
    ],
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

    preferredSkills: [
      {
        type: String,
      },
    ],
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
  },
  {
    timestamps: true,
  },
);

traineeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await genSalt();

  //this.lastLogin = new Date();
  this.password = await hash(this.password, salt);
  next();
});

const traineeModel = model<ITrainee & Document>('Trainee', traineeSchema);

export default traineeModel;
