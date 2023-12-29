import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
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

const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;
const BREAK_TIME_MINUTES = 0.1 * 60 * 1000;
const { width, height } = Dimensions.get("window");

//GONNA CLEAN UP THE CODE LATER DON'T MIND ME :)
export default function Timer() {
  const progress = useSharedValue(0);
  const [timerCount, setTimerCount] = useState(FOCUS_TIME_MINUTES);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState("Focus");
  const [focusCounter, setFocusCounter] = useState(1);
  const [breakCounter, setBreakCounter] = useState(1);

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
      setTimerCount(BREAK_TIME_MINUTES);
      setFocusCounter(focusCounter + 1);
    } else {
      setTimerMode("Focus");
      setTimerCount(FOCUS_TIME_MINUTES);
      setBreakCounter(breakCounter + 1);
    }

    stopTimer();
    progress.value = 0;
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
      />
      <TimerCountDown timerDate={new Date(timerCount)} />

      <TimerToggleButton
        isTimerRunning={isTimerRunning}
        startTimer={startTimer}
        stopTimer={stopTimer}
        timerMode={timerMode}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9E9",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  sessionNumber: {
    fontSize: 15,
    bottom: 140,
    color: "#535353",
  },
});
