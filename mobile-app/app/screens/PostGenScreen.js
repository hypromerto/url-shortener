import React from "react";
import { StyleSheet, Text, View, Share, TouchableOpacity } from "react-native";
import { styles } from "../shared/Styles";

export default function PostGenScreen({ navigation }) {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "React Native | A framework for building native apps using React",
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.internalBackground}>
      <Text>Generated Successfully</Text>
      <TouchableOpacity onPress={onShare} style={styles.button}>
        <Text style={styles.text}>Share</Text>
      </TouchableOpacity>
    </View>
  );
}

const inStyles = StyleSheet.create({});
