import { Role } from '@enums/role.enum';

type Address = {
  city: string;
  country: string;
};

export enum Gender {
  FEMALE = 'female',
  MALE = 'male'
}

export type IUser = {
  _id: string;
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
  updatedAt: string;
  __v: number;
};

export type GenericResponse = {
  status: string;
  message: string;
};

export type ILoginResponse = {
  status: string;
  access_token: string;
};

export type IUserResponse = {
  status: string;
  data: {
    user: IUser;
  };
};
