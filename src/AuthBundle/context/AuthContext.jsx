import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";
import authService from "../../AppBundle/services/authService";
export default AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      await authService.loginService(username, password).then(
        (res) => (res !== undefined ? setUserToken(res) : setError("Wrong username or password!")),
        (error) => {
          setError("Wrong username or password!")
        }
      );
    } catch (error) {
      setError("Network error!")
    }

    setIsLoading(false);
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    setError(null);
    authService.logoutService();
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
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, error }}>
      {children}
    </AuthContext.Provider>
  );
};
