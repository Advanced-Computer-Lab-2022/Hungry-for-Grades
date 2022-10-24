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
      currency: requiredString,
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
      type: {
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
    toJSON: { getters: true },
    toObject: { getters: true },
  },
);

const courseModel = model<Course & Document>('Course', courseSchema);

// function getCurrentCoursePrice() {
//   console.log('entered here');
//   return 1000;
//   const discountAvailable = this.price.dicounts.filter(discount => {
//     return Date.now() >= discount.startDate.getTime() && Date.now() <= discount.endDate.getTime();
//   });
//   let result = 0;
//   if (discountAvailable.length == 0)
//     // No discounts are available on the course
//     result = this.price.currentValue; // Original Value Returned
//   else result = ((100 - discountAvailable[0].percentage) / 100) * this.price.currentValue;
//   return Math.round(result * 100) / 100; // round to 2 decimal places
// }

export default courseModel;
