import { View, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ProfileEditButton from "./ProfileEditButton";
import ProfileUser from "./ProfileUser";
import ProfileStreaks from "./ProfileStreaks";
import ProfileStats from "./ProfileStats";
import sessionService from "../../AppBundle/services/sessionService";
import AuthContext from "../../AuthBundle/context/AuthContext";

const Profile = () => {
  const { userToken } = useContext(AuthContext);
  const [statistics, setStatistics] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [isLoading, setIsloading] = useState(true);

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: statistics,
      },
    ],
  };

  const getStatistics = async () => {
    setIsloading(true);
    try {
      const res = await sessionService.getUserSessionStatistics(userToken);
      setStatistics(res);
    } catch (error) {
      console.log("Error fetching profile stats:", error);
      setStatistics([0, 0, 0, 0, 0, 0, 0]);
    }
    setIsloading(false);
  };

  useEffect(() => {
    getStatistics();
  }, []);

  return (
    <View>
      <View style={styles.userContainer}>
        <ProfileEditButton />
        <ProfileUser />
        <ProfileStreaks />
      </View>

      <View style={styles.statsContainer}>
        {!isLoading && <ProfileStats data={data} />}
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
