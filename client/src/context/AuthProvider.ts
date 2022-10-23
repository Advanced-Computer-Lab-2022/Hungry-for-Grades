import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  login: (data: number) => {
		alert(data)
	},
  logout: () => {}
});

export const AuthProvider = AuthContext.Provider;
