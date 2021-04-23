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
import { styles } from '../shared/Styles'
import { urls } from "../shared/Urls";


export default function RegisterScreen({ navigation }) {

  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [accountType, setAccountType] = useState("");

  const setB2B = () => {setAccountType("b2b")}
  const setB2C = () => {setAccountType("b2c")}

  const toDashboard = () => {
    const userInformation = {
      "username": username,
      "password": password,
      "account_type": accountType
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
          placeholder="Name"
          placeholderTextColor="#003f5c"
        />
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
      <TouchableOpacity onPress={setB2B} style={styles.button}>
        <Text style={styles.text}>B2B</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={setB2C} style={styles.button}>
        <Text style={styles.text}>B2C</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toDashboard} style={styles.button}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}