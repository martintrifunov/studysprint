import BASE_URL from "../../../config";
import axios from "axios";

export const loginService = (username, password) => {
    console.log({username, password})
  return axios
    .post(`${BASE_URL}/auth/login`, JSON.stringify({username, password}))
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};
