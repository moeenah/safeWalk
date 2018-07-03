import React, { Component, DeviceEventEmitter } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import MapView from "react-native-maps";
import Marker from "./Marker";

export default class PedMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
      lat: 51.05321,
      long: -114.09524
    };
  }

  _onPressButton() {
    this.props.changePage(0);
    console.log(this.props.page);
  }

  static defaultProps = {
    message: "Hi there"
  };

  componentDidMount(){
    
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.long,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0121
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
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
          <Marker/>

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
    width:'60%'
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
    backgroundColor: "rgba(16, 187, 240, 0.3)",
    borderWidth: 2,
    borderColor: "rgba(16, 187, 240, 0.7)",
    alignItems: "center",
    justifyContent: "center"
  }
});

AppRegistry.registerComponent("PedMap", () => PedMap);
