import { Request, Response } from 'express';
import { STRIPE_PRIVATE_KEY } from '@/Config';
import Stripe from 'stripe';
import CourseService from '@/Course/course.dao';
import TraineeService from '@/Trainee/trainee.dao';
import { getConversionRate, getCourseDiscounts, getCurrencyFromCountry, getPriceAfterDiscount } from '@/Course/course.common';
import { IPayment, PaymentType } from './payment.interface';
import paymentModel from './payment.model';
import { HttpException } from '@/Exceptions/HttpException';
import { logger } from '@/Utils/logger';
import InstructorService from '@/Instructor/instructor.dao';

const stripe = new Stripe(STRIPE_PRIVATE_KEY, { apiVersion: '2022-11-15' });

class PaymentService {
  courseService = new CourseService();
  traineeService = new TraineeService();
  instructorService = new InstructorService();

  // checkout using stripe
  public async checkoutStripe(traineeId: string, country: string): Promise<string> {
    const currency = getCurrencyFromCountry(country);
    // generate line items
    const cartItems = (await this.traineeService.getCart(traineeId, country, 1, 10000)).data;
    const lineItems = cartItems.map(item => {
      return {
        price_data: {
          currency,
          product_data: {
            name: item.title,
          },
          unit_amount: item.price.currentValue * 100,
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      cancel_url: 'http://www.example.com/',
      line_items: lineItems,
      mode: 'payment',

      payment_method_types: ['card'],
      //success_url: `${process.env.CLIENT_URL}/success.html`,
      //cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      success_url: 'http://www.example.com/',
    });

    return session.url;
  }

  // create and save payment upon success
  public async savePayment(traineeId: string, country: string): Promise<void> {
    const cartPaginatedResponse = await this.traineeService.getCart(traineeId, country, 1, 10000);
    // cart is empty
    if (cartPaginatedResponse.totalResults == 0) return;

    // Convert to USD before saving
    const conversionRate = await getConversionRate(country, true);
    const cartItems = cartPaginatedResponse.data.map(course => {
      return {
        _course: course._id,
        discountApplied: getCourseDiscounts(course.price)[0]?.percentage ?? 0,
        price: Math.floor(course.price.currentValue * conversionRate * 100) / 100, // after discount
      };
    });

    // Saving Transaction
    await paymentModel.create(
      {
        _courses: cartItems,
        amount: Math.floor(cartPaginatedResponse.totalCost * conversionRate * 100) / 100,
        paymentType: PaymentType.CART_PAYMENT,
        trainee: traineeId,
      },
      (err: Error) => {
        if (err) {
          logger.error(err.message);
          throw new HttpException(500, 'Error saving payment');
        }
      },
    );

    // Emptying out Cart
    await this.traineeService.emptyCart(traineeId);

    // Enroll trainee in courses
    for (const course of cartItems) {
      await this.traineeService.enrollTrainee(traineeId, course._course.toString());
    }

    // update instructor earnings and balance
    for (const course of cartPaginatedResponse.data) {
      const instructorId = course._instructor[0]?._id ?? course._instructor;
      let earnings = course.price.currentValue * conversionRate * 0.8; // only 80% of the price goes to the instructor
      earnings = Math.floor(earnings * 100) / 100;
      await this.instructorService.updateInstructorEarningAndBalance(instructorId.toString(), course._id.toString(), earnings);
    }
  }

  // delete payment
  public async deletePayment(paymentId: string): Promise<void> {
    const deletedPayment = await paymentModel.findByIdAndDelete(paymentId);
    if (!deletedPayment) throw new HttpException(422, 'Payment not found');
  }
}
export default PaymentService;