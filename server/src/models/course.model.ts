import {
  Course,
  level,
} from '@/interfaces/course.interface';
import {
  requiredNumber,
  requiredString,
} from '@models/common';
import {
  Document,
  model,
  Schema,
} from 'mongoose';
const courseSchema = new Schema<Course>(
  {
    _corporate: [
      {
        ref: 'Corporate',
        type: Schema.Types.ObjectId,
      },
    ],
    _instructor: {
      ref: 'Instructor',
      type: Schema.Types.ObjectId,
    },
    anouncments: [
      {
        createdAt: Date,
        description: String,
        title: String,
      },
    ],
    captions: [requiredString],
    category: requiredString,
    coupouns: [
      {
        code: String,
        count: Number,
        discount: Number,
        expiryDate: Date,
      },
    ],
    description: requiredString,
    duration: {
      required: true,
      type: Number,
    },
    keywords: [
      {
        type: String,
      },
    ],
    language: requiredString,
    level: {
      enum: Object.values(level),
      required: true,
      type: String,
    },
    outlines: [
      {
        type: String,
      },
    ],
    previewVideo: requiredString,
    price: {
      currency: requiredString,
      value: requiredNumber,
    },
    rating: {
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
    sections: [
      {
        description: String,
        lessons: [
          {
            description: String,
            duration: Number,
            title: String,
            video: String,
          },
        ],
        title: requiredString,
      },
    ],
    subcategory: requiredString,
    thumbnail: requiredString,
    title: requiredString,
  },
  {
    timestamps: true,
  },
);

const courseModel = model<Course & Document>(
  'Course',
  courseSchema,
);

export default courseModel;
