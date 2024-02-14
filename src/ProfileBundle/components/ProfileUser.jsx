import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import userService from "../../AppBundle/services/userService";
import AuthContext from "../../AuthBundle/context/AuthContext";
import { useFocusEffect } from '@react-navigation/native';

const ProfileUser = () => {
  const [image, setImage] = useState(null);
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsloading] = useState(false);

  const getProfilePicture = async () => {
    setIsloading(true);
    try {
      const res = await userService.getProfilePictureService(userToken);
      setImage(res.base64);
    } catch (error) {
      console.log("Error fetching profile picture:", error);
      setImage(null);
    }
    setIsloading(false);
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getProfilePicture();
    }, [])
  );

  return (
    <>
      {!isLoading && (
        <View style={styles.userBody}>
          <View style={styles.profilePictureContainer}>
            <TouchableOpacity>
              {image ? (
                <Image source={{ uri: image }} style={styles.profilePicture}/>
              ) : (
                <FontAwesome name="user-circle" size={90} color="black" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>John Doe</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  userBody: {
    display: "flex",
    flexDirection: "column",
    width: "85%",
    top: 50,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
  userName: {
    marginTop: 10,
    fontSize: 20,
  },
  profilePictureContainer: {
    borderRadius: 100,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 3,
    elevation: 5,
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 100,
  }
});

export default ProfileUser;
