import React from "react";
import { Text, StyleSheet } from "react-native";

const TimerCountDown = ({ timerDate, timerSettingsBottomSheetModalRef, isTimerRunning }) => {
  const showModal = () => {
    if(!isTimerRunning) {
      timerSettingsBottomSheetModalRef.current?.present();
    }
  }
  return (
    <Text
      style={styles.progressNumber}
      onPress={() => showModal()}
    >
      {timerDate.getMinutes().toString().padStart(2, "0")}:
      {timerDate.getSeconds().toString().padStart(2, "0")}
    </Text>
  );
};

const styles = StyleSheet.create({
  progressNumber: {
    fontSize: 50,
    color: "#535353",
    bottom: 75,
  },
});

export default TimerCountDown;
