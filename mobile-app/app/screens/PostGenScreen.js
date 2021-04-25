import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Share,
  TouchableOpacity,
  Linking,
} from "react-native";
import { styles } from "../shared/Styles";
import { urls } from "../shared/Urls";

export default function PostGenScreen({ navigation }) {
  var key = navigation.getParam("data");
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Here is a short link for you: "+ urls.OUR_URL + "/" + key,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.internalBackground}>
      <Text>Generated Successfully</Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => {
          Linking.canOpenURL("http://" + urls.OUR_URL + "/" + key).then((supported) => {
            if (supported) {
              return Linking.openURL("http://" + urls.OUR_URL + "/" + key).catch(
                () => null
              );
            }
            else{
              console.log("Not supported")
            }
          });
        }}
      >
        {urls.OUR_URL + "/" + key}
      </Text>

      <TouchableOpacity onPress={onShare} style={styles.button}>
        <Text style={styles.text}>Share the lidl one</Text>
      </TouchableOpacity>
    </View>
  );
}

const inStyles = StyleSheet.create({});
