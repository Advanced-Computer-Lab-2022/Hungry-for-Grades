import handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import { sendEmail } from './nodemailer.service';
import { COMPANY_FACEBOOK, COMPANY_INSTAGRAM, COMPANY_TWITTER, COMPANY_LOGO, COMPANY_LINKEDIN, CLIENT_URL } from '@/Config';
import { Role } from '@/User/user.enum';

export function sendVerificationEmail(traineeEmail: string, username: string, code: number) {
  const emailBody = getVerifyEmailHTML(username, code);
  sendEmail(traineeEmail, emailBody, 'CanCham Support - Verification Email');
}

function getVerifyEmailHTML(username: string, code: number): string {
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

export function sendResetPasswordEmail(traineeEmail: string, username: string, userId: string, role: Role) {
  const emailBody = getForgetPasswordHTML(username, userId, role);
  sendEmail(traineeEmail, emailBody, 'CanCham Support - Password Reset');
}

export function getForgetPasswordHTML(username: string, userId: string, role: Role): string {
  const filePath = path.join(__dirname, '/templates/ForgetPassword.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {
    facebook: COMPANY_FACEBOOK,
    instagram: COMPANY_INSTAGRAM,
    linkedin: COMPANY_LINKEDIN,
    logo: COMPANY_LOGO,
    redirectURL: `${CLIENT_URL}auth/change-password/${userId}?role=${role}`,
    twitter: COMPANY_TWITTER,
    username,
  };
  const htmlToSend = template(replacements);
  return htmlToSend;
}

export function getDiscountHTML(): string {
  const filePath = path.join(__dirname, '/templates/Discount.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const template = handlebars.compile(source);
  const replacements = {};
  const htmlToSend = template(replacements);
  return htmlToSend;
}
