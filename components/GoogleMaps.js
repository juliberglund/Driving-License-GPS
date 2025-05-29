import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import PanelButtons from "./panelComponents/PanelButtons";

export default function GoogleMaps() {
  const mapRef = useRef(null);
  const watchRef = useRef(null);

  const [is3D, setIs3D] = useState(true);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Åtkomst till plats nekad");
        return;
      }

      if (watchRef.current) {
        watchRef.current.remove();
        watchRef.current = null;
      }

      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          const { latitude, longitude, heading } = location.coords;
          setCurrentLocation({ latitude, longitude, heading });

          if (isFollowingUser && mapRef.current) {
            animateToPosition(latitude, longitude, heading);
          }
        }
      );
    })();

    return () => {
      if (watchRef.current) {
        watchRef.current.remove();
        watchRef.current = null;
      }
    };
  }, [is3D, isFollowingUser]);

  const animateToPosition = (latitude, longitude, heading = 0) => {
    if (!mapRef.current) return;

    const cameraConfig = is3D
      ? {
          center: { latitude, longitude },
          pitch: 85,
          heading,
          altitude: 5,
          zoom: 19.5,
        }
      : {
          center: { latitude, longitude },
          pitch: 0,
          heading: 0,
          altitude: 1000,
          zoom: 16,
        };

    mapRef.current.animateCamera(cameraConfig, { duration: 1000 });
  };

  const toggleView = () => {
    setIs3D((prev) => {
      const newIs3D = !prev;

      if (currentLocation) {
        setIsFollowingUser(true);
        animateToPosition(
          currentLocation.latitude,
          currentLocation.longitude,
          currentLocation.heading
        );
      }

      return newIs3D;
    });
  };

  const resetCamera = () => {
    if (currentLocation) {
      setIsFollowingUser(true);
      animateToPosition(
        currentLocation.latitude,
        currentLocation.longitude,
        currentLocation.heading
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        showsTraffic={false}
        showsBuildings={true}
        followsUserLocation={false}
        initialRegion={{
          latitude: 59.3293,
          longitude: 18.0686,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onPanDrag={() => setIsFollowingUser(false)}
        onRegionChange={() => setIsFollowingUser(false)}
      />

      <PanelButtons
        is3D={is3D}
        onToggleView={toggleView}
        onResetCamera={resetCamera}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
