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
        return res.data.id;
      }
    })
    .catch((error) => console.log(error));
};

const updatePomodoroSessionTemplate = (
  token,
  id,
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
        id,
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
        return res.data;
      }
    })
    .catch((error) => console.error(error));
};

const createPomodoroSession = (token, id) => {
  return axios
    .post(`${BASE_URL}/pomodoro/session/create`, id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => console.error(error));
};

const getCurrentPomodoroSession = (token) => {
  return axios
    .get(`${BASE_URL}/pomodoro/session`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => console.error(error));
};

const startPomodoroSession = (token) => {
  return axios
    .post(
      `${BASE_URL}pomodoro/session/start`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => console.error(error));
};

const updatePomodoroSession = (token) => {
  return axios
    .post(
      `${BASE_URL}/pomodoro/session/update`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => console.error(error));
};

const endPomodoroSession = (token) => {
  return axios
    .post(
      `${BASE_URL}/pomodoro/session/end`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      if (res.data) {
        return res.data;
      }
    })
    .catch((error) => console.error(error));
};

const getUserSessionStatistics = (token) => {
  return axios
    .get(`${BASE_URL}/pomodoro/session/statistics`, {
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

const sessionService = {
  createPomodoroSessionTemplate,
  updatePomodoroSessionTemplate,
  getUserSessionStatistics,
  getCurrentPomodoroSession,
  createPomodoroSession,
  startPomodoroSession,
  updatePomodoroSession,
  endPomodoroSession,
};

export default sessionService;
