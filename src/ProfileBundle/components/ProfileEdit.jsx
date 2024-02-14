import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../AuthBundle/context/AuthContext";
import userService from "../../AppBundle/services/userService";
import { useFocusEffect } from '@react-navigation/native';

const ProfileEdit = () => {
  const { logout, setCurrentScreen, userToken } = useContext(AuthContext);
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
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
  },[]);

  useFocusEffect(
    useCallback(() => {
      getProfilePicture();
    }, [])
  );

  const navigateToCamera = () => {
    setCurrentScreen("ProfileCamera");
    navigation.navigate("ProfileCamera");
  };

  return (
    <>
      {!isLoading && (
        <View style={styles.profileContainer}>
          <View style={styles.profilePictureContainer}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profilePicture} />
            ) : (
              <FontAwesome name="user-circle" size={120} color="black" />
            )}
          </View>

          <TouchableOpacity
            style={styles.editPenContainer}
            onPress={() => navigateToCamera()}
          >
            <MaterialCommunityIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder={`Display Name...`} />
            <View style={styles.iconStyle}>
              <FontAwesome5 name="user" size={18} color="black" />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`New Password...`}
              secureTextEntry={true}
            />
            <View style={styles.iconStyle}>
              <Feather name="lock" size={18} color="black" />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`Old Password...`}
              secureTextEntry={true}
            />
            <View style={styles.iconStyle}>
              <Feather name="lock" size={18} color="black" />
            </View>
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutContainer}
            onPress={() => {
              logout();
            }}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    top: 75,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  profilePictureContainer: {
    position: "absolute",
    borderRadius: 100,
    borderColor: "white",
    backgroundColor: "white",
    borderWidth: 3,
    elevation: 5,
    top: 10,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },
  editPenContainer: {
    position: "absolute",
    left: 225,
    bottom: 210,
    backgroundColor: "white",
    elevation: 6,
    borderRadius: 100,
    padding: 4,
  },
  inputContainer: {
    flexDirection: "row",
    top: 175,
  },
  iconStyle: {
    position: "absolute",
    top: 20,
    left: 15,
  },
  input: {
    width: "70%",
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 40,
    fontSize: 16,
    lineHeight: 20,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 40,
    paddingRight: 20,
    backgroundColor: "white",
    elevation: 5,
  },
  buttonContainer: {
    backgroundColor: "#60B3FF",
    width: 275,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    elevation: 5,
    top: 182,
  },
  logoutContainer: {
    backgroundColor: "#ff6060",
    width: 275,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    elevation: 5,
    top: 197,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textTransform: "uppercase",
  },
});

export default ProfileEdit;
