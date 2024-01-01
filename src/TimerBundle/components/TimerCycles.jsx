import React from "react";
import { View, StyleSheet, Text } from "react-native";

const TimerCycles = ({ timerMode, focusCounter, breakCounter, cycleCount }) => {
  return (
    <View>
      <Text style={styles.sessionNumber}>
        {timerMode === "Focus"
          ? `Work ${focusCounter}/${cycleCount}`
          : `Breaks ${breakCounter}/${cycleCount}`}
      </Text>
    </View>
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
