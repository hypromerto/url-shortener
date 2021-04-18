import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";

export default class RegisterScreen extends Component {
  render() {
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
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Name"
            placeholderTextColor="#003f5c"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Password"
            placeholderTextColor="#003f5c"
          />
        </View>
        <TouchableHighlight style={styles.loginButton}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  appTitle: {
    fontSize: 35,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    height: 50,
    color: "white",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 25,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#000",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  loginButton: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "white",
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
});
