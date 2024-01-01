import React from "react";
import { StyleSheet, Text } from "react-native";

const TimerCycles = ({ timerMode, focusCounter, breakCounter, cycleCount }) => {
  return (
    <Text style={styles.sessionNumber}>
      {timerMode === "Focus"
        ? `Work ${focusCounter}/${cycleCount}`
        : `Breaks ${breakCounter}/${cycleCount}`}
    </Text>
  );
};

const styles = StyleSheet.create({
  sessionNumber: {
    fontSize: 15,
    bottom: 75,
    color: "#535353",
  },
});

export default TimerCycles;
