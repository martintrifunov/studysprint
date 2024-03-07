import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import friendsService from "../../AppBundle/services/friendsService";
import AuthContext from "../../AuthBundle/context/AuthContext";
import sessionService from "../../AppBundle/services/sessionService";

const FriendsList = ({ name, session, friendCode, id }) => {
  const { userToken } = useContext(AuthContext);

  const removeFriend = async () => {
    try {
      const res = await friendsService.deleteUserFriend(userToken, friendCode);

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const addMemberToSession = async () => {
    try {
      const res = await sessionService.addMemberToSession(userToken, id);
      ToastAndroid.show(
        "Friend has been added to your session...",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const removeMemberFromSession = async () => {
    try {
      const res = await sessionService.removeMemberToSession(userToken, id);
      ToastAndroid.show(
        "Friend has been removed to your session...",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFromSession = () => {
    removeMemberFromSession();
  };

  const handleAddToSession = () => {
    addMemberToSession();
  };

  return (
    <View style={styles.listContainer}>
      <View style={styles.leftBlock}>
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
          <TouchableOpacity
            style={styles.iconStyle}
            disabled={false}
            onPress={handleAddToSession}
          >
            <AntDesign name="pluscircle" size={25} color="#60B3FF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconPlusStyle}
            onPress={handleRemoveFromSession}
          >
            <Entypo name="circle-with-cross" size={25} color="crimson" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  leftBlock: {
    flexDirection: "row",
    width: 135
  },
  listContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 15,
    width: "100vw",
  },
  buttonBlock: {
    display: "flex",
    flexDirection: "row",
    width: "20%",
    justifyContent: "center",
    marginTop: 13,
    marginLeft: 80,
  },
  profilePictureContainer: {
    borderRadius: 100,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 3,
    elevation: 3,
  },
  nameStyle: {
    marginLeft: 20,
    marginRight: 0,
    fontSize: 17,
    marginTop: 5,
  },
  sessionStyle: {
    marginLeft: 20,
    color: "#535353",
  },
  iconPlusStyle: {
    paddingLeft: 15,
  },
});

export default FriendsList;
