import { Course, Level } from '@Course/course.interface';
import { requiredString } from '@Common/Models/common';
import { Document, model, Schema } from 'mongoose';

const courseSchema = new Schema<Course>(
  {
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
      currency: { ...requiredString, default: 'USD' },
      currentValue: {
        required: true,
        type: Number,
        // get: getCurrentCoursePrice,
      },
      discounts: [
        {
          endDate: Date,
          percentage: Number,
          startDate: Date,
        },
      ],
    },
    rating: {
      // type: {
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
      // },
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
    subcategory: [requiredString],
    thumbnail: requiredString,
    title: requiredString,
  },
  {
    timestamps: true,
    toJSON: { getters: true, virtuals: true },
    toObject: { getters: true, virtuals: true },
  },
);

const courseModel = model<Course & Document>('Course', courseSchema);

export default courseModel;
