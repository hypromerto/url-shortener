import React, { useState } from "react";
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

const AUTH_URL = "http://34.78.211.85/shorten/";

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

  const toPostGen = () => {
    let QUERY = {
      originalURL: originalURL,
      key: "bu ne anlamadım",
      creator: "gelecek",
      expirationDate: "tbd", //burada gün sayısı mı vereyim direkt tarih mi
    };
    fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(QUERY),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    navigation.navigate("PostGen");
  };

  const paste = async () => {
    //Clipboard.setString("hello world");
    const text = await Clipboard.getStringAsync();
    setOriginalURL(text);
  };

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
    width: "10%",
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
  },
  URLInputView: {
    width: "70%",
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
