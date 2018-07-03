const myModule = require("./sample");

const coords = myModule.Coords;

const fs = require("fs");

const decide = amount => {
  if (amount === 2) {
    return "styles.low";
  }
  if (amount > 2 && amount <= 4) {
    return "styles.mid";
  }
  if (amount === 5) {
    return "styles.high";
  }
  if (amount >= 6) {
    return "styles.dangerous";
  }
};

const print = () => {
  const result = coords.map(
    marker =>
      `<MapView.Marker
      key={${marker.key}}
      coordinate={{
        latitude: ${Number(marker.latitude)},
        longitude: ${Number(marker.longitude)}
      }}>
      <View style={styles.radius}>
        <View style={${decide(marker.amount)}}/>
      </View>
    </MapView.Marker>
    `
  );
  return result.join("");
};

fs.writeFile("./whatev.json", print(), err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File has been created");
});
