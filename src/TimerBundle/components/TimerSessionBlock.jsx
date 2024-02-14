import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import sessionService from "../../AppBundle/services/sessionService";
import AuthContext from "../../AuthBundle/context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const TimerSessionBlock = ({
  isTimerRunning,
  timerMode,
  cycleCount,
  focusCounter,
  breakCounter,
}) => {
  const [sessionMembers, setSessionMembers] = useState([]);
  const { userToken } = useContext(AuthContext);
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
  useFocusEffect(
    useCallback(() => {
      getCurrentSessionMembers();
    }, [])
  );

  useEffect(() => {
    handleStateChange();
    getCurrentSessionMembers();
  }, [isTimerRunning]);

  const getCurrentSessionMembers = async () => {
    try {
      const res = await sessionService.getCurrentPomodoroSession(userToken);
      setSessionMembers(res.members);

      console.log(res.members);
    } catch (error) {
      console.log(error);
    }
  };
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
      ) : sessionMembers?.length > 0 ? (
        <View style={styles.blockBody}>
          {sessionMembers.map((member, index) => (
            <View key={index} style={styles.inner}>
              <FontAwesome key={index} name="user-circle" size={35} color="black" />
            </View>
          ))}
        </View>
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
  inner: {
    paddingLeft: 10
  },
  blockBody: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "start",
    width: "94%",
    height: "20%",
    top: -30,
    left: 20,
  },
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
    color: "#535353",
  },
  iconStyle: {
    marginBottom: 15,
  },
});

export default TimerSessionBlock;
