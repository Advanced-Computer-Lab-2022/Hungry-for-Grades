import { Gender } from '@/enums/gender.enum';
import { Role } from '@enums/role.enum';

interface IUser {
  _id: string;
  email: {
    address: string;
    isValidated: boolean;
  };
  gender: Gender;
  lastLogin: Date;
  name: string;
  password: string;
  phone: string;
  profileImage: string;
  role: Role;
  username: string;
}
export type Address = {
  city: string;
  country: string;
};

export type GenericResponse = {
  status: string;
  message: string;
};

export type ILoginResponse = {
  status: string;
  message: string;
  access_token: string;
};

export type IUserResponse = {
  status: string;
  data: {
    user: IUser;
  };
};

export type SubmittedQuestion = {
  _questionId: string;
  submittedAnswer: string;
};

export type Reminder = {
  date: Date;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly';
  message: string;
  name: string;
  time: string;
};

export type Note = {
  content: string;
  createdAt: Date;
  title: string;
};

export type CreditCard = {
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expirationDate: Date;
};

export { type IUser };
