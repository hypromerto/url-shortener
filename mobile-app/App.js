import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, SafeAreaView, View, Button, Image } from "react-native";
import RegisterScreen from "./app/screens/RegisterScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import Navigation from "./app/navigation/ExternalNavigation"

const AUTH_URL = "http://34.78.211.85/shorten";

export default class App extends Component{

  render() {
    return (
      <Navigation />
    );
  }
}

