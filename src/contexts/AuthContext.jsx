import { createContext, useContext, useEffect, useState } from "react";
import { setOnUnauthorized } from "../services/authFetch"; 

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const name = localStorage.getItem("userName");

    if (token && name) {
      setUser({ name });
    }
    setOnUnauthorized(logout);
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem("access_token", token);
    localStorage.setItem("userName", userData.name);
    setUser({ name: userData.name });
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userName");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
