import { StatusBar } from "expo-status-bar";
import React from "react";
import Timer from "./src/TimerBundle/components/Timer";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/NavigationBundle/components/Navigation";
import Friends from "./src/FriendsBundle/components/Friends";
import Profile from "./src/ProfileBundle/components/Profile";
import ProfileEdit from "./src/ProfileBundle/components/ProfileEdit";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Login from "./src/AuthBundle/screens/Login";
import SignUp from "./src/AuthBundle/screens/SignUp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.appContainer}>
      <NavigationContainer>
        <BottomSheetModalProvider>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Timer"
          >
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Friends" component={Friends} />
            <Stack.Screen name="Timer" component={Timer} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
          </Stack.Navigator>
          <View style={styles.navContainer}>
            <Navigation />
          </View>
          <StatusBar style="auto" />
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: "#E9E9E9",
  },
  navContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9E9E9",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 20,
    marginRight: 20,
  },
});
