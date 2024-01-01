import { View, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProfileEdit = () => {
  return (
    <View style={styles.userHeader}>
      <MaterialCommunityIcons name="pencil" size={24} color="black" />
    </View>
  );
};
const styles = StyleSheet.create({
  userHeader: {
    display: "flex",
    flexDirection: "row",
    width: "85%",
    justifyContent: "flex-end",
    top: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default ProfileEdit;
