import { IUser } from '@/interfaces/user.interface';

export type State = {
  user: IUser | null;
  isAuthenticated: boolean;
  token: {
    ACCESS_TOKEN: string;
    REFRESH_TOKEN: string;
  };
};

export type ContextType = State & {
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
