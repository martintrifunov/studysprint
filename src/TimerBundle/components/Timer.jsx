import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  useSharedValue,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import TimerCountDown from "./TimerCountDown";
import TimerToggleButton from "./TimerToggleButton";
import TimerCycles from "./TimerCycles";
import TimerCircle from "./TimerCircle";
import TimerSessionBlock from "./TimerSessionBlock";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const FOCUS_TIME_MINUTES = 0.2 * 60 * 1000;
const BREAK_TIME_MINUTES = 0.1 * 60 * 1000;
const { width, height } = Dimensions.get("window");

export default function Timer() {
  const [focusMinutes, setFocusMinutes] = useState(12000);
  const [breakMinutes, setBreakMinutes] = useState(6000);
  const progress = useSharedValue(0);
  const [timerCount, setTimerCount] = useState(focusMinutes);
  const [timerInterval, setTimerInterval] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerMode, setTimerMode] = useState("Focus");
  const [focusCounter, setFocusCounter] = useState(1);
  const [breakCounter, setBreakCounter] = useState(1);

  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const timerSettingsBottomSheetModalRef = useRef(null);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const [tempFocusMinutes, setTempFocusMinutes] = useState("");
  const [tempBreakMinutes, setTempBreakMinutes] = useState("");
  const [tempCycleCount, setTempCycleCount] = useState("");

  const [cycleCount, setCycleCount] = useState(5);

  const inputValidation = (text, type) => {
    if (+text || text == "") {
      switch (type) {
        case "focus":
          setTempFocusMinutes(text);
          break;
        case "break":
          setTempBreakMinutes(text);
          break;
        case "cycle":
          setTempCycleCount(text);
          break;
        default:
          break;
      }
    }
  };

  const handleSettingsSave = () => {   

    //need to force re-render somehow
    if (Number.isInteger(parseInt(tempFocusMinutes))) {
      setFocusMinutes(parseInt(tempFocusMinutes) * 60 * 1000);
      setTimerCount(focusMinutes);
    }

    if (Number.isInteger(parseInt(tempBreakMinutes))) {
      setBreakMinutes(parseInt(tempBreakMinutes) * 60 * 1000);
    }

    if (Number.isInteger(parseInt(tempCycleCount))) {
      setCycleCount(parseInt(tempCycleCount));
    }
    console.log(focusMinutes, timerCount)
    // timerSettingsBottomSheetModalRef.current?.close();
  };

  const startTimer = () => {
    setIsTimerRunning(true);

    const timerID = setInterval(
      () => setTimerCount((prev) => prev - 1000),
      1000
    );

    setTimerInterval(timerID);
    progress.value = withTiming(1, {
      duration: timerCount,
      easing: Easing.linear,
    });
  };

  const stopTimer = () => {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
    }

    cancelAnimation(progress);
    setIsTimerRunning(false);
  };

  const changeMode = () => {
    if (timerMode === "Focus") {
      setTimerMode("Break");
      setTimerCount(breakMinutes);
      setFocusCounter(focusCounter + 1);
    } else {
      setTimerMode("Focus");
      setTimerCount(focusMinutes);
      setBreakCounter(breakCounter + 1);
    }

    stopTimer();
    progress.value = 0;
  };

  useEffect(() => {
    if (timerCount === 0) {
      changeMode();
    }
  }, [timerCount]);

  return (
    <View style={styles.container}>
      <TimerCircle
        width={width}
        height={height}
        timerMode={timerMode}
        progress={progress}
      />

      <TimerCycles
        timerMode={timerMode}
        focusCounter={focusCounter}
        breakCounter={breakCounter}
        cycleCount={cycleCount}
      />
      <TimerCountDown
        timerDate={new Date(timerCount)}
        timerSettingsBottomSheetModalRef={timerSettingsBottomSheetModalRef}
      />

      <TimerSessionBlock
        isTimerRunning={isTimerRunning}
        timerMode={timerMode}
        cycleCount={cycleCount}
        focusCounter={focusCounter}
        breakCounter={breakCounter}
      />

      <TimerToggleButton
        isTimerRunning={isTimerRunning}
        startTimer={startTimer}
        stopTimer={stopTimer}
        timerMode={timerMode}
      />
      <BottomSheet
        ref={timerSettingsBottomSheetModalRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        index={-1}
        backdropComponent={renderBackdrop}
      >
        <View>
          <Text style={styles.textStyle}>
            <MaterialCommunityIcons name="brain" size={16} color="#535353" />
            Timer length (minutes):
          </Text>
          <BottomSheetTextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => inputValidation(value, "focus")}
            value={tempFocusMinutes}
          />
          <Text style={styles.textStyle}>
            <Ionicons name="leaf-outline" size={16} color="#535353" />
            Break length (minutes):
          </Text>
          <BottomSheetTextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => inputValidation(value, "break")}
            value={tempBreakMinutes}
          />
          <Text style={styles.textStyle}>
            <Ionicons name="timer-outline" size={16} color="#535353" />
            Number of cycles:
          </Text>
          <BottomSheetTextInput
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => inputValidation(value, "cycle")}
            value={tempCycleCount}
          />
          <TouchableOpacity onPress={handleSettingsSave}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  textStyle: {
    color: "#535353",
    marginLeft: 20,
  },
  buttonContainer: {
    backgroundColor: "#77D368",
    width: "90%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textTransform: "uppercase",
  },
});
