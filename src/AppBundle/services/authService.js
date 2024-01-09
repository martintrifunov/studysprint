import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../../config";
import axios from "axios";

const registerService = (name, username, password) => {
  return axios
    .post(
      `${BASE_URL}/auth/register`,
      JSON.stringify({ name, username, password }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.data) {
        AsyncStorage.setItem("userToken", res.data);
        return res.data;
      }
    });
};

const loginService = (username, password) => {
  return axios
    .post(`${BASE_URL}/auth/login`, JSON.stringify({ username, password }), {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.data) {
        AsyncStorage.setItem("userToken", res.data);
        return res.data;
      }
    });
};

const logoutService = () => {
  AsyncStorage.removeItem("userToken");
};

const authService = {
  registerService,
  loginService,
  logoutService,
};

export default authService;
