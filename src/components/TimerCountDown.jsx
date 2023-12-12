import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TimerCountDown = ({timerDate}) => {
  return (
    <View>
      <Text style={styles.progressNumber}>
        {timerDate.getMinutes().toString().padStart(2, "0")}:
        {timerDate.getSeconds().toString().padStart(2, "0")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
    progressNumber: {
      fontSize: 50,
      color: "gray",
      bottom: 140,
    },
    sessionNumber: {
      fontSize: 25,
      bottom: 140,
      color: "gray",
    },
    timerButton: {},
  });

export default TimerCountDown;
