import { View, StyleSheet } from "react-native";
import React, { useRef } from "react";
import FriendsAddFriendBottomSheetModal from "./FriendsAddFriendBottomSheetModal";
import FriendsBlockHeader from "./FriendsBlockHeader";
import FriendsBlockBody from "./FriendsBlockBody";

const Friends = () => {
  const userFriendCode = "#372AB@";
  const addFriendBottomSheetModalRef = useRef(null);
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

  return (
    <View style={styles.blockContainer}>
      <FriendsBlockHeader
        addFriendBottomSheetModalRef={addFriendBottomSheetModalRef}
      />

      <FriendsBlockBody friendsList={friendsListDataFixture} />

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
});

export default Friends;
