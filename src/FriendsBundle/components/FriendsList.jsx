import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const FriendsList = ({ name, session }) => {
  return (
    <View style={styles.listContainer}>
      <FontAwesome name="user-circle" size={60} color="black" />
      <View>
        <Text style={styles.nameStyle}>{name}</Text>
        <Text style={styles.sessionStyle}>
          {session ? "In a session..." : "Idlling..."}
        </Text>
      </View>
      {session === true ? (
        <View style={styles.buttonBlock}>
          <TouchableOpacity style={styles.iconStyle}>
            <AntDesign name="rightcircle" size={24} color="#60B3FF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle} disabled={true}>
            <AntDesign name="pluscircle" size={24} color="#919090" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonBlock}>
          <TouchableOpacity style={styles.iconStyle} disabled={true}>
            <AntDesign name="rightcircle" size={24} color="#919090" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle}>
            <AntDesign name="pluscircle" size={24} color="#60B3FF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  buttonBlock: {
    display: "flex",
    flexDirection: "row"
  },
  nameStyle: {
    marginLeft: 20,
    marginRight: 30,
    fontSize: 17,
    marginTop: 5,
  },
  sessionStyle: {
    marginLeft: 20,
    color: "#535353"
  },
  iconStyle: {
    marginLeft: 25,
    marginTop: 13,
  },
});

export default FriendsList;
