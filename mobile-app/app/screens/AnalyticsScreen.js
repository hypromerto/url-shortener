import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { Button } from "react-native";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { styles } from "../shared/Styles";

export default function AnalyticsScreen({ route, navigation }) {
  const [analyticsData, setAnalyticsData] = useState({});
  const [creationDates, setCreationDates] = useState([]);
  const [numberOfClicks, setNumberOfClicks] = useState([]);
  // const name = navigation.getParam("name");

  var QUERY = {
    username: "",
    token:
      "",
  };

  console.log("will fetch");
  let jsonData;
  fetch(IPAddress, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(QUERY),
  })
    .then((response) => response.json())
    .then((data) => {
        jsonData = data;
    })
    .catch((error) => {
      console.error(error);
    });

  var dates = [];
  var clicks = [];
  jsonData.forEach((entry) => {
    dates.push(entry["dateOfCreate"]);
    clicks.push(parseInt(entry["numberOfClicks"]));
  });

  const line = {
    labels: dates,
    datasets: [
      {
        data: clicks,
        strokeWidth: 2, // optional
      },
    ],
  };

  return (
    <View style={styles.internalBackground}>
      <LineChart
        data={line}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel={"$"}
        chartConfig={{
          backgroundColor: "#4b84ac",
          backgroundGradientFrom: "#4b84ac",
          backgroundGradientTo: "#6794b5",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <BarChart
        // style={graphStyle}
        data={line}
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel={"$"}
        chartConfig={{
          backgroundColor: "#4b84ac",
          backgroundGradientFrom: "#4b84ac",
          backgroundGradientTo: "#6794b5",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
