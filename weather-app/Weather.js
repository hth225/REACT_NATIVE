import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo";
import { Ionicons } from "@expo/vector-icons";

class Weather extends Component {
  render() {
    return (
      <LinearGradient colors={["#00C6FB", "#005BEA"]} style={styles.container}>
        <View style={styles.upper}>
          <Ionicons color="white" size={144} name="ios-rainy-outline"/>
          <Text style={styles.temp}>35˚</Text>
        </View>
        <View style={styles.lower}>
          <Text style={styles.title}>Bring Your Umbrella</Text>
          <Text style={styles.subtitle}>For more info, Look outside</Text>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  temp: {
    fontSize: 50,
    backgroundColor: "transparent",
    color: "white",
    marginTop: 10,
  },
  lower: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 25,
    
  },
  title: {
    fontSize: 38,
    backgroundColor: "transparent",
    color: "white",
    marginBottom: 10,
    fontWeight: "600"
  },
  subtitle: {
    fontSize: 25,
    backgroundColor: "transparent",
    color: "white",
    
  }
});
export default Weather;
