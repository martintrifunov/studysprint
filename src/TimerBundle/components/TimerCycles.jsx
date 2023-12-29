import React from "react";
import { View, StyleSheet, Text } from "react-native";

const TimerCycles = ({ timerMode, focusCounter, breakCounter }) => {
  return (
    <View>
      <Text style={styles.sessionNumber}>
        {timerMode === "Focus"
          ? `Work ${focusCounter}/5`
          : `Breaks ${breakCounter}/5`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sessionNumber: {
    fontSize: 15,
    bottom: 140,
    color: "#535353",
  },
});

export default TimerCycles;
