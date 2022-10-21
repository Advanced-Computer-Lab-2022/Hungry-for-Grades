import { Course, Level } from '@/interfaces/course.interface';
import { requiredNumber, requiredString } from '@models/common';
import { Document, model, Schema } from 'mongoose';

const courseSchema = new Schema<Course>(
  {
    _corporate: [
      {
        ref: 'Corporate',
        type: Schema.Types.ObjectId,
      },
    ],
    _instructor: [
      {
        ref: 'Instructor',
        type: Schema.Types.ObjectId,
      },
    ],
    announcements: [
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
    exam: [
      {
        answer: String,
        options: [{ type: String }],
        question: String,
      },
    ],
    frequentlyAskedQuestions: [
      {
        answer: String,
        question: String,
        votes: Number,
      },
    ],
    keywords: [
      {
        type: String,
      },
    ],
    language: requiredString,
    level: {
      enum: Object.values(Level),
      required: true,
      type: String,
    },
    numberOfEnrolledTrainees: {
      default: 0,
      type: Number,
    },
    outline: [
      {
        type: String,
      },
    ],
    previewVideoURL: requiredString,
    price: {
      currency: requiredString,
      currentValue: requiredNumber,
      discounts: [
        {
          endDate: Date,
          percentage: Number,
          startDate: Date,
        },
      ],
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
              type: Number,
            },
          },
        ],
      },
    },
    sections: [
      {
        description: String,
        exercises: [
          {
            answer: String,
            options: [{ type: String }],
            question: String,
          },
        ],
        lessons: [
          {
            description: String,
            duration: Number,
            title: String,
            videoURL: String,
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

const courseModel = model<Course & Document>('Course', courseSchema);

export default courseModel;