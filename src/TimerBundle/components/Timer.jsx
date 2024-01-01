import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View, Keyboard } from "react-native";
import {
  useSharedValue,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import TimerCountDown from "./TimerCountDown";
import TimerToggleButton from "./TimerToggleButton";
import TimerCycles from "./TimerCycles";
import TimerCircle from "./TimerCircle";
import TimerSessionBlock from "./TimerSessionBlock";
import TimerSettingsBottomSheetModal from "./TimerSettingsBottomSheetModal";
const { width, height } = Dimensions.get("window");

export default function Timer() {
  const [focusMinutes, setFocusMinutes] = useState(12000);
  const [breakMinutes, setBreakMinutes] = useState(6000);
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
  const timerSettingsBottomSheetModalRef = useRef(null);
  const progress = useSharedValue(0);

  const startTimer = () => {
    setIsTimerRunning(true);

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
    } else {
      setTimerMode("Focus");
      setTimerCount(focusMinutes);
      setBreakCounter(breakCounter + 1);
    }

    stopTimer();
    progress.value = 0;
  };

  const inputValidation = (text, type) => {
    if (+text || text == "") {
      setIsSaveButtonVisible(true);
      switch (type) {
        case "focus":
          setTempFocusMinutes(text);
          break;
        case "break":
          setTempBreakMinutes(text);
          break;
        case "cycle":
          setTempCycleCount(text);
          break;
        default:
          break;
      }
    }
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

    setIsSaveButtonVisible(false);
    timerSettingsBottomSheetModalRef.current?.snapToIndex(0);
    Keyboard.dismiss();
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
