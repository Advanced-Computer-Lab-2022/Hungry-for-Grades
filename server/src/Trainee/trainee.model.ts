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
        _id: false,
        _submittedQuestions: [
          {
            _id: false,
            _questionId: Schema.Types.ObjectId,
            submittedAnswer: String,
          },
        ],
        _visitedLessons: [{ ref: 'Lesson', type: Schema.Types.ObjectId }],
        dateOfCompletion: Date,
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
    _lastViewedCourse: {
      ref: 'Course',
      type: Schema.Types.ObjectId,
    },
    _wishlist: [{ ref: 'Course', type: Schema.Types.ObjectId }],

    active: {
      default: true,
      type: Boolean,
    },
    balance: {
      default: 0,
      type: Number,
    },
    country: String,
    creditCards: [
      {
        cardHolderName: requiredString,
        cardNumber: requiredString,
        cvv: requiredString,
        expirationDate: Date,
      },
    ],
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
    isCorporate: {
      default: false,
      type: Boolean,
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
    timestamps: true,
    versionKey: false,
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
