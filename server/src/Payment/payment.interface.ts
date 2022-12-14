import { ICourse } from '@/Course/course.interface';
import { ITrainee } from '@/Trainee/trainee.interface';
import { Types } from 'mongoose';

export interface IPayment {
  _courses: PaidCourse[];
  _id: Types.ObjectId;
  amount: number; // total amount of payment (after all discounts) or refund value
  createdAt: Date;
  paymentType: PaymentType;
  trainee: ITrainee;
}

export enum PaymentType {
  CART_PAYMENT = 'CART_PAYMENT',
  REFUND_PAYMENT = 'REFUND_PAYMENT',
}

export interface PaidCourse {
  _course: ICourse | Types.ObjectId;
  discountApplied: number;
  price: number; //after discount
}
