import { requiredString } from '@Common/Models/common';
import { IInstructor } from '@Instructor/instructor.interface';
import { Document, model, Schema } from 'mongoose';

const instructorSchema = new Schema<IInstructor>({
  // _teachedCourses: [
  //   {
  //     ref: 'Course',
  //     type: Schema.Types.ObjectId,
  //   },
  // ],
  _user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
  balance: {
    default: 0,
    type: Number,
  },
  bankAccount: {
    default: {},
    type: {
      accountHolderName: String,
      accountNumber: String,
      bankName: String,
      branchAddress: String,
      branchName: String,
      swiftCode: String,
    },
  },
  biography: String,
  rating: {
    averageRating: {
      max: 5,
      min: 0,
      required: true,
      type: Number,
    },
    reviews: [
      {
        _user: {
          ref: 'User',
          type: Schema.Types.ObjectId,
        },
        comment: String,
        createdAt: Date,
        rating: {
          max: 5,
          min: 0,
          required: true,
          type: Number,
        },
      },
    ],
  },
  socialMedia: {
    default: {},
    type: {
      facebook: String,
      github: String,
      linkedin: String,
      personalWebsite: String,
      twitter: String,
    },
  },
  speciality: String,
  title: String,
});

const instructorModel = model<IInstructor & Document>('Instructor', instructorSchema);

export default instructorModel;
