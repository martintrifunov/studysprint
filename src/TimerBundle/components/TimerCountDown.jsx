import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const TimerCountDown = ({ timerDate, timerSettingsBottomSheetModalRef }) => {
  const [currentSheetState, setCurrentSheetState] = useState("Closed");

  const handleBottomSheetModalToggle = () => {
    if (currentSheetState === "Closed") {
      setCurrentSheetState("Open");
      timerSettingsBottomSheetModalRef.current?.expand();
    } else if (currentSheetState === "Open") {
      setCurrentSheetState("Closed");
      timerSettingsBottomSheetModalRef.current?.close();
    }
  };

  return (
    <View>
      <Text
        style={styles.progressNumber}
        onPress={handleBottomSheetModalToggle}
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
