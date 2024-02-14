import { View, StyleSheet } from "react-native";
import React, { useCallback, useContext, useRef, useState } from "react";
import FriendsAddFriendBottomSheetModal from "./FriendsAddFriendBottomSheetModal";
import FriendsBlockHeader from "./FriendsBlockHeader";
import FriendsBlockBody from "./FriendsBlockBody";
import AuthContext from "../../AuthBundle/context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import friendsService from "../../AppBundle/services/friendsService";

const Friends = () => {
  const { userToken } = useContext(AuthContext);
  const [userFriendCode, setUserFriendCode] = useState(null);
  const addFriendBottomSheetModalRef = useRef(null);
  const [friendsListData, setFriendsListData] = useState([]);

  const getOwnFriendCode = async (userToken) => {
    try {
      const res = await friendsService.getUserCode(userToken);
      setUserFriendCode(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getFriends = async (userToken) => {
    try {
      const res = await friendsService.getUserFriends(userToken);

      const transformedData = res.map(item => ({ name: item.name, friendCode: item.friendCode, id: item.id, session: false }));

      setFriendsListData(transformedData)
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getOwnFriendCode(userToken);
      getFriends(userToken)
    }, [])
  );

  return (
    <View style={styles.blockContainer}>
      <FriendsBlockHeader
        addFriendBottomSheetModalRef={addFriendBottomSheetModalRef}
      />

      <FriendsBlockBody friendsList={friendsListData} />

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
});

export default Friends;
