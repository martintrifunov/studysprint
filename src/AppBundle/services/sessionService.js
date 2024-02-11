import AsyncStorage from "@react-native-async-storage/async-storage";
import BASE_URL from "../../../config";
import axios from "axios";
import authService from "./authService";

const createPomodoroSessionTemplate = (
  token,
  workMinutes,
  breakMinutes,
  numberOfCycles,
  name = "StudySprint",
  isPublic = true
) => {
  return axios
    .post(
      `${BASE_URL}/pomodoro/template/save`,
      JSON.stringify({
        name,
        workMinutes,
        breakMinutes,
        numberOfCycles,
        isPublic,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.data) {
        AsyncStorage.setItem("pomodoroSessionTemplateId", `${res.data.id}`);
        return res.data;
      }
    })
    .catch((error) => console.log(error));
};

const getUserSessionStatistics = (
    token,
  ) => {
    return axios
      .get(
        `${BASE_URL}/pomodoro/session/statistics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data) {
          return res.data;
        }
      })
      .catch((error) => console.log(error));
  };

const sessionService = {
  createPomodoroSessionTemplate,
  getUserSessionStatistics
};

export default sessionService;
