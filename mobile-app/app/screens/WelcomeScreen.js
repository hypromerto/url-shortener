import React from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { styles } from "../shared/Styles";

export default function WelcomeScreen({ navigation }) {

  const toLogin = () => {
    navigation.navigate('Login');
  }

  const toRegister = () => {
    navigation.navigate('Register');
  }
  return (
    <ImageBackground
      style={styles.welcomeBackground}
      source={require("../assets/welcomebg.jpg")}
    >
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require("../assets/app-logo.png")}
        />
        <Text style={styles.appTitle}>lidl.one</Text>
      </View>
      <TouchableOpacity onPress={toLogin} style={styles.loginContainer}>
        <Text style={styles.welcomeButton}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toRegister} style={styles.registerContainer}>
        <Text style={styles.welcomeButton}>Register</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
