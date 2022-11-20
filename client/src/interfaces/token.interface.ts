import { Role } from '@enums/role.enum';

export interface IAuth {
  isAuthenticated: boolean;
  token: IToken;
  updateToken: (token: IToken) => void;
  removeToken: () => void;
  refresh: () => void;
}

export type IToken = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  role: Role;
};
