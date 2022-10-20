type AccountTypes = 'Owner' | 'Admin' | 'Manager' | 'Agent';

export type State = {
  isLoading: boolean;
  error: null | {
    inputName: string;
    message: string;
    hint: string;
  };
  validatorToken: null | string;
  userInfo: null | {
    email: string;
    userId?: number;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    address1?: string;
    address2?: string;
    city?: string;
    country?: string;
    profilePic?: string;
  };
  profiles: Array<{
    token: string;
    companyName: string;
    companyId: number;
    role: AccountTypes;
    permissions: Array<string>;
    companyLogo: string;
  }>;
};

export type FormValues = Array<{
  name: string;
  value: string;
}>;

export type ContextType = State & {
  setError: (error: string) => void;
  setValidationError: (error: State['error']) => void;
  login: (
    email: string,
    password: string
  ) => Promise<false | 'profiles' | 'verify' | 'dashboard'>;
  forgotPassword: (email: string) => Promise<boolean>;
  validateToken: (token: string) => Promise<string | false>;
  resetPassword: (email: string, password: string) => Promise<boolean>;
  createAccount: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<string | false>;
  verifyEmail: (code: string) => Promise<boolean>;
  resendCode: (
    email: string
  ) => Promise<'Success' | 'AlreadyVerified' | boolean>;
  socialLogin: (token: string) => Promise<false | 'profiles' | 'dashboard'>;
};
