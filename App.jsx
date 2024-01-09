import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AuthProvider } from "./src/AuthBundle/context/AuthContext";
import AuthNav from "./src/AuthBundle/components/AuthNav";

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={styles.appContainer}>
        <NavigationContainer>
          <BottomSheetModalProvider>
            <AuthNav />
            <StatusBar style="auto" />
          </BottomSheetModalProvider>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#E9E9E9",
  },
});
