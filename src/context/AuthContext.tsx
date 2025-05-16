import React, { createContext, useContext, useState, ReactNode } from "react";

// Define a simple user type
interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // For demo: get user from localStorage/sessionStorage if available
  const storedName = localStorage.getItem("userName") || sessionStorage.getItem("userName");
  const storedEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
  const [user, setUser] = useState<User | null>(
    storedName && storedEmail ? { name: storedName, email: storedEmail } : null
  );

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 