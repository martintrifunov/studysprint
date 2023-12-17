import React from "react";
import { View, StyleSheet, Button } from "react-native";

const TimerToggleButton = ({isTimerRunning, stopTimer, startTimer}) => {
  return (
    <View>
      <Button
        title={isTimerRunning ? "Stop Timer" : "Start Timer"}
        onPress={isTimerRunning ? () => stopTimer() : () => startTimer()}
      />
    </View>
  );
};

export default TimerToggleButton;
