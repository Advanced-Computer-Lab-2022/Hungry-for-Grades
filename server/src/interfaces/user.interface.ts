import { Types } from 'mongoose';

export enum Role {
  ADMIN = 'admin',
  CORPORATE = 'corporate',
  INSTRUCTOR = 'instructor',
  TRAINEE = 'trainee',
}

export interface User {
  _corporate?: Types.ObjectId;
  _id: Types.ObjectId;
  _instructor?: Types.ObjectId;
  _trainee?: Types.ObjectId;
  active: boolean;
  address: Address;
  createdAt: Date;
  email: {
    address: string;
    isValidated: boolean;
  };
  gender: 'Male' | 'Female';
  name: string;
  password: string;
  phone: string;
  profileImage: string;
  role: Role;
  username: string;
}

type Address = {
  city: string;
  country: string;
};
