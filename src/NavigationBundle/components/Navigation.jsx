import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Navigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.pillContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Friends")}>
        <MaterialCommunityIcons
          name="handshake-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Timer")}>
        <AntDesign name="home" size={25} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <FontAwesome5 name="user" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    display: "flex",
    position: "absolute",
    backgroundColor: "white",
    width: 240,
    height: 50,
    borderRadius: 40,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    elevation: 5,
    bottom: 25,
    paddingRight: 40,
    paddingLeft: 40,
  },
});

export default Navigation;
