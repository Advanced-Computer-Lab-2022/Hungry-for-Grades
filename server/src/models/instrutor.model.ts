import { Instructor } from '@/interfaces/instructor.interface';
import { Document, model, Schema } from 'mongoose';
const instructorSchema = new Schema<Instructor>({
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
  biography: {
    required: true,
    type: String,
  },
  contactInfo: {
    ref: 'ContactInfo',
    type: Schema.Types.ObjectId,
  },
  rating: {
    default: [],
    type: {
      overallRating: {
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
            required: true,
            type: String,
          },
        },
      ],
    },
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
  speciality: {
    required: true,
    type: String,
  },
  taughtCourses: [
    {
      ref: 'Course',
      type: Schema.Types.ObjectId,
    },
  ],
  title: {
    required: true,
    type: String,
  },
});

const instructorModel = model<Instructor & Document>('Instructor', instructorSchema);

export default instructorModel;
