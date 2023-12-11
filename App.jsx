import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import SVG, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
} from "react-native-reanimated";

const CIRCLE_COLOR = "#EE0F55";
const CIRCLE_LENGTH = 1000;
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);
const { width, height } = Dimensions.get("window");
const AnimatedRing = Animated.createAnimatedComponent(Circle);

export default function App() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 2000 });
  }, []);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 0.1 - CIRCLE_LENGTH * progress.value,
  }));
  return (
    <View style={styles.container}>
      <Text style={styles.progressNumber}>25:00</Text>
      <Text style={styles.sessionNumber}>1/5 Sessions</Text>
      <SVG style={{position: "absolute"}}>
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
    color: "gray"
  },
  sessionNumber: {
    fontSize: 25,
    color: "gray"
  }
});
