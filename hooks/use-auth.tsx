"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers = [
  { id: "1", email: "admin@example.com", password: "admin123", fullName: "Admin User" },
  { id: "2", email: "user@example.com", password: "user123", fullName: "Test User" }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const mockUser = mockUsers.find(u => u.email === email && u.password === password);
    if (mockUser) {
      const user = { id: mockUser.id, email: mockUser.email, fullName: mockUser.fullName };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
      return true;
    }
    return false;
  };

  const register = async (fullName: string, email: string, password: string): Promise<boolean> => {
    if (mockUsers.find(u => u.email === email)) {
      return false;
    }
    const newUser = { id: Date.now().toString(), email, fullName };
    mockUsers.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    router.push("/dashboard");
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};