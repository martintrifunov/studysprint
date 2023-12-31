import { StatusBar } from "expo-status-bar";
import React from "react";
import Timer from "./src/TimerBundle/components/Timer";
import { StyleSheet, View } from "react-native";
import Navigation from "./src/NavigationBundle/components/Navigation";
import Friends from "./src/FriendsBundle/components/Friends";
import Profile from "./src/ProfileBundle/components/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Timer">
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="Timer" component={Timer} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
      <View style={styles.navContainer}>
        <Navigation />
      </View>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
