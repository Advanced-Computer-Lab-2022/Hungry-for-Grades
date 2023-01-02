import { logger } from '@/Utils/logger';
import { EMAIL_SERVICE, SENDER_MAIL, SENDER_PASSSWORD } from '@Config';
import nodemailer from 'nodemailer';

export async function sendEmail(receiverEmail: string, emailBody: string, emailSubject = 'CanCham Support', attachments = []) {
  const mailTransporter = nodemailer.createTransport({
    host: `smtp.${EMAIL_SERVICE}.com`, // hostname,
    service: EMAIL_SERVICE,
    port: 587,
    auth: {
      pass: SENDER_PASSSWORD,
      user: SENDER_MAIL,
    },
  });

  const mailDetails = {
    from: SENDER_MAIL,
    html: emailBody,
    subject: emailSubject,
    to: receiverEmail,
    attachments,
  };

  mailTransporter.sendMail(mailDetails, err => {
    if (err) {
      logger.error(`Error occured while sending email${err.message}`);
    } else {
      logger.info('Email sent successfully');
    }
  });
}
