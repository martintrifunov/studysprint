import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Navigation = () => {
  const [selectionBag, setSelectionBag] = useState({timer: true});
  const navigation = useNavigation();

  const navigationHandler = (currentlySelectedTab) => {
    switch (currentlySelectedTab) {
      case "friends":
        setSelectionBag({friends: true})
        navigation.navigate("Friends")
        break;
      case "timer":
        setSelectionBag({timer: true})
        navigation.navigate("Timer")
        break;
      case "profile":
        setSelectionBag({profile: true})
        navigation.navigate("Profile")
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.pillContainer}>
      <TouchableOpacity onPress={() => navigationHandler("friends")}>
        <MaterialCommunityIcons
          name="handshake-outline"
          size={24}
          color={selectionBag?.friends === true ? "#60B3FF" : "black"}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigationHandler("timer")}>
        <AntDesign name="home" size={25} color={selectionBag?.timer === true ? "#60B3FF" : "black"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigationHandler("profile")}>
        <FontAwesome5 name="user" size={20} color={selectionBag?.profile === true ? "#60B3FF" : "black"} />
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
