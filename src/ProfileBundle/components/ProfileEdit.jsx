import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ProfileEdit = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.profileContainer}>
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity>
            <FontAwesome name="user-circle" size={115} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.editPenContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>

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

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    top: 10
  },
  editPenContainer: {
    position: "absolute",
    left: 225,
    bottom: 170,
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    elevation: 5,
    top: 182,

  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textTransform: "uppercase",
  },
});

export default ProfileEdit;
