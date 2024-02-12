import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import AuthContext from "../../AuthBundle/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const ProfileCamera = () => {
  const cameraRef = useRef(null);
  const [hasCameraPerms, setHasCameraPerms] = useState();
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const { setCurrentScreen } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPerms(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current?.takePictureAsync();
        setImage(data?.uri ?? "");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const navigateToProfile = () => {
    setCurrentScreen("ProfileEdit");
    navigation.navigate("ProfileEdit");
  };

  const savePicture = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        Alert.alert("Picture saved!");
        setImage(null);
        navigateToProfile();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!hasCameraPerms) {
    return <Text>No access to camera :(</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <View style={styles.topButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            >
              <Entypo name={"retweet"} size={20} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
            >
              <Entypo
                name={"flash"}
                size={20}
                color={
                  flash === Camera.Constants.FlashMode.off ? "white" : "yellow"
                }
              />
            </TouchableOpacity>
          </View>
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          ></Camera>
        </>
      ) : (
        <>
          <View style={styles.topButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigateToProfile()}
            >
              <Entypo name={"cross"} size={20} color={"white"} />
              <Text style={styles.text}>Discard</Text>
            </TouchableOpacity>
          </View>
          <Image source={{ uri: image }} style={styles.camera} />
        </>
      )}

      <View>
        {image ? (
          <View style={styles.bottomButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setImage(null)}
            >
              <Entypo name={"retweet"} size={20} color={"white"} />
              <Text style={styles.text}>Re-take</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={savePicture}>
              <Entypo name={"check"} size={20} color={"white"} />
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Entypo name={"camera"} size={20} color={"white"} />
            <Text style={styles.text}>Take a Picture</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
    paddingBottom: 20,
  },
  camera: {
    flex: 1,
    borderRadius: 2,
    paddingHorizontal: 200,
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
  },
  bottomButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 50,
  },
  button: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
});
export default ProfileCamera;
