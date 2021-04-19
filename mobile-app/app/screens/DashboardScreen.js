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

const QUERY = {
  originalURL: "www.bombabomba.com",
  key: "lock",
  creator: "yucin the great",
  expirationDate: "dün",
};

const requestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(QUERY),
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

export default function Dashboard({ navigation }) {
  const [customURL, setcustomURL] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const toPostGen = () => {
    navigation.navigate("PostGen");
  };

  const paste = async () => {
    //Clipboard.setString("hello world");
    const text = await Clipboard.getStringAsync();
    console.log(text);
    setCopiedText(text);
  };

  return (
    <View style={styles.internalBackground}>
      <View style={inStyles.URLContainer}>
        <View style={inStyles.URLInputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Original URL"
            placeholderTextColor="#003f5c"
            value={copiedText}
            onChangeText={setCopiedText}
          />
        </View>
        <TouchableOpacity onPress={paste} style={inStyles.miniButton}>
          <Icon name="content-paste" color="#fff" />
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
    backgroundColor: "#16589b",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
  },
  URLContainer: {
    flexDirection: "row",
  },
  URLInputView: {
    width: "70%",
    backgroundColor: "#fff",
    borderRadius: 25,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#000",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
});
