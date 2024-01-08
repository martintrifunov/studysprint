import React from "react";
import { Text, StyleSheet } from "react-native";

const TimerCountDown = ({ timerDate, timerSettingsBottomSheetModalRef, isTimerRunning }) => {
  let totalMinutes = Math.floor(timerDate / (1000 * 60));
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
      {totalMinutes === 60 ? "60" : timerDate.getMinutes().toString().padStart(2, "0")}:
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
