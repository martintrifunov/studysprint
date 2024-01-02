import { View, StyleSheet } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ProfileEditButton = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.userHeader}>
      <TouchableOpacity onPress={() => navigation.navigate("ProfileEdit")}>
        <MaterialCommunityIcons name="pencil" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  userHeader: {
    display: "flex",
    flexDirection: "row",
    width: "85%",
    justifyContent: "flex-end",
    top: 25,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default ProfileEditButton;
