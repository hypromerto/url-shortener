import React from "react";
import { StyleSheet, Text, View, Share, TouchableOpacity } from "react-native";
import { styles } from "../shared/Styles";

export default function PostGenScreen({navigation}) {
  
  var key = navigation.getParam("data")
  console.log("props: " + key);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "bamy.as/" + key,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.internalBackground}>
      <Text>Generated Successfully</Text>
      <Text>KEY: {"bamy.as/" + key}</Text>
      <TouchableOpacity onPress={onShare} style={styles.button}>
        <Text style={styles.text}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const inStyles = StyleSheet.create({});
