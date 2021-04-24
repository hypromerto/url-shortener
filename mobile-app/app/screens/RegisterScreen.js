import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { environment } from "../shared/environment";
import { styles } from '../shared/Styles'
import { urls } from "../shared/Urls";


export default function RegisterScreen({ navigation }) {

  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");

  const toDashboard = () => {
    const userInformation = {
      "username": username,
      "password": password,
      "client_secret": environment.CLIENT_SECRET
    };
    console.log(userInformation);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInformation)
    }

    fetch(urls.REGISTER_URL, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        Toast.show({
          type: "success",
          text1: "Register Successful",
          autoHide: true
        })
        navigation.navigate("Login", { message: "Register Successful" })
      })
      .catch(err => {
        Toast.show({
          type: "error",
          text1: "Register Failed",
          autoHide: true
        })
      })
  };

  return (
    <ImageBackground
      style={styles.externalBackground}
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
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={onChangeUsername}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={onChangePassword}
        />
      </View>
      <TouchableOpacity onPress={toDashboard} style={styles.button}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}