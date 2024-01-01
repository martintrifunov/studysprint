import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

const FriendsBlockHeader = ({ addFriendBottomSheetModalRef }) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  blockHeader: {
    display: "flex",
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    top: 25,
    marginLeft: "auto",
    marginRight: "auto",
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

export default FriendsBlockHeader;
