import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import SVG, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  cancelAnimation
} from "react-native-reanimated";
import TimerCountDown from "./src/components/TimerCountDown";
import TimerToggleButton from "./src/components/TimerToggleButton";

const CIRCLE_COLOR = "#EE0F55";
const CIRCLE_LENGTH = 750;
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);
const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;
const BREAK_TIME_MINUTES = 0.1 * 60 * 1000;
const { width, height } = Dimensions.get("window");
const AnimatedRing = Animated.createAnimatedComponent(Circle);

//GONNA CLEAN UP THE CODE LATER DON'T MIND ME :)
export default function App() {
  const progress = useSharedValue(0);
  const [timerCount, setTimerCount] = useState(FOCUS_TIME_MINUTES);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('Focus');

  const startTimer = () => {
    setIsTimerRunning(true);
    const timerID = setInterval(
      () => setTimerCount((prev) => prev - 1000),
      1000
    );

    setTimerInterval(timerID);
  };

  const stopTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }

    setIsTimerRunning(false);
  };

  useEffect(() => {
    if(timerCount === 0) {
      if(timerMode === 'Focus') {
        setTimerMode('Break');
        setTimerCount(BREAK_TIME_MINUTES);
      }
      else {
        setTimerMode('Focus');
        setTimerCount(FOCUS_TIME_MINUTES);    
      }
      cancelAnimation(progress);
      stopTimer();
      progress.value = 0;
    }
    // console.log(progress.value); IT WORKS BITCHEZZZZ 

    if(isTimerRunning) {
      if(timerMode === 'Focus') {
        progress.value = withTiming(1, { duration:  FOCUS_TIME_MINUTES });
      }
      else if(timerMode === 'Break') {
        progress.value = withTiming(1, { duration:  BREAK_TIME_MINUTES });
      }
    }
    else {
      cancelAnimation(progress);
      progress.value = 0;
    }
    
   
  }, [timerCount, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 0.1 - CIRCLE_LENGTH * progress.value,
  }));
  return (
    <View style={styles.container}>
      <TimerCountDown timerDate={new Date(timerCount)} />
      <Text style={styles.sessionNumber}>{timerMode === 'Focus' ? '1/5 Sessions' : '1/5 Breaks'}</Text>
      <SVG style={{ position: "absolute", bottom: 150 }}>
        {/* BACKGROUND CIRCLE */}
        <Circle
          cx={width / 2}
          cy={height / 2}
          r={CIRCLE_RADIUS}
          stroke={CIRCLE_COLOR}
          strokeWidth={15}
          fill={"none"}
          opacity={0.2}
        />
        {/* FOREGROUND CIRCLE */}
        <AnimatedRing
          cx={width / 2}
          cy={height / 2}
          r={CIRCLE_RADIUS}
          stroke={CIRCLE_COLOR}
          strokeWidth={15}
          fill={"none"}
          strokeDasharray={CIRCLE_LENGTH}
          strokeDashoffset={CIRCLE_LENGTH * 0.5}
          animatedProps={animatedProps}
          strokeLinecap={"round"}
          rotation={-90}
          originX={width / 2}
          originY={height / 2}
        />
      </SVG>

      <TimerToggleButton isTimerRunning={isTimerRunning} startTimer={startTimer} stopTimer={stopTimer} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  progressNumber: {
    fontSize: 50,
    color: "gray",
    bottom: 140,
  },
  sessionNumber: {
    fontSize: 25,
    bottom: 140,
    color: "gray",
  },
  timerButton: {},
});