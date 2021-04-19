import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, SafeAreaView, View, Button, Image } from "react-native";
import RegisterScreen from "./app/screens/RegisterScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import Navigation from "./app/navigation/Navigation"

const AUTH_URL = "http://34.78.211.85/shorten";

const QUERY = {
  "originalURL": "www.bombabomba.com",
  "key": "lock",
  "creator": "yucin the great",
  "expirationDate": "dün"
};

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify( QUERY)
};

// sendRequest = () => {
//   console.log("Pressed");
//   fetch(AUTH_URL, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify( QUERY)
//   })
//  .then(() => {
//     this.setState({
//        pressed: !(this.state.pressed),
//        data: "Added",
//     })
//  })
//  .catch((error) => {
//     console.error(error);
//  });
// }
export default class App extends Component{

  render() {
    return (
      <Navigation />
    );
  }
}

