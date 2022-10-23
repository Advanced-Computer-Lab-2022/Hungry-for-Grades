import { Types } from 'mongoose';
import { Gender, Role } from './user.enum';
export interface IUser {
  _corporate?: Types.ObjectId;
  _id: Types.ObjectId;
  active: boolean;
  address: Address;
  createdAt: Date;
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

type Address = {
  city: string;
  country: string;
};
