import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useRef } from "react";
import FriendsList from "./FriendsList";
import { LinearGradient } from "expo-linear-gradient";
import FriendsAddFriendBottomSheetModal from "./FriendsAddFriendBottomSheetModal";

const Friends = () => {
  const friendsListDataFixture = [
    { name: "John Doe", session: true },
    { name: "John Doe", session: true },
    { name: "Jane Doe", session: false },
    { name: "John Doe", session: true },
    { name: "Jane Doe", session: false },
    { name: "Jane Doe", session: false },
    { name: "John Doe", session: true },
    { name: "Jane Doe", session: false },
    { name: "Jane Doe", session: false },
  ];
  const userFriendCode = "#372AB@";
  const addFriendBottomSheetModalRef = useRef(null);

  return (
    <View style={styles.blockContainer}>
      <View style={styles.blockHeader}>
        <Text style={styles.headerText}>Friends</Text>
        <TouchableOpacity
          onPress={() => addFriendBottomSheetModalRef.current?.present()}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Add Friends +</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.blockBody}>
        <ScrollView>
          {friendsListDataFixture.map((friend, index) => (
            <FriendsList
              key={index}
              name={friend.name}
              session={friend.session}
            />
          ))}
        </ScrollView>
        <LinearGradient
          style={{ position: "absolute", bottom: 0, width: "90%", height: 35 }}
          colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 1)"]}
          pointerEvents={"none"}
        />
      </View>
      <FriendsAddFriendBottomSheetModal
        userFriendCode={userFriendCode}
        addFriendBottomSheetModalRef={addFriendBottomSheetModalRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    backgroundColor: "white",
    width: "90%",
    height: "80%",
    borderRadius: 40,
    elevation: 5,
    top: 50,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
  },
  blockHeader: {
    display: "flex",
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    top: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
  blockBody: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    width: "94.5%",
    height: "83%",
    top: 50,
    left: 20,
  },
  headerText: {
    fontSize: 17,
    color: "#535353",
  },
  buttonContainer: {
    backgroundColor: "#60B3FF",
    width: 120,
    height: 30,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    textTransform: "uppercase",
  },
});

export default Friends;
