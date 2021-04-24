import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Switch
} from "react-native";
import { Icon } from "react-native-elements";
import Clipboard from "expo-clipboard";
import { styles } from "../shared/Styles";
import { urls } from "../shared/Urls";
import axios from "react-native-axios";
import Toast from "react-native-toast-message";
import { useUserContext } from "../shared/UserContext";

export default function Dashboard({ navigation }) {
  const [customURL, setcustomURL] = useState("");
  const [isSelected, setSelection] = useState(false);
  const [originalURL, setOriginalURL] = useState("");

  const { accessToken } = useUserContext();
  const URL =
    navigation.getParam("accountType") === "admin"
      ? urls.ADMIN_ANALYTICS_URL
      : urls.ANALYTICS_URL;
  const QUERY =
    navigation.getParam("accountType") === "admin"
      ? {
          admin_key: accessToken,
        }
      : {
          token: accessToken,
        };

  useEffect(() => {
    if (navigation.getParam("accountType") === "admin") {
      toAnalytics();
    }
    Toast.show({
      type: "success",
      text1: navigation.getParam("message"),
      autoHide: true,
    });
  }, []);

  const toPostGen = () => {
    var QUERY = {
      token: accessToken,
      originalURL: originalURL
    };
    if (isSelected && customURL.length !== 8) {
      Toast.show({
        type: "error",
        text1: "Custom URL length must be 8 characters",
        autoHide: true
      })
    } 
    else {
      fetch(urls.SHORTEN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(QUERY),
      })
        .then((response) => response.json())
        .then((data) => {
          navigation.navigate("PostGen", { data: data["key"] });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const paste = async () => {
    const text = await Clipboard.getStringAsync();
    setOriginalURL(text);
  };

  const toAnalytics = () => {
    var dates = [];
    var clicks = [];
    var keys = [];

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(URL, JSON.stringify(QUERY), axiosConfig)
      .then((res) => {
        res.data.forEach((entry) => {
          console.log(entry);
          clicks.push(entry["numberOfClicks"]);
          dates.push(entry["dateOfCreate"]);
          keys.push(entry["link"]);
        });
      })
      .then(() => {
        const line = {
          labels: keys,
          datasets: [
            {
              data: clicks,
              strokeWidth: 2, // optional
            },
          ],
        };
        navigation.navigate("Analytics", { line: line });
      })
      .catch((e) => {
        console.error(e);
      });
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
        <Switch
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
    width: "80%",
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
