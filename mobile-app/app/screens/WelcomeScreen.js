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
        <Text>Erol Cloud</Text>
      </View>
      <View style={styles.loginContainer}>
        <Button style={styles.loginButton} title="Login"></Button>
      </View>
      <View style={styles.registerContainer}>
        <Button style={styles.registerButton} title="Register"></Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    flex: 1,
    flexDirection: "column"
  },
  loginContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "yellow",
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
  },
  registerContainer: {
    width: "100%",
    height: 70,
    backgroundColor: "red",
  },
});

export default WelcomeScreen;
