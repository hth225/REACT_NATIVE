import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";

const weatherCases = {
  Rain: {
    colors: ["#283E51", "#4B79A1"],
    title: "Bring Your Umbrella",
    subtitle: "For more info, Look outside",
    icon: "weather-pouring"
  },
  Clear: {
    colors: ["#FDC830", "#F37335"],
    title: "Nice Weather",
    subtitle: "Well, might be little hot",
    icon: "weather-sunny"
  },
  Thunderstorm: {
    colors: ["#2c3e50", "#bdc3c7"],
    title: "Thunderstorm in your area",
    subtitle: "Don't be scared",
    icon: "weather-lightning"
  },
  Clouds: {
    colors: ["#4B79A1", "#283E51"],
    title: "Clouds",
    subtitle: "Just like a Great Britain",
    icon: "weather-cloudy"
  },
  Snow: {
    colors: ["#E6DADA", "#274046"],
    title: "Here comes Snowman!",
    subtitle: "With freezing cold",
    icon: "weather-snowy"
  },
  Drizzle: {
    colors: ["#4CA1AF", "#2C3E50"],
    title: "Drizzle",
    subtitle: "Looks like someone's tear",
    icon: "weather-rainy"
  },
  Haze: {
    colors: ["#3a6186", "#89253e"],
    title: "Haze",
    subtitle: "Looks like a oldschool horror movie",
    icon: "weather-fog"
  },
  Mist: {
    colors: ["#606c88", "#3f4c6b"],
    title: "Mist",
    subtitle: "Watch your steps",
    icon: "weather-fog"
  }
};

function Weather({ weatherName, temp }) {
  console.log(weatherName);
  return (
    <LinearGradient
      colors={weatherCases[weatherName].colors}
      style={styles.container}
    >
      <View style={styles.upper}>
        <MaterialCommunityIcons
          color="white"
          size={144}
          name={weatherCases[weatherName].icon}
        />
        <Text style={styles.temp}>{temp}˚</Text>
      </View>
      <View style={styles.lower}>
        <Text style={styles.title}>{weatherCases[weatherName].title}</Text>
        <Text style={styles.subtitle}>
          {weatherCases[weatherName].subtitle}
        </Text>
      </View>
    </LinearGradient>
  );
}

Weather.proptypes = {
  temp: PropTypes.number.isRequired,
  weatherName: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  temp: {
    fontSize: 50,
    backgroundColor: "transparent",
    color: "white",
    marginTop: 10
  },
  lower: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 25
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
    color: "white"
  }
});
export default Weather;
