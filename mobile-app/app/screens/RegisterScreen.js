import React from "react";
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

import { styles } from '../shared/Styles'

export default function RegisterScreen({ navigation }) {

  const toDashboard = () => {
    const userInformation = {
      "username": username,
      "password": password
    };
    console.log(userInformation);

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userInformation)
    }
    fetch('http://35.187.92.19/register', requestOptions)
    .then(response => {
      console.log(response)
      //setAccessToken(response.data.authItem)
      //navigation.navigate("Dashboard");
    })
    .catch(error => {
      console.error("There was an error" + error)
    })
   
    navigation.navigate("Login");
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
      <TouchableOpacity onPress={toDashboard} style={styles.button}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
