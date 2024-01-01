import { View, StyleSheet } from "react-native";
import React from "react";
import ProfileEdit from "./ProfileEdit";
import ProfileUser from "./ProfileUser";
import ProfileStreaks from "./ProfileStreaks";
import ProfileStats from "./ProfileStats";

const Profile = () => {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [1, 3, 10, 8, 4, 3, 7],
      },
    ],
  };
  return (
    <View>
      <View style={styles.userContainer}>
        <ProfileEdit />
        <ProfileUser />
        <ProfileStreaks />
      </View>

      <View style={styles.statsContainer}>

        <ProfileStats data={data} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: "white",
    width: "90%",
    height: "43%",
    borderRadius: 40,
    elevation: 5,
    top: 50,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
  },
  statsContainer: {
    backgroundColor: "white",
    width: "90%",
    height: "45%",
    borderRadius: 40,
    elevation: 5,
    top: 80,
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexDirection: "column",
  },

});

export default Profile;
