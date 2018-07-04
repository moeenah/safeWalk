import React, { Component } from "react";
import { AppRegistry, View } from "react-native";
import PedMap from "./app/components/PedMap";
import Main from "./app/components/Main";

export default class Safewalk extends Component<Props> {
  constructor() {
    super();
    this.changePage = this.changePage.bind(this);
    this.state = {
      lat: 51.05321,
      long: -114.09524,
      page: 0
    };
  }

  currentPage() {
    if (this.state.page === 1) {
      return (
        <PedMap
          lat={this.state.lat}
          long={this.state.long}
          page={this.state.page}
          changePage={this.changePage}
        />
      );
    }
    return (
      <Main
        lat={this.state.lat}
        long={this.state.long}
        page={this.state.page}
        changePage={this.changePage}
      />
    );
  }

  changePage(newpage) {
    this.setState({ page: newpage });
  }

  changeLat(num) {
    this.setState({ lat: num });
  }

  changeLong(num) {
    this.setState({ long: num });
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return <View>{this.currentPage()}</View>;
  }
}

AppRegistry.registerComponent("Safewalk", () => Safewalk);
