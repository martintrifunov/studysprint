import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const { login, error, setError } = useContext(AuthContext);
  const navigation = useNavigation();

  const navigateMe = () => {
    setError(null)
    navigation.navigate('SignUp');
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../assets/background.png")}
      />
      <Animated.Text
        entering={FadeInUp.delay(400).duration(1000).springify()}
        style={styles.greetingsText}
      >
        Hi,
      </Animated.Text>
      <Animated.Text
        entering={FadeInUp.delay(600).duration(1000).springify()}
        style={styles.sloganText}
      >
        Welcome to StudySprint!
      </Animated.Text>

      {error && (
        <Animated.Text
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={styles.errorStyle}
        >
          {error}
        </Animated.Text>
      )}

      <Animated.View
        entering={FadeInDown.delay(400).duration(1000).springify()}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder={`Username...`}
          value={username}
          onChangeText={(text) => setUserName(text)}
        />
        <View style={styles.iconStyle}>
          <FontAwesome5 name="user" size={18} color="black" />
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(600).duration(1000).springify()}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder={`Password...`}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.iconStyle}>
          <Feather name="lock" size={18} color="black" />
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(800).duration(1000).springify()}
        style={styles.fixButtonFloat}
      >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            login(username, password);
          }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(1000).duration(1000).springify()}
        style={styles.redirectText}
      >
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigateMe()} >
          <Text style={{ color: "#38BDF8" }}>Sign up!</Text>
        </TouchableOpacity>
      </Animated.View>

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  image: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  greetingsText: {
    color: "white",
    fontSize: 30,
    display: "flex",
    height: "75%",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    position: "absolute",
    left: 85,
  },
  sloganText: {
    color: "white",
    fontSize: 40,
    display: "flex",
    height: "65%",
    alignItems: "flex-start",
    position: "absolute",
  },
  inputContainer: {
    flexDirection: "row",
    top: 125,
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
    backgroundColor: "#38BDF8",
    width: 275,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fixButtonFloat: {
    top: 132,
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    textTransform: "uppercase",
  },
  redirectText: {
    display: "flex",
    flexDirection: "row",
    top: 150,
  },
  errorStyle: {
    color: "red",
    top: 110,
  },
});

export default Login;
