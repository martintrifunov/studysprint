import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const TimerSettingsBottomSheetModal = ({
  timerSettingsBottomSheetModalRef,
  tempFocusMinutes,
  tempBreakMinutes,
  tempCycleCount,
  handleSettingsSave,
  inputValidation,
  isSaveButtonVisible,
  errorBag
}) => {
  const snapPoints = useMemo(() => ["55%"], []);

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

  return (
      <BottomSheetModal
        ref={timerSettingsBottomSheetModalRef}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        index={0}
        backdropComponent={renderBackdrop}
      >
        <View>
          <Text style={styles.textStyle}>
            <MaterialCommunityIcons name="brain" size={16} color="#535353" />{" "}
            Timer length (minutes):
          </Text>
          <BottomSheetTextInput
            style={errorBag?.timerLength ? styles.inputError : styles.input}
            keyboardType="numeric"
            onChangeText={(value) => inputValidation(value, "focus")}
            value={tempFocusMinutes}
          />
          {errorBag?.timerLength && <Text style={styles.errorStyle}>{errorBag.timerLength}</Text>}
          <Text style={styles.textStyle}>
            <Ionicons name="leaf-outline" size={16} color="#535353" />{" "}
            Break length (minutes):
          </Text>
          <BottomSheetTextInput
            style={errorBag?.breakLength ? styles.inputError : styles.input}
            keyboardType="numeric"
            onChangeText={(value) => inputValidation(value, "break")}
            value={tempBreakMinutes}
          />
          {errorBag?.breakLength && <Text style={styles.errorStyle}>{errorBag.breakLength}</Text>}
          <Text style={styles.textStyle}>
            <Ionicons name="timer-outline" size={16} color="#535353" />{" "}
            Number of cycles:
          </Text>
          <BottomSheetTextInput
            style={errorBag?.cycleNumber ? styles.inputError : styles.input}
            keyboardType="numeric"
            onChangeText={(value) => inputValidation(value, "cycle")}
            value={tempCycleCount}
          />
          {errorBag?.cycleNumber && <Text style={styles.errorStyle}>{errorBag.cycleNumber}</Text>}
          {isSaveButtonVisible && (
            <TouchableOpacity onPress={handleSettingsSave}>
              <View style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Save</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
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
  inputError: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
    borderColor: "red",
    borderWidth: 0.5,
  },
  textStyle: {
    color: "#535353",
    marginLeft: 20,
  },
  errorStyle: {
    color: "red",
    marginLeft: 20,
    marginBottom: 10
  },
  buttonContainer: {
    backgroundColor: "#60B3FF",
    width: "90%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textTransform: "uppercase",
  },
});

export default TimerSettingsBottomSheetModal;
