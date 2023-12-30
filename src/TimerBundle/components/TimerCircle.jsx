import React from "react";
import SVG, { Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
} from "react-native-reanimated";

const CIRCLE_COLOR_FOCUS = "#60B3FF";
const CIRCLE_COLOR_BREAK = "#77D368";
const CIRCLE_LENGTH = 750;
const CIRCLE_RADIUS = CIRCLE_LENGTH / (2 * Math.PI);
const AnimatedRing = Animated.createAnimatedComponent(Circle);

const TimerCircle = ({ width, height, timerMode, progress }) => {
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 1 - CIRCLE_LENGTH * progress.value,
  }));
  return (
    <SVG style={{ position: "absolute", bottom: 175 }}>
      <Circle
        cx={width / 2}
        cy={height / 2}
        r={CIRCLE_RADIUS + 15}
        fill={"white"}
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
  );
};

export default TimerCircle;
