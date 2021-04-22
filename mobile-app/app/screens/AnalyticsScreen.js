import React, {useState, useEffect} from "react";
import {
    Text,
    View,
    ImageBackground,
    StyleSheet,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native";
import { styles } from "../shared/Styles";

export default function AnalyticsScreen({navigation}){
    const [analyticsData, setAnalyticsData] = useState({})

    useEffect(() => {
        // Fetch Analytics Data
        // setAnalyticsData(response)
    })

    return(
        <View style={styles.internalBackground}>
            <Text>{analyticsData}</Text>
        </View>
    )
}