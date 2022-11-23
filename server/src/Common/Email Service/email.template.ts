import handlebars from 'handlebars';
import path from 'path';
import { EmailType } from './email.enum';
import fs from 'fs';
import { sendEmail } from './nodemailer.service';
import sanitizeHtml from 'sanitize-html';

export function sendVerificationEmail(traineeEmail: string, username: string, code: number) {
  const emailBody = prepareVerifyEmailHTML(username, code);
  sendEmail(traineeEmail, emailBody, 'CanCham Support - Verification Email');
}

function prepareVerifyEmailHTML(username: string, code: number): string {
  const filePath = path.join(__dirname, '/templates/VerifyEmail.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    code,
    username,
  };
  const htmlToSend = template(replacements);
  return htmlToSend;
}

export function prepareForgetPasswordHTML(): string {
  const filePath = path.join(__dirname, '/templates/ForgetPassword.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {};
  const htmlToSend = template(replacements);
  return htmlToSend;
}

export function prepareDiscountHTML(): string {
  const filePath = path.join(__dirname, '/templates/Discount.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {};
  const htmlToSend = template(replacements);
  return htmlToSend;
}
