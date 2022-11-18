import { Role } from '@enums/role.enum';

export interface IAuth {
  isAuthenticated: boolean;
  token: Token;
  updateToken: (token: Token) => void;
  removeToken: () => void;
}

export type Token = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  role: Role;
};
