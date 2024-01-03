import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import FriendsList from "./FriendsList";
import { LinearGradient } from "expo-linear-gradient";

const FriendsBlockBody = ({ friendsList }) => {
  return (
    <View style={styles.blockBody}>
      <ScrollView>
        {friendsList.map((friend, index) => (
          <FriendsList
            key={index}
            name={friend.name}
            session={friend.session}
          />
        ))}
      </ScrollView>
      <LinearGradient
        style={{ position: "absolute", bottom: 0, width: "100%", height: 35 }}
        colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 1)"]}
        pointerEvents={"none"}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    blockBody: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
      width: "94%",
      height: "83%",
      top: 50,
      left: 20,
    },
  });

export default FriendsBlockBody;
