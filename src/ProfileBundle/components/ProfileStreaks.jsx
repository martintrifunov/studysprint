import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileStreaks = () => {
  return (
    <View style={styles.userFooter}>
      <MaterialCommunityIcons name="fire" size={24} color="black" />
      <Text>3 Days</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userFooter: {
    display: "flex",
    flexDirection: "row",
    width: "85%",
    top: 60,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileStreaks;
