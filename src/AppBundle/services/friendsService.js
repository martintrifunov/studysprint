import BASE_URL from "../../../config";
import axios from "axios";

const addUserFriend = (token, friendCode) => {
  return axios
    .post(`${BASE_URL}/user/friends/add`, friendCode, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    })
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((err) => console.log(err));
};

const getUserFriends = (token) => {
  return axios
    .get(`${BASE_URL}/user/friends`, {
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

const getUserCode = (token) => {
  return axios
    .get(`${BASE_URL}/user/friends/code`, {
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

const friendsService = {
  getUserFriends,
  addUserFriend,
  getUserCode,
};

export default friendsService;
