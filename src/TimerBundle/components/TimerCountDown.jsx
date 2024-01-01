import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TimerCountDown = ({ timerDate, timerSettingsBottomSheetModalRef }) => {
  return (
    <View>
      <Text
        style={styles.progressNumber}
        onPress={() => timerSettingsBottomSheetModalRef.current?.present()}
      >
        {timerDate.getMinutes().toString().padStart(2, "0")}:
        {timerDate.getSeconds().toString().padStart(2, "0")}
      </Text>
    </View>
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
