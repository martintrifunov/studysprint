import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import authService from "../../AppBundle/services/authService";
export default AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('Login');

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.loginService(username, password).then(
        (res) =>
          res !== undefined
            ? setUserToken(res)
            : setError("Wrong username or password!"),
        (error) => {
          setError("Wrong username or password!");
          setCurrentScreen('Login');
        }
      );
    } catch (error) {
      setError("Network error!");
    }

    setIsLoading(false);
  };

  const register = async (name, username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.registerService(name, username, password).then(
        (res) => login(username, password),
        (error) => {
          setError("Account already exists please try again!");
          setCurrentScreen('SignUp');
        }
      );
    } catch (error) {
      setError("Network error!");
    }

    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setError(null);
    authService.logoutService();
    setCurrentScreen('Login');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      setUserToken(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, register, isLoading, userToken, error, setError, currentScreen }}
    >
      {children}
    </AuthContext.Provider>
  );
};
