import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import SVG, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import TimerCountDown from "./TimerCountDown";
import TimerToggleButton from "./TimerToggleButton";
import TimerCycles from "./TimerCycles";

const CIRCLE_COLOR_FOCUS = "#60B3FF";
const CIRCLE_COLOR_BREAK = "#77D368";
const CIRCLE_LENGTH = 750;
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);
const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;
const BREAK_TIME_MINUTES = 0.1 * 60 * 1000;
const { width, height } = Dimensions.get("window");
const AnimatedRing = Animated.createAnimatedComponent(Circle);

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

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 1 - CIRCLE_LENGTH * progress.value,
  }));

  return (
    <View style={styles.container}>
      <SVG style={{ position: "absolute", bottom: 150 }}>
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={CIRCLE_RADIUS + 15}
          fill={"white"}
          style={styles.circle}
        />
        {/* BACKGROUND CIRCLE */}
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={CIRCLE_RADIUS}
          stroke={timerMode === "Focus" ? CIRCLE_COLOR_FOCUS : CIRCLE_COLOR_BREAK}
          strokeWidth={10}
          fill={"none"}
          opacity={0.2}
          
        />
        {/* FOREGROUND CIRCLE */}
        <AnimatedRing
          cx={width / 2}
          cy={height / 2}
          r={CIRCLE_RADIUS}
          stroke={timerMode === "Focus" ? CIRCLE_COLOR_FOCUS : CIRCLE_COLOR_BREAK}
          strokeWidth={10}
          fill={"none"}
          strokeDasharray={CIRCLE_LENGTH}
          strokeDashoffset={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
          rotation={-90}
          originX={width / 2}
          originY={height / 2}
        />
      </SVG>

      <TimerCycles timerMode={timerMode} focusCounter={focusCounter} breakCounter={breakCounter} />
      <TimerCountDown timerDate={new Date(timerCount)} />

      <TimerToggleButton
        isTimerRunning={isTimerRunning}
        startTimer={startTimer}
        stopTimer={stopTimer}
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
  circle: {
    shadowColor: "#333333",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5
  }
});
