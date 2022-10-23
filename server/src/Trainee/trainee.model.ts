import { requiredString } from '@/common/Models/common';
import { Trainee } from '@/Trainee/trainee.interface';
import { Document, model, Schema } from 'mongoose';

const traineeSchema = new Schema<Trainee>(
  {
    _cart: {
      _course: {
        ref: 'Course',
        type: Schema.Types.ObjectId,
      },
    },
    _enrolledCourses: [
      {
        _course: {
          ref: 'Course',
          type: Schema.Types.ObjectId,
        },
        dateOfEnrollment: Date,
        notes: [
          {
            content: String,
            createdAt: Date,
            title: String,
          },
        ],
      },
    ],
    _user: {
      ref: 'User',
      type: Schema.Types.ObjectId,
    },
    _wishlist: {
      _course: {
        ref: 'Course',
        type: Schema.Types.ObjectId,
      },
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
    preferredSkills: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const traineeModel = model<Trainee & Document>('Trainee', traineeSchema);

export default traineeModel;
