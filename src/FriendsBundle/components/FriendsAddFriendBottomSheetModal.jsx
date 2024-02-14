import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Entypo } from "@expo/vector-icons";
import AuthContext from "../../AuthBundle/context/AuthContext";
import friendsService from "../../AppBundle/services/friendsService";

const FriendsAddFriendBottomSheetModal = ({
  userFriendCode,
  addFriendBottomSheetModalRef,
}) => {
  const snapPoints = useMemo(() => ["35%"], []);
  const [newFriendCode, setNewFriendCode] = useState(null);
  const { userToken } = useContext(AuthContext);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const handleAddFriend = async () => {
    await friendsService.addUserFriend(userToken, newFriendCode);
    addFriendBottomSheetModalRef.current?.snapToIndex(0);
    Keyboard.dismiss();
  };
  // 9R4VCC

  return (
    <BottomSheetModal
      ref={addFriendBottomSheetModalRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      index={0}
      backdropComponent={renderBackdrop}
    >
      <Text style={styles.yourFriendCodeStyle}>
        Your friend code:{" "}
        <Text style={{ fontWeight: "bold" }}>{userFriendCode}</Text>
      </Text>
      <Text style={styles.textStyle}>
        <Entypo name="code" size={16} color="#535353" /> Enter friend code:
      </Text>
      <BottomSheetTextInput
        style={styles.input}
        onChangeText={(value) => setNewFriendCode(value)}
        value={newFriendCode}
      />
      <TouchableOpacity onPress={handleAddFriend}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Add Friend</Text>
        </View>
      </TouchableOpacity>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
  textStyle: {
    color: "#535353",
    marginLeft: 20,
  },
  yourFriendCodeStyle: {
    color: "#535353",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
    marginBottom: 30,
    fontSize: 17,
  },
  buttonContainer: {
    backgroundColor: "#60B3FF",
    width: "90%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textTransform: "uppercase",
  },
});

export default FriendsAddFriendBottomSheetModal;
