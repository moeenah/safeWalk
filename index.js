import React, { Component } from "react";
import { AppRegistry, View, Vibration } from "react-native";
import PedMap from "./app/components/PedMap";
import Main from "./app/components/Main";
import Settings from "./app/components/Settings.js";
import Coords from "./sample";
var Sound = require("react-native-sound");

Sound.setCategory("Playback", true);

var alarm = new Sound("alert.mp3", Sound.MAIN_BUNDLE, error => {
  if (error) {
    alert("failed to load the sound", error);
    return;
  }
  // loaded successfully
  console.log(
    "duration in seconds: " +
      alarm.getDuration() +
      "number of channels: " +
      alarm.getNumberOfChannels()
  );
});

function Deg2Rad(deg) {
  return (deg * Math.PI) / 180;
}

function getDistance(latitude1, longitude1, latitude2, longitude2) {
  let lat1 = Deg2Rad(latitude1);
  let lat2 = Deg2Rad(latitude2);
  let lon1 = Deg2Rad(longitude1);
  let lon2 = Deg2Rad(longitude2);
  let latDiff = lat2 - lat1;
  let lonDiff = lon2 - lon1;
  var R = 6371000; // metres
  var phi1 = lat1;
  var phi2 = lat2;
  var ChangeInphi = latDiff;
  var ChangeInlambda = lonDiff;
  var a =
    Math.sin(ChangeInphi / 2) * Math.sin(ChangeInphi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(ChangeInlambda / 2) *
      Math.sin(ChangeInlambda / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  var dist =
    Math.acos(
      Math.sin(phi1) * Math.sin(phi2) +
        Math.cos(phi1) * Math.cos(phi2) * Math.cos(ChangeInlambda)
    ) * R;
  return dist;
}

export default class Safewalk extends Component<props> {
  constructor() {
    super();
    this.changePage = this.changePage.bind(this);
    this.changeSettings = this.changeSettings.bind(this);
    this.changeUserMode = this.changeUserMode.bind(this);
    this.changeTimeInt = this.changeTimeInt.bind(this);
    this.test = this.test.bind(this);
    this.state = {
      lat: 51.05321,
      long: -114.09524,
      page: 0,
      savedCoords: 0,
      vibrate: false,
      sound: false,
      distance: 0, //in metres
      time: 0,
      speed: 0,
      distInt: 30, //in metres
      timeInt: 300, //(seconds)
      //audioAlert: null, //audio file name
      userMode: 1 //1=pedestrian mode, 2=vehicle mode
    };
  }

  test(userlat, userlong) {
    seenCoords = this.state.savedCoords;
    Coords.forEach(location => {
      let distance = getDistance(
        userlat,
        userlong,
        location.latitude,
        location.longitude
      );
      const newCoords = location.latitude + "," + location.longitude;
      let currentTime = Date.now();
      if (location.time && currentTime - location.time > (this.state.timeInt * 1000)) {
        location.bool = false;
      }
      if (
        distance < this.state.distInt &&
        newCoords !== this.state.savedCoords &&
        location.bool !== true
      ) {
        if (this.state.sound === true) {
          alarm.play();
        }
        if (this.state.vibrate === true) {
          // alert("VIBRATE LIKE CRAZY");
          Vibration.vibrate([100, 300, 200, 300]);
        }
        location.bool = true;
        location.time = Date.now();
        this.setState({ savedCoords: newCoords });
      }
    });
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
    else if (this.state.page === 0) {
      return (
        <Main
          speed={this.state.speed}
          distInt={this.state.distInt}
          lat={this.state.lat}
          long={this.state.long}
          page={this.state.page}
          vibrate={this.state.vibrate}
          sound={this.state.sound}
          changeSettings={this.changeSettings}
          changePage={this.changePage}
        />
      );
    }
    else if (this.state.page === 2) {
      return (
        <Settings
          timeInt={this.state.timeInt}
          //audioAlert={this.state.audioAlert}
          userMode={this.state.userMode}
          changePage={this.changePage}
          changeUserMode={this.changeUserMode}
          changeTimeInt={this.changeTimeInt}
        />
      );
    }
  }

  changeUserMode() {
    if (this.state.userMode === 1) {
      //use pedestrian data
      this.setState({ userMode: 2 })
      console.log('now using vehicle data')
    }
    if (this.state.userMode === 2) {
      //use vehicle data
      this.setState({ userMode: 1 })
      console.log('now using pedestrian data')
    }
  }

  changeTimeInt() {
    if (this.state.timeInt === 300) {
      this.setState({ timeInt: 1800 })
    }
    if (this.state.timeInt === 1800) {
      this.setState({ timeInt: 3600 })
    }
    if (this.state.timeInt === 3600) {
      this.setState({ timeInt: 10800 })
    }
    if (this.state.timeInt === 10800) {
      this.setState({ timeInt: 43200 })
    }
    if (this.state.timeInt === 43200) {
      this.setState({ timeInt: 86400 })
    }
    if (this.state.timeInt === 86400) {
      this.setState({ timeInt: 300 })
    }
  }

  changeSettings() {
    let setting = 0;
    if (this.state.sound === true && this.state.vibrate === true) {
      // setting = 1;
      this.setState({ sound: false, vibrate: true, distance: 5 });
    }
    if (this.state.sound === false && this.state.vibrate === true) {
      // setting = 2;
      this.setState({ sound: true, vibrate: false, distance: 5 });
    }
    if (this.state.sound === true && this.state.vibrate === false) {
      // setting = 3;
      this.setState({ sound: false, vibrate: false, distance: 99999999 });
    }
    if (this.state.sound === false && this.state.vibrate === false) {
      // setting = 4;
      this.setState({ sound: true, vibrate: true, distance: 5 });
    }
  }

  changePage(newpage) {
    this.setState({ page: newpage });
  }

  getSpeed(currentLat, currentLong, newDate) {
    const distDif = getDistance(
      this.state.lat,
      this.state.long,
      currentLat,
      currentLong
    );
    const timeDif = (newDate - this.state.time) / 1000;
    return Math.round((distDif / timeDif) * 3.6 * 100) / 100;
  }

  changeInt() {
    let speed = this.state.speed;
    let result = 30;

    if (speed < 0.5) {
      result = 15;
    }

    if (speed >= 0.5 && speed < 5) {
      result = 35;
    }

    if (speed >= 5 && speed < 25) {
      result = 50;
    }
    if (speed >= 25 && speed < 50) {
      result = 120;
    }
    if (speed >= 50 && speed < 150) {
      result = Math.round(speed * 2.5);
    }
    if (speed > 150) {
      result = 400
    }

    return result;
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          speed: this.getSpeed(
            position.coords.latitude,
            position.coords.longitude,
            Date.now()
          ),
          lat: position.coords.latitude,
          long: position.coords.longitude,
          time: Date.now(),
          distInt: this.changeInt(),
          error: null
        });
        console.log('watchPosition is on')
        this.test(position.coords.latitude, position.coords.longitude);
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: this.state.distance
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