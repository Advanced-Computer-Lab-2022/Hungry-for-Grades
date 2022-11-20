import { Gender } from '@/enums/gender.enum';

export type UserFormProps = {
  key?: string;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  gender: Gender;
  country: string;
};
export type ButtonDirectionProps = {
  firstName: string;
  updateData: (data: UserFormProps) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  next: () => void;
  prev: () => void;
};

export type AddressFormProps = {
  key?: string;
};

export type AccountFormProps = {
  key?: string;
  email: {
    address: string;
  };
  username: string;
  password: string;
};

export type SignupData = UserFormProps & AddressFormProps & AccountFormProps;
export type UpdateSignupData =
  | UserFormProps
  | AddressFormProps
  | AccountFormProps;
