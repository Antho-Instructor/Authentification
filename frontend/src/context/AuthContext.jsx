import { createContext, useState, useMemo } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const login = useMemo(
    () => (userToken) => {
      setToken(userToken);
    },
    []
  );

  const logout = useMemo(
    () => () => {
      setToken(null);
    },
    []
  );

  const value = useMemo(
    () => ({ token, login, logout }),
    [token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
