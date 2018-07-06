import React, { Component, DeviceEventEmitter } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Coords from "../../sample";

export default class PedMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pixel: 1,
      page: this.props.page,
      error: null,
      lat: 51.0576,
      long: -114.095
    };
  }

  _onPressButton() {
    this.props.changePage(0);
  }

  static defaultProps = {
    message: "Hi there"
  };

  componentWillUnmount() {}

  componentDidMount() {
    setTimeout(() => this.setState({ pixel: 0 }), 500);
  }

  render() {
    const containerstyle = {
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white",
      paddingTop: this.state.pixel
    };

    return (
      <View style={containerstyle}>
        <MapView
          ref={node => {
            this.map = node;
          }}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: this.props.lat,
            longitude: this.props.long,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0041
          }}
          customMapStyle={mapStyle}
        >
          {Coords.map(marker => (
            <MapView.Marker
              key={marker.key}
              anchor={{
                x: 0.5,
                y: 0.5
              }}
              coordinate={{
                latitude: Number(marker.latitude),
                longitude: Number(marker.longitude)
              }}
              title={`Incidents:${marker.amount}`}
            >
              <View style={decide(marker.amount, marker.bool)} />
            </MapView.Marker>
          ))}
        </MapView>
        <View style={styles.btncontainer}>
          <TouchableHighlight
            onPress={this._onPressButton.bind(this)}
            underlayColor="white"
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>Go Back</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const decide = (amount, bool) => {
  if (bool === true) {
    return styles.off;
  }
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

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  map: {
    height: "100%",
    width: "100%"
  },
  btncontainer: {
    position: "absolute",
    bottom: 0,
    width: "60%"
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2196F3",
    borderRadius: 10,
    marginBottom: 15,
    zIndex: 1
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
    backgroundColor: "rgba(16, 187, 240, 0.7)",
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
  off: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(0, 255, 0, 0.5)",
    borderWidth: 5,
    borderColor: "rgba(0, 255, 0, 0.1)",
    alignItems: "center",
    justifyContent: "center"
  },
  low: {
    height: 16,
    width: 16,
    borderRadius: 16 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    borderWidth: 6,
    borderColor: "rgba(255, 0, 0, 0.05)",
    alignItems: "center",
    justifyContent: "center"
  },
  mid: {
    height: 21,
    width: 21,
    borderRadius: 21 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    borderWidth: 6,
    borderColor: "rgba(255, 0, 0, 0.05)",
    alignItems: "center",
    justifyContent: "center"
  },
  high: {
    height: 28,
    width: 28,
    borderRadius: 28 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255, 40, 0, 0.5)",
    borderWidth: 8,
    borderColor: "rgba(255, 0, 0, 0.05)",
    alignItems: "center",
    justifyContent: "center"
  },
  dangerous: {
    height: 33,
    width: 33,
    borderRadius: 33 / 2,
    overflow: "hidden",
    backgroundColor: "rgba(255, 0, 0, 0.5)",
    borderWidth: 8,
    borderColor: "rgba(255, 0, 0, 0.05)",
    alignItems: "center",
    justifyContent: "center"
  }
});

AppRegistry.registerComponent("PedMap", () => PedMap);