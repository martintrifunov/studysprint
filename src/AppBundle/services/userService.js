import BASE_URL from "../../../config";
import axios from "axios";

const uploadProfilePictureService = (token, base64) => {
  return axios
    .post(`${BASE_URL}/user/picture`, JSON.stringify({ base64 }), {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => res)
    .catch((err) => err);
};

const getProfilePictureService = (token) => {
  return axios
    .get(`${BASE_URL}/user/picture`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => console.log(error));
};

const userService = {
  uploadProfilePictureService,
  getProfilePictureService
};

export default userService;
