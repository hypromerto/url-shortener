import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
} from "react-native";

function WelcomeScreen(props) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/welcomebg.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require("../assets/app-logo.png")}
        />
        <Text style={styles.appTitle}>Erol Cloud</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginButton}>Login</Text>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerButton}>Register</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 35,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  loginContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "#6794b5",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
  registerButton: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  registerContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "#4b84ac",
    justifyContent: "center"
  },
});

export default WelcomeScreen;
