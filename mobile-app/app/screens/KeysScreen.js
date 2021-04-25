import React, { useState } from "react";
import { Dimensions } from "react-native";
import { Text, View, FlatList, StyleSheet } from "react-native";

import { styles } from "../shared/Styles";

export default function KeysScreen({ navigation }) {
  const [dimension, setDimension] = useState(false);
  Dimensions.addEventListener("change", () => {
    setDimension(!dimension);
  });
  return (
    <View style={styles.internalBackground}>
      <Text style={styles.analyticsTitle}>Generated Keys</Text>
      <View style={keyStyles.container}>
        <FlatList
          data={navigation.getParam("data")}
          renderItem={(pair) => (
            // <View style={{flexDirection:'row',flexWrap: 'wrap'}}>
            //   <Text style={keyStyles.item}>
            //     {pair.item.link} - {pair.item.key}
            //   </Text>
            // </View>
            <View style={keyStyles.itemContainer}>
              <Text style={keyStyles.item}>URL:{"\n\t\t"}{pair.item.link}{"\n"}Key:{"\n\t\t"}{pair.item.key}</Text>
            </View>
          )}
        />
      </View>
      {/* {navigation.getParam("data").map( (pair) => {
          return(
            <Text key={pair.key}>{pair.link} - {pair.key}</Text>
          )
        })} */}
    </View>
  );
}

const keyStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingLeft: 20,
    alignSelf: "flex-start",
  },
  itemContainer: {
    flexDirection:'row',
    flexWrap: 'wrap',
    padding: 15,
    backgroundColor: "#4b84ac",
    marginBottom: 10,
    width: "100%",
    borderRadius: 10,
  },
  item: {
    fontSize: 18,
    color: "white"
  },
});
