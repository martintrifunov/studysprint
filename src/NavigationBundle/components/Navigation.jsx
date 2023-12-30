import React from "react";
import { View, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Navigation = () => {
  return (
    <View style={styles.pillContainer}>
      <MaterialCommunityIcons name="handshake-outline" size={24} color="black" />
      <AntDesign name="home" size={25} color="black" />
      <FontAwesome5 name="user" size={20} color="black" />
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
    flexDirection: 'row',
    elevation: 5,
    bottom: 25,
    paddingRight: 40,
    paddingLeft: 40
  },
});

export default Navigation;
