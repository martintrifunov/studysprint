import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";

const TimerSessionBlock = ({ isTimerRunning, timerMode }) => {
  const [blockState, setBlockState] = useState(undefined);
  const [remainingBreaks, setRemainingBreaks] = useState(0);
  const [remainingSessions, setREmainingSessions] = useState(0);

  const handleStateChange = () => {
    if (isTimerRunning) {
      if (timerMode === "Focus") {
        setBlockState("Currently in a working session, \nstay focused...");
      } else if (timerMode === "Break") {
        setBlockState("Take a break, \nyou've earned it!");
      }
    } else {
      if (timerMode === "Focus") {
        setBlockState(`Number of sessions left: ${remainingSessions}`);
      } else if (timerMode === "Break") {
        setBlockState(`Number of breaks left: ${remainingBreaks}`);
      }
    }
  };

  useEffect(() => {
    handleStateChange();
  }, [isTimerRunning]);

  return (
    <View style={styles.blockContainer}>
      <Text style={styles.textStyle}>{blockState}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    backgroundColor: "white",
    width: 240,
    height: 175,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    top: 60,
  },
  textStyle: {
    fontSize: 13,
    textAlign: "center"
  }
});

export default TimerSessionBlock;
