import { logger } from '@/Utils/logger';
import { EMAIL_SERVICE, SENDER_MAIL, SENDER_PASSSWORD } from '@Config';
import nodemailer from 'nodemailer';

export function sendEmail(receiverEmail: string, emailBody: string, emailSubject = 'CanCham Support', attachments = []) {
  const mailTransporter = nodemailer.createTransport({
    auth: {
      pass: SENDER_PASSSWORD,
      user: SENDER_MAIL,
    },
    service: EMAIL_SERVICE,
  });

  const mailDetails = {
    from: SENDER_MAIL,
    html: emailBody,
    subject: emailSubject,
    to: receiverEmail,
    attachments,
  };

  mailTransporter.sendMail(mailDetails, (err, data) => {
    if (err) {
      logger.error(`Error occured while sending email${err.message}`);
      // console.log('Error Occurs while sending email', err.message);
    } else {
      console.log('Email sent successfully');
    }
  });
}
