import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const TimerSessionBlock = ({
  isTimerRunning,
  timerMode,
  cycleCount,
  focusCounter,
  breakCounter,
}) => {
  const [blockState, setBlockState] = useState(undefined);
  const [remainingBreaks, setRemainingBreaks] = useState(
    cycleCount - focusCounter + 1
  );
  const [remainingSessions, setRemainingSessions] = useState(
    cycleCount - breakCounter + 1
  );
  const [iconState, setIconState] = useState(false);

  const handleStateChange = () => {
    if (isTimerRunning) {
      if (timerMode === "Focus") {
        setBlockState("Currently in a working session, \nstay focused...");
      } else if (timerMode === "Break") {
        setBlockState("Take a break, \nyou've earned it!");
      }
      setIconState(true);
    } else {
      if (timerMode === "Focus") {
        setBlockState(`Sessions left: ${remainingSessions}`);
      } else if (timerMode === "Break") {
        setBlockState(`Breaks left: ${remainingBreaks}`);
      }
      setIconState(false);
    }
    setRemainingSessions(cycleCount - focusCounter + 1);
    setRemainingBreaks(cycleCount - breakCounter + 1);
  };

  useEffect(() => {
    handleStateChange();
  }, [isTimerRunning]);

  return (
    <View style={styles.blockContainer}>
      {iconState ? (
        timerMode === "Focus" ? (
          <MaterialCommunityIcons
            name="brain"
            size={23}
            color="#50a9fa"
            style={styles.iconStyle}
          />
        ) : (
          <Ionicons
            name="leaf-outline"
            size={22}
            color="green"
            style={styles.iconStyle}
          />
        )
      ) : (
        <Ionicons
          name="timer-outline"
          size={24}
          color="black"
          style={styles.iconStyle}
        />
      )}

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
    textAlign: "center",
  },
  iconStyle: {
    marginBottom: 15,
  },
});

export default TimerSessionBlock;
