import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
} from "react-native";
import { Icon } from "react-native-elements";
import Clipboard from "expo-clipboard";
import { styles } from "../shared/Styles";
import axios from "react-native-axios";

const AUTH_URL = "";

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

export default function Dashboard({ navigation }) {
  const [customURL, setcustomURL] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [originalURL, setOriginalURL] = useState("");

  useEffect(() => {
    Toast.show({
      type: "success",
      text1: navigation.getParam("message"),
      autoHide: true
    })
  }, [])

  const toPostGen = () => {

    var QUERY = {
      "token": "",
      "originalURL": originalURL,
      "expirationDate": "12-04-2022"
    };
    if (isSelected) {
      if(customURL.length === 8) {
        QUERY.customURL = customURL;
      }
      
    }

    fetch("http://34.78.211.85/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(QUERY),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log(data["key"]);
        navigation.navigate("PostGen", { data: data["key"] });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const paste = async () => {
    // Clipboard.setString("hello world");
    const text = await Clipboard.getStringAsync();
    setOriginalURL(text);
  };

  const toAnalytics = () => {
    var QUERY = {
      username: "mert",
      token:
        ""
    };

    var dates = [];
    var clicks = [];

    console.log("will fetch");
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    axios.post("http://35.240.125.186/analytics", JSON.stringify(QUERY), axiosConfig)
      .then((res) => {
        console.log(res);
        res.data.forEach((entry) => {
          console.log("Clicks count: ", clicks.push(entry["numberOfClicks"]));
          console.log("Dates count: ", dates.push(entry["dateOfCreate"]));
        })
      })
      .then(() => {
        console.log(clicks)
        console.log(dates)
        const line = ({
          labels: dates,
          datasets: [
            {
              data: clicks,
              strokeWidth: 2, // optional
            }
          ]
        })
        navigation.navigate("Analytics", {"line": line});
      })
      .catch((e) => {
        console.log(e);
      })
    
  }

  return (
    <View style={styles.internalBackground}>
      <View style={inStyles.URLContainer}>
        <View style={inStyles.URLInputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Original URL"
            placeholderTextColor="#003f5c"
            value={originalURL}
            onChangeText={setOriginalURL}
          />
        </View>
        <TouchableOpacity onPress={paste} style={inStyles.miniButton}>
          <Icon name="content-paste" color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputView} display={isSelected ? "flex" : "none"}>
        <TextInput
          style={styles.inputText}
          placeholder="Custom URL"
          placeholderTextColor="#003f5c"
          value={customURL}
          onChangeText={setcustomURL}
        />
      </View>
      <View style={inStyles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={inStyles.checkbox}
        />
        <Text style={inStyles.label}>Do you want to customize your URL?</Text>
      </View>
      <TouchableOpacity onPress={toPostGen} style={styles.button}>
        <Text style={styles.text}>Shorten</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toAnalytics} style={styles.button}>
        <Text style={styles.text}>View Analytics</Text>
      </TouchableOpacity>
    </View>
  );
}

const inStyles = StyleSheet.create({
  checkbox: {
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  label: {
    margin: 8,
  },
  miniButton: {
    width: "12.5%",
    backgroundColor: "#fff",
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    borderStyle: "solid",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderColor: "#000",
    height: 50,
    justifyContent: "center",
  },
  URLContainer: {
    flexDirection: "row",
    width: "80%"
  },
  URLInputView: {
    width: "87.5%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderBottomStartRadius: 25,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#000",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,

  },
});
