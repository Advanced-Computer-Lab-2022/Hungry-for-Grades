export type UserFormProps = {
  key?: string;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  gender: 'Male' | 'Female';
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
  address: string;
  city: string;
  state: string;
  zip: string;
};
export type AccountFormProps = {
  key?: string;
  email: string;
  password: string;
};

export type SignupData = UserFormProps & AddressFormProps & AccountFormProps;
export type UpdateSignupData =
  | UserFormProps
  | AddressFormProps
  | AccountFormProps;
