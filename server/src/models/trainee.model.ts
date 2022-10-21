import { Trainee } from '@interfaces/trainee.interface';
import { Document, model, Schema } from 'mongoose';

const traineeSchema = new Schema<Trainee>(
  {
    _cart: {
      _course: {
        ref: 'Course',
        type: Schema.Types.ObjectId,
      },
    },
    _corporate: [
      {
        ref: 'Corporate',
        type: Schema.Types.ObjectId,
      },
    ],
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
        cardHolderName: String,
        cardNumber: String,
        cvv: String,
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
