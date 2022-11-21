import { Role } from '@enums/role.enum';

export interface IAuth {
  isAuthenticated: boolean;
  token: IToken;
  setToken: (token: IToken) => void;
  updateAccessToken: (accessToken: string) => void;
  removeToken: () => void;
}

export type IToken = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  role: Role;
};
