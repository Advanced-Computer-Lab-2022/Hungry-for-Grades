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
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { sendEmail } from '@/Common/Email Service/nodemailer.service';

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
    if (cartItems.length === 0) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Cart is empty');

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
      line_items: lineItems,
      mode: 'payment',

      payment_method_types: ['card'],
      //success_url: `${process.env.CLIENT_URL}/success.html`,
      //cancel_url: `${process.env.CLIENT_URL}/cancel.html`,
      success_url: 'http://www.example.com/',
      cancel_url: 'http://www.example.com/',
    });

    return session.url;
  }

  // create and save payment upon success
  public async savePayment(traineeId: string, country: string, walletUsed: boolean): Promise<void> {
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

    // get total cart cost in USD
    const totalCartCost = Math.floor(cartPaginatedResponse.totalCost * conversionRate * 100) / 100;

    // check if wallet is used and deduct from trainee's balance accordingly
    if (walletUsed) {
      const trainee = await this.traineeService.getTraineeById(traineeId);

      // check if wallet balance is enough
      if (trainee.balance < totalCartCost) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Wallet balance is not enough');

      // update wallet balance
      await this.traineeService.updateTraineeBalance(traineeId, -totalCartCost);
    }

    // Saving Transaction
    await paymentModel.create(
      {
        _courses: cartItems,
        amount: totalCartCost, // exact amount paid after all discounts
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

  // get total amount paid each month in a given year for a given instructor
  public async getMonthlyRevenue(instructorId: string, year: number, country: string): Promise<number[]> {
    const conversionRate = await getConversionRate(country);

    // get instructor's courses
    const instructor = await this.instructorService.findInstructorById(instructorId);
    if (!instructor) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Instructor not found');

    // extract teached courses IDs
    const teachedCourses = instructor._teachedCourses.map(teachedCourse => teachedCourse._course.toString());

    // get payments for this given year
    const payments = await paymentModel.find({ createdAt: { $gte: new Date(`${year}-01-01`), $lt: new Date(`${year + 1}-01-01`) } });
    const monthlyPayments = new Array(12).fill(0);

    for (const payment of payments) {
      for (const paidCourse of payment._courses) {
        if (teachedCourses.includes(paidCourse._course.toString())) {
          if (payment.paymentType == PaymentType.CART_PAYMENT)
            monthlyPayments[payment.createdAt.getMonth()] += paidCourse.price * 0.8 * conversionRate; // only 80% of the price goes to the instructor
          else if (payment.paymentType == PaymentType.REFUND_PAYMENT)
            //payment.amount represents refund amount (70% of the paid course price)
            // 30% of paid price remain of which 80% goes to the instructor
            monthlyPayments[payment.createdAt.getMonth()] -= (payment.amount / 0.7) * 0.3 * 0.8;
        }
      }
    }

    // round to 2 decimal places
    for (let i = 0; i < monthlyPayments.length; i++) {
      monthlyPayments[i] = Math.floor(monthlyPayments[i] * 100) / 100;
    }
    return monthlyPayments;
  }

  // refund payment
  public async refundPayment(traineeId: string, courseId: string): Promise<void> {
    // check if trainee is enrolled in the course
    const enrolledCourse = await this.traineeService.getEnrolledCourseById(traineeId, courseId);
    if (!enrolledCourse) throw new HttpException(422, 'Trainee is not enrolled in this course');

    // const traineeProgress=enrolledCourse?.progress ??0;
    // if(traineeProgress<50) throw new HttpException(422, 'Refund is not allowed before 50% of the course is completed');

    // get payment where trainee bought this course
    const payment = await paymentModel.findOne({ '_courses._course': courseId, trainee: traineeId });
    if (!payment) throw new HttpException(422, 'Trainee did not buy this course');

    // get price trainee paid for this course
    const paidPrice = payment._courses.find(PaidCourse => PaidCourse._course.toString() == courseId).price;

    let refundAmount = paidPrice * 0.7; // only 70% of the price is refunded (refund amount in $)
    refundAmount = Math.floor(refundAmount * 100) / 100; // round to 2 decimal places

    // update trainee balance
    await this.traineeService.updateTraineeBalance(traineeId, refundAmount);

    // update instructor balance
    const oldProfit = paidPrice * 0.8; // only 80% of the price goes to the instructor
    const newProfit = paidPrice * 0.3 * 0.8; // 30% only remain after refund and only 80% of the price goes to the instructor

    const instructorId = enrolledCourse._course._instructor[0]?._id ?? enrolledCourse._course._instructor;
    await this.instructorService.adjustBalanceAfterRefund(instructorId.toString(), courseId, oldProfit, newProfit);

    // create refund payment
    await paymentModel.create(
      {
        _courses: [
          {
            _course: courseId,
            discountApplied: 0,
            price: paidPrice,
          },
        ],
        amount: refundAmount,
        paymentType: PaymentType.REFUND_PAYMENT,
        trainee: traineeId,
      },
      (err: Error) => {
        if (err) {
          logger.error(err.message);
          throw new HttpException(500, 'Error saving payment');
        }
      },
    );
  }
}
export default PaymentService;
