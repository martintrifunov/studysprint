import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const ProfileUser = () => {
  return (
    <View style={styles.userBody}>
      <FontAwesome name="user-circle" size={90} color="black" />
      <Text style={styles.userName}>John Doe</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userBody: {
    display: "flex",
    flexDirection: "column",
    width: "85%",
    top: 50,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
  },
});

export default ProfileUser;
