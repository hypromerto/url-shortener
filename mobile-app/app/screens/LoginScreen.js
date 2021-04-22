import React from "react";
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
    setUsername,
    setAccessToken
  } = useUserContext();

  const toDashboard = () => {
    /**
     * Send Login Request.then(r => {
     *  setUsername(r.username)
     *  setAccessToken(r.access_token)
     * }) 
     * */
    navigation.navigate("Dashboard");
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
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
