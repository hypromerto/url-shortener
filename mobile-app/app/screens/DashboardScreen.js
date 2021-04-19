import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import Clipboard from "expo-clipboard";
import { styles } from "../shared/Styles";

export default function Dashboard({ navigation }) {
  const [copiedText, setCopiedText] = useState("");

  const toPostGen = () => {
    navigation.navigate("PostGen");
  };

  const paste = async () => {
    Clipboard.setString("hello world");
    const text = await Clipboard.getStringAsync();
    console.log(text);
    setCopiedText(text);
  };

  return (
    <View style={styles.internalBackground}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Original URL"
          placeholderTextColor="#003f5c"
          value={copiedText}
          onChangeText={setCopiedText}
        />
      </View>
      <TouchableOpacity onPress={paste} style={styles.button}>
        <Text style={styles.text}>Paste</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toPostGen} style={styles.button}>
        <Text style={styles.text}>Shorten</Text>
      </TouchableOpacity>
    </View>
  );
}
