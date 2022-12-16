import { Document, model, Schema } from 'mongoose';
import { IPayment, PaymentType } from './payment.interface';

const paymentSchema = new Schema<IPayment>(
  {
    _courses: [
      {
        _course: {
          ref: 'Course',
          type: Schema.Types.ObjectId,
        },
        discountApplied: Number,
        price: Number, //after discount
      },
    ],
    amount: Number,
    paymentType: {
      enum: Object.values(PaymentType),
      required: true,
      type: String,
    },
    trainee: {
      ref: 'Trainee',
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const paymentModel = model<IPayment & Document>('Payment', paymentSchema);
export default paymentModel;
