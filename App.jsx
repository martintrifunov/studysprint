import { StatusBar } from "expo-status-bar";
import React from "react";
import Timer from "./src/TimerBundle/components/Timer";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/NavigationBundle/components/Navigation";

export default function App() {
  return (
    <View style={styles.container}>
      <Timer />
      <Navigation />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9E9",
    justifyContent: "center",
    alignItems: "center",
  }
});
