import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import MapView from "react-native-maps";
import Coords from "../../sample";

export default class PedMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      lat: 51.0486,
      long: -114.0708
    };
  }

  _onPressButton() {
    this.props.changePage(0);
    console.log(this.props.page);
  }

  static defaultProps = {
    message: "Hi there"
  };

  render() {
    return (
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.long,
            latitudeDelta: 0.0222,
            longitudeDelta: 0.0121
          }}
          customMapStyle={mapStyle}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.state.lat,
              longitude: this.state.long
            }}
          >
            <View style={styles.myloc} />
          </MapView.Marker>
          {Coords.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={{
                latitude: Number(marker.latitude),
                longitude: Number(marker.longitude)
              }}
            >
              <View style={styles.radius}>
                <View style={decide(marker.amount)} />
              </View>
            </MapView.Marker>
          ))}
        </MapView>
        <TouchableHighlight
          onPress={this._onPressButton.bind(this)}
          underlayColor="white"
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Home</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
const decide = amount => {
  if (amount === 2) {
    return styles.low;
  }
  if (amount > 2 && amount <= 4) {
    return styles.mid;
  }
  if (amount === 5) {
    return styles.high;
  }
  if (amount >= 6) {
    return styles.dangerous;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    borderRadius: 10,
    margin: 20
  },
  buttonText: {
    padding: 20,
    color: "white",
    fontSize: 30
  },
  myloc: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(16, 187, 240, 0.3)",
    borderWidth: 2,
    borderColor: "rgba(16, 187, 240, 0.7)",
    alignItems: "center",
    justifyContent: "center"
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255, 217, 0, 0.1)",
    borderWidth: 8,
    borderColor: "rgba(255, 217, 0, 0.05)",
    alignItems: "center",
    justifyContent: "center"
  },
  low: {
    height: 15,
    width: 15,
    borderRadius: 15 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255, 136, 0, 0.3)",
    borderWidth: 4,
    borderColor: "rgba(255, 136, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center"
  },
  mid: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255, 136, 0, 0.3)",
    borderWidth: 8,
    borderColor: "rgba(255, 136, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center"
  },
  high: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255, 38, 0, 0.4)",
    borderWidth: 7,
    borderColor: "rgba(255, 38, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center"
  },
  dangerous: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    borderWidth: 4,
    borderColor: "rgba(255, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center"
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute"
  }
});

const mapStyle = [
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];

AppRegistry.registerComponent("PedMap", () => PedMap);
