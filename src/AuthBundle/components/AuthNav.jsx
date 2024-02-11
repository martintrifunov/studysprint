import { ActivityIndicator, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import AuthContext from "../context/AuthContext";
import Navigation from "../../NavigationBundle/components/Navigation";
import Friends from "../../FriendsBundle/components/Friends";
import Profile from "../../ProfileBundle/components/Profile";
import ProfileEdit from "../../ProfileBundle/components/ProfileEdit";
import Timer from "../../TimerBundle/components/Timer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AuthNav = () => {
  const { isLoading, userToken, currentScreen } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <>
      {userToken !== null ? (
        <>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Timer"
          >
            <Stack.Screen name="Friends" component={Friends} />
            <Stack.Screen name="Timer" component={Timer} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
          </Stack.Navigator>
          <View style={styles.navContainer}>
            <Navigation />
          </View>
        </>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={currentScreen}>
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9E9E9",
  },
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AuthNav;
