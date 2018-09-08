import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Weather from "./components/Weather";
import { LinearGradient } from "expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const API_KEY = "b4a1600824cfc14f914f7e6b81592824";

export default class App extends Component {
  state = {
    isLoaded: false,
    error: null,
    temperature: null,
    name: null,
    city: null,
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this._getWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: error
        });
      }
    );
  }
  _getWeather = (lat, long) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${API_KEY}`
    )
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          temperature: json.main.temp,
          name: json.weather[0].main,
          city: json.name,
          isLoaded: true,
        })
      });
  };
  render() {
    const { isLoaded, error, temperature, name, city} = this.state;
    
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        {isLoaded ? (
          <Weather weatherName={name} temp={Math.ceil(temperature - 273.15)} cityname={city} />
        ) : (
          <LinearGradient
            colors={["#FD746C", "#2C3E50"]}
            style={styles.loading}
          >
            <View style={styles.loading}>
              <Text style={styles.loadingText}>
                Getting current location...
              </Text>
              {error ? (
                <View>
                  <MaterialCommunityIcons
                    color="red"
                    size={144}
                    name="account-alert"
                  />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}
            </View>
          </LinearGradient>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    
    // Default value of flexDirection is 'column'
  },
  errorText: {
    color: "red",
    backgroundColor: "transparent",
    fontSize: 25,
    fontWeight: "800"
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20
  },
  loadingText: {
    fontSize: 25,
    paddingBottom: 70,
    color: "white",
    fontWeight: "700"
  }
});
