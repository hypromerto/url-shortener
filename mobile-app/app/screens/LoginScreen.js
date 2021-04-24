import React, {useState, useEffect} from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "../shared/Styles";
import { urls } from "../shared/Urls";
import { useUserContext } from "../shared/UserContext";
import Toast from "react-native-toast-message";

export default function LoginScreen({ navigation }) {
  const {
    setAccessToken
  } = useUserContext();

  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");

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
    fetch(urls.LOGIN_URL, requestOptions)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        setAccessToken(data.authItem)
          navigation.navigate("Dashboard", {accountType: data.accountType, message: "Login Successful"})
    })
    .catch(err => {
      Toast.show({
        type: "error",
        text1: "Login failed",
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
          secureTextEntry={true}
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={onChangePassword}
        />
      </View>
      <TouchableOpacity onPress={toDashboard} style={styles.button}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}