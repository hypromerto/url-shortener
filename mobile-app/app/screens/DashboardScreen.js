import React from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { styles } from "../shared/Styles";

export default function Dashboard({ navigation }) {
  const toPostGen = () => {
    navigation.navigate("PostGen")
  }

  return (
    <View style={styles.internalBackground}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Original URL"
          placeholderTextColor="#003f5c"
        />
      </View>
      <TouchableOpacity onPress={toPostGen} style={styles.button}>
        <Text style={styles.text}>Shorten</Text>
      </TouchableOpacity>
    </View>
  );
}
