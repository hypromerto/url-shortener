import React, { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { StatusBar } from "react-native";
import { Button } from "react-native";
import { Text, View, ScrollView } from "react-native";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { styles } from "../shared/Styles";

export default function AnalyticsScreen({ navigation }) {
  const [dimension, setDimension] = useState(false);
  Dimensions.addEventListener("change", () => {
    setDimension(!dimension);
  });
  const chartWidth = navigation.getParam("line").labels.length < 3 ? 1.5 : (navigation.getParam("line").labels.length / 3);
  return (
    <View style={styles.internalBackground}>
      {navigation.getParam("line").labels.length != 0 ? (
        <Text style={styles.analyticsTitle}>Clicks per link</Text>
      ) : (
        <Text>No analytics yet.</Text>
      )}
      {navigation.getParam("line").labels.length != 0 && (
        <ScrollView horizontal={true}>
          <LineChart
            data={navigation.getParam("line")}
            width={chartWidth * Dimensions.get("window").width + 100} // from react-native
            height={Dimensions.get("window").height - 150}
            verticalLabelRotation={10}
            fromZero={true}
            chartConfig={{
              backgroundColor: "#4b84ac",
              backgroundGradientFrom: "#4b84ac",
              backgroundGradientTo: "#6794b5",
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            propsForLabels={{ height: 300, width: 300, overflow: "visible" }}
            propsForVerticalLabels={{ height: 300, width: 300 }}
            propsForHorizontalLabels={{ height: 300, width: 300 }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </ScrollView>
      )}
    </View>
  );
}
