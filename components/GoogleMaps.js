import { StyleSheet, View, Dimensions } from "react-native";
import MapView from "react-native-maps";

export default function GoogleMaps() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider="google"
        initialRegion={{
          latitude: 59.3293, //stockholm
          longitude: 18.0686,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
