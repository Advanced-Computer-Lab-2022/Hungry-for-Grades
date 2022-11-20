import { Types } from 'mongoose';
import { Gender, Role } from './user.enum';
import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  active: boolean;
  address: Address;
  createdAt: Date;
  email: {
    address: string;
    isValidated: Boolean;
  };
  gender: Gender;
  lastLogin: Date;
  name: string;
  password: string;
  phone: string;
  profileImage: string;
  // role: Role;
  username: string;
}

export type Address = {
  city: string;
  country: string;
};
