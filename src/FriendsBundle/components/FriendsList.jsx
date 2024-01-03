import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const FriendsList = ({ name, session }) => {
  return (
    <View style={styles.listContainer}>
       <View style={styles.profilePictureContainer}>
          <TouchableOpacity>
            <FontAwesome name="user-circle" size={60} color="black" />
          </TouchableOpacity>
        </View>
      <View>
        <Text style={styles.nameStyle}>{name}</Text>
        <Text style={styles.sessionStyle}>
          {session ? "In a session..." : "Idlling..."}
        </Text>
      </View>
      {session === true ? (
        <View style={styles.buttonBlock}>
          <TouchableOpacity style={styles.iconStyle}>
            <AntDesign name="rightcircle" size={25} color="#60B3FF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle} disabled={true}>
            <AntDesign name="pluscircle" size={25} color="#bdbdbd" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonBlock}>
          <TouchableOpacity style={styles.iconStyle} disabled={true}>
            <AntDesign name="rightcircle" size={25} color="#bdbdbd" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconStyle}>
            <AntDesign name="pluscircle" size={25} color="#60B3FF" />
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
    marginBottom: 15,
    width: "100%"
  },
  buttonBlock: {
    display: "flex",
    flexDirection: "row",
    width: "36%",
    justifyContent: "flex-end"
  },
  profilePictureContainer: {
    borderRadius: 100,
    borderColor: 'white',
    backgroundColor: "white",
    borderWidth: 3,
    elevation: 3
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
    marginLeft: 20,
    marginRight: 3,
    marginTop: 13,
  },
});

export default FriendsList;
