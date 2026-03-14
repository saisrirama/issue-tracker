import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const decodedUser = jwtDecode(token);
        setUser({ ...decodedUser, name: decodedUser.sub });
      }
    } catch (error) {
      console.error("Failed to restore auth session", error);
      localStorage.removeItem("token");
      localStorage.removeItem("auth_user");
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const token = await loginUser({ email, password });
    localStorage.setItem("token", token);
    const decodedUser = jwtDecode(token);
    setUser({ ...decodedUser, name: decodedUser.sub });
    return decodedUser;
  };

  const signup = async (userData) => {
    const createdUser = await registerUser(userData);
    return createdUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
