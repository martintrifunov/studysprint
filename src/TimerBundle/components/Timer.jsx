import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View, Keyboard, Vibration, ToastAndroid } from "react-native";
import {
  useSharedValue,
  withTiming,
  cancelAnimation,
  Easing
} from "react-native-reanimated";
import TimerCountDown from "./TimerCountDown";
import TimerToggleButton from "./TimerToggleButton";
import TimerCycles from "./TimerCycles";
import TimerCircle from "./TimerCircle";
import TimerSessionBlock from "./TimerSessionBlock";
import TimerSettingsBottomSheetModal from "./TimerSettingsBottomSheetModal";
import sessionService from "../../AppBundle/services/sessionService";
import AuthContext from "../../AuthBundle/context/AuthContext";
const { width, height } = Dimensions.get("window");

export default function Timer() {
  const [focusMinutes, setFocusMinutes] = useState(1500000);
  const [breakMinutes, setBreakMinutes] = useState(300000);
  const [timerCount, setTimerCount] = useState(focusMinutes);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState("Focus");
  const [focusCounter, setFocusCounter] = useState(1);
  const [breakCounter, setBreakCounter] = useState(1);
  const [cycleCount, setCycleCount] = useState(5);
  const [tempFocusMinutes, setTempFocusMinutes] = useState("");
  const [tempBreakMinutes, setTempBreakMinutes] = useState("");
  const [tempCycleCount, setTempCycleCount] = useState("");
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(false);
  const [errorBag, setErrorInErrorBag] = useState(null);
  const [templateId, setTemplateId] = useState(null);
  const timerSettingsBottomSheetModalRef = useRef(null);
  const progress = useSharedValue(0);
  const { userToken } = useContext(AuthContext);
  const [isThereAnActiveSession, setIsThereAnActiveSession] = useState(false);

  const getCurrentSessionTemplate = async () => {
    await sessionService
      .getCurrentPomodoroSession(userToken)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const createSession = async () => {
    await sessionService
      .createPomodoroSession(userToken, templateId)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const handleSessionStart = async () => {
    if (isThereAnActiveSession === true) {
      let tmp = await createSessionTemplate().then((res) => res);
      console.log(tmp);
    } else {
      if (templateId === null) {
        let tmp = createSessionTemplate();
        setIsThereAnActiveSession(true);
        console.log(tmp);
      }
    }
  };

  const startTimer = () => {
    setIsTimerRunning(true);

    // handleSessionStart();
    const timerID = setInterval(
      () => setTimerCount((prev) => prev - 1000),
      1000
    );

    setTimerInterval(timerID);
    progress.value = withTiming(1, {
      duration: timerCount,
      easing: Easing.linear,
    });
  };

  const stopTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }

    cancelAnimation(progress);
    setIsTimerRunning(false);
  };

  const changeMode = () => {
    if (timerMode === "Focus") {
      setTimerMode("Break");
      setTimerCount(breakMinutes);
      setFocusCounter(focusCounter + 1);
      ToastAndroid.show("Work session has ended...", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } else {
      setTimerMode("Focus");
      setTimerCount(focusMinutes);
      setBreakCounter(breakCounter + 1);
      ToastAndroid.show("Break has ended...", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
   
    Vibration.vibrate(2000);
    stopTimer();
    progress.value = 0;
  };

  const inputValidation = (text, type) => {
    if (+text || text == "") {
      setIsSaveButtonVisible(true);
      switch (type) {
        case "focus":
          if (parseInt(text) <= 60) {
            setTempFocusMinutes(text);
            setErrorInErrorBag({
              ...errorBag,
              timerLength: null,
            });
            break;
          } else {
            setTempFocusMinutes("");
            setErrorInErrorBag({
              ...errorBag,
              timerLength: "Please enter a valid number from 1 to 60",
            });
            break;
          }
        case "break":
          if (parseInt(text) <= 60) {
            setTempBreakMinutes(text);
            setErrorInErrorBag({
              ...errorBag,
              breakLength: null,
            });
            break;
          } else {
            setTempBreakMinutes("");
            setErrorInErrorBag({
              ...errorBag,
              breakLength: "Please enter a valid number from 1 to 60",
            });
            break;
          }
        case "cycle":
          if (parseInt(text) <= 100) {
            setTempCycleCount(text);
            setErrorInErrorBag({
              ...errorBag,
              cycleNumber: null,
            });
            break;
          } else {
            setTempCycleCount("");
            setErrorInErrorBag({
              ...errorBag,
              cycleNumber: "Please enter a valid number from 1 to 100",
            });
            break;
          }
        default:
          break;
      }
    }
  };

  const updateSessionTemplate = async () => {
    await sessionService
      .updatePomodoroSessionTemplate(
        userToken,
        templateId,
        parseInt(tempFocusMinutes),
        parseInt(tempBreakMinutes),
        parseInt(tempCycleCount)
      )
      .then((res) => res)
      .catch((err) => console.error(err));
  };

  const handleSettingsSave = () => {
    if (Number.isInteger(parseInt(tempFocusMinutes))) {
      setFocusMinutes(parseInt(tempFocusMinutes) * 60 * 1000);
      if (timerMode === "Focus" && !isTimerRunning) {
        setTimerCount(parseInt(tempFocusMinutes) * 60 * 1000);
        progress.value = 0;
      }
    }

    if (Number.isInteger(parseInt(tempBreakMinutes))) {
      setBreakMinutes(parseInt(tempBreakMinutes) * 60 * 1000);
      if (timerMode === "Break" && !isTimerRunning) {
        setTimerCount(parseInt(tempBreakMinutes) * 60 * 1000);
        progress.value = 0;
      }
    }

    if (Number.isInteger(parseInt(tempCycleCount))) {
      setCycleCount(parseInt(tempCycleCount));
    }
    if (templateId !== null) {
      updateSessionTemplate();
    } else {
      createSessionTemplate();
    }

    setIsSaveButtonVisible(false);
    timerSettingsBottomSheetModalRef.current?.snapToIndex(0);
    Keyboard.dismiss();
  };

  const createSessionTemplate = async () => {
    await sessionService
      .createPomodoroSessionTemplate(
        userToken,
        parseInt(tempFocusMinutes),
        parseInt(tempBreakMinutes),
        cycleCount
      )
      .then((res) => setTemplateId(res))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (timerCount === 0) {
      changeMode();
    }
  }, [timerCount]);

  return (
    <View style={styles.container}>
      <TimerCircle
        width={width}
        height={height}
        timerMode={timerMode}
        progress={progress}
      />

      <TimerCycles
        timerMode={timerMode}
        focusCounter={focusCounter}
        breakCounter={breakCounter}
        cycleCount={cycleCount}
      />

      <TimerCountDown
        timerDate={new Date(timerCount)}
        timerSettingsBottomSheetModalRef={timerSettingsBottomSheetModalRef}
        isTimerRunning={isTimerRunning}
      />

      <TimerSessionBlock
        isTimerRunning={isTimerRunning}
        timerMode={timerMode}
        cycleCount={cycleCount}
        focusCounter={focusCounter}
        breakCounter={breakCounter}
      />

      <TimerToggleButton
        isTimerRunning={isTimerRunning}
        startTimer={startTimer}
        stopTimer={stopTimer}
        timerMode={timerMode}
      />

      <TimerSettingsBottomSheetModal
        timerSettingsBottomSheetModalRef={timerSettingsBottomSheetModalRef}
        tempFocusMinutes={tempFocusMinutes}
        tempBreakMinutes={tempBreakMinutes}
        tempCycleCount={tempCycleCount}
        inputValidation={inputValidation}
        handleSettingsSave={handleSettingsSave}
        isSaveButtonVisible={isSaveButtonVisible}
        errorBag={errorBag}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
