import { ICourse, Level } from '@Course/course.interface';
import { requiredString } from '@Common/Models/common';
import { Document, model, Schema } from 'mongoose';
import * as yt from 'youtube-info-streams';
import { getYoutubeVideoID } from './course.common';
import categories from '@Course/category.json';

//balabizo
const courseSchema = new Schema<ICourse>(
  {
    _instructor: [
      {
        ref: 'Instructor',
        type: Schema.Types.ObjectId,
      },
    ],
    announcements: {
      default: [],
      type: [
        {
          createdAt: Date,
          description: String,
          title: String,
        },
      ],
    },
    captions: [requiredString],
    category: requiredString,
    coupouns: {
      defaut: [],
      type: [
        {
          code: String,
          count: Number,
          discount: Number,
          expiryDate: Date,
        },
      ],
    },
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
    frequentlyAskedQuestions: {
      default: [],
      type: [
        {
          answer: String,
          question: String,
          votes: {
            default: 0,
            type: Number,
          },
        },
      ],
    },
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
        // get: getPrice,
      },
      discounts: {
        default: [],
        type: [
          {
            endDate: Date,
            percentage: Number,
            startDate: Date,
          },
        ],
      },
    },
    rating: {
      averageRating: {
        max: 5,
        min: 0,
        required: true,
        type: Number,
      },
      reviews: [
        {
          _trainee: {
            ref: 'Trainee',
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
    sections: [
      {
        description: String,
        exercises: [
          {
            questions: [
              {
                answer: String,
                options: [{ type: String }],
                question: String,
              },
            ],
            title: String,
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
    versionKey: false,
  },
);

//validate course pre save mongoose middleware

courseSchema.pre('save', async function (next) {
  try {
    // Validate answer is included inside options array in exam
    if (this.isModified('exam')) {
      this.exam.forEach(question => {
        if (!question.options.includes(question.answer)) {
          throw new Error('Answer is not included inside options array in exam');
        }
      });
    }
    // Validate answer is included inside options array in sections exercises
    this.sections.forEach(section => {
      section.exercises.forEach(exercise => {
        exercise.questions.forEach(question => {
          if (!question.options.includes(question.answer)) {
            throw new Error('Answer is not included inside options array in sections exercises');
          }
        });
      });
    });

    // check if category & subcategory are valid ones
    if (this.isModified('category') || this.isModified('subcategory')) {
      const category = categories.find(category => category.name === this.category);
      if (!category) throw new Error('Category is not valid');

      //check subcategory array is valid
      const subcategories = category.subcategory;
      this.subcategory.forEach(subcategory => {
        if (!subcategories.includes(subcategory)) throw new Error(`Subcategory ${subcategory} is not valid`);
      });
    }

    if (this.isModified('price')) {
      // check price.discount is below 100 and above 0
      this.price.discounts.forEach(discount => {
        if (discount.percentage > 100 || discount.percentage < 0) {
          throw new Error('Discount percentage is not valid');
        }
      });
    }

    if (this.isModified('previewVideoURL')) {
      try {
        const videoId = getYoutubeVideoID(this.previewVideoURL);
        const videoInfo = await yt.info(videoId);
        this.previewVideoURL = videoInfo.videoDetails.embed.iframeUrl;
      } catch (error) {
        throw new Error('Video URL is not valid a youtube URL');
      }
    }

    if (this.isModified('sections')) {
      let totalCourseDurationInMins = 0;
      for (let i = 0; i < this.sections.length; i++) {
        for (let j = 0; j < this.sections[i].lessons.length; j++) {
          try {
            const lesson = this.sections[i].lessons[j];
            const videoId = getYoutubeVideoID(lesson.videoURL);

            const videoInfo = await yt.info(videoId);
            this.sections[i].lessons[j].duration = Math.floor(videoInfo.videoDetails.lengthSeconds / 60); // convert to mins
            this.sections[i].lessons[j].videoURL = videoInfo.videoDetails.embed.iframeUrl;
            totalCourseDurationInMins += this.sections[i].lessons[j].duration;
          } catch (error) {
            throw new Error('Video URL is not valid a youtube URL');
          }
        }
      }
      this.duration = Math.floor(totalCourseDurationInMins / 60); // convert to hours
      if (this.duration < 1) this.duration = 1;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const courseModel = model<ICourse & Document>('Course', courseSchema);
export default courseModel;
