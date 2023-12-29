import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const TimerToggleButton = ({
  isTimerRunning,
  stopTimer,
  startTimer,
  timerMode,
}) => {
  return (
    <TouchableOpacity
      onPress={isTimerRunning ? () => stopTimer() : () => startTimer()}
    >
      <View
        style={
          isTimerRunning
            ? styles.buttonContainerStop
            : timerMode === "Focus"
            ? styles.buttonContainerFocus
            : styles.buttonContainerBreak
        }
      >
        <Text style={styles.buttonText}>
          {isTimerRunning ? "Stop" : "Start"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainerFocus: {
    backgroundColor: "#60B3FF",
    width: 120,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    top: 120,
  },
  buttonContainerBreak: {
    backgroundColor: "#77D368",
    width: 120,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    top: 120,
  },
  buttonContainerStop: {
    backgroundColor: "#D36868",
    width: 120,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    top: 120,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textTransform: "uppercase",
  },
});

export default TimerToggleButton;
