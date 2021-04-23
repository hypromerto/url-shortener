import React, {useState} from "react";
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
import { useUserContext } from "../shared/UserContext";

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
    fetch('http://localhost:8080/login', requestOptions)
    .then(response => {
      console.log(response)
      //setAccessToken(response.data.authItem)
      //navigation.navigate("Dashboard");
    })
    .catch(error => {
      console.error("There was an error" + error)
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
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
