import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "src/services/api/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { useLocalStorage } from "src/hooks/useLocalStorage";

type UserProfile = {
  name: string;
  email: string;
};

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const userStorage = useLocalStorage("user");
  const tokenStorage = useLocalStorage("token");

  const [user, setUser] = useState<UserProfile | null>(userStorage.getItem());
  const [token, setToken] = useState<string | null>(tokenStorage.getItem());
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (user && token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsReady(true);
  }, [token, user]);

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await registerAPI(name, email, password);
      if (res) {
        const userObj = { name: res.data.name, email: res.data.email };

        tokenStorage.setItem(res.data.token);
        userStorage.setItem(userObj);

        setToken(res.data.token);
        setUser(userObj);
        navigate("/overview", { replace: true });
        toast.success("Registration Successful!");
      }
    } catch (e) {
      toast.warning("Server error occurred");
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const res = await loginAPI(email, password);
      if (res) {
        const userObj = { name: res.data.name, email: res.data.email };

        tokenStorage.setItem(res.data.token);
        userStorage.setItem(userObj);

        setToken(res.data.token);
        setUser(userObj);

        toast.success("Login Successful!");
        navigate("/overview", { replace: true });
      }
    } catch (e) {
      toast.warning("Server error occurred");
    }
  };

  const logout = () => {
    tokenStorage.removeItem();
    userStorage.removeItem();
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  const isLoggedIn = () => !!token;

  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        token,
        logout,
        isLoggedIn,
        registerUser,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
