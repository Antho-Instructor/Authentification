import { createContext, useMemo } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const login = useMemo(
    () => () => {
      sessionStorage.setItem("logged_user", true);
    },
    []
  );

  const logout = useMemo(
    () => () => {
      sessionStorage.removeItem("logged_user");
    },
    []
  );

  const value = useMemo(() => ({ login, logout }), [login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
