import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, SafeAreaView, View, Button, Image } from "react-native";

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

export default class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      pressed: false,
      data: "",
       }
  }

  sendRequest = () => {
    console.log("Pressed");
    fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify( QUERY)
    })
   .then(() => {
      this.setState({
         pressed: !(this.state.pressed),
         data: "Added",
      })
   })
   .catch((error) => {
      console.error(error);
   });
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        width: "100%",
        height: "100%",
        backgroundColor: "gray",
        alignItems: "center",
        justifyContent: "center",
      },
      logoView:{
        height: "20%",
      },
      logo:{
        flex: 1,
        resizeMode: 'contain'
      },
      titleView: {
        height: "50%",
        alignContent: "center",
        alignItems: "center"
      },
      title: {
        fontSize: 40,
        textAlign: "center",
        alignContent: "center",
        alignItems: "center",
        color: "darkblue",
      },
      responseView: {
        width: "90%",
      },
    });
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.logoView}>
          <Image style={styles.logo} source={require('./assets/app-logo.png')}/>
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>Welcome to Erol Cloud App!</Text>
        </View>
        <StatusBar style="auto" />
        <View style={styles.responseView}>
          <Button title="Selam" onPress={this.sendRequest} />
          <Text>{this.state.data}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

