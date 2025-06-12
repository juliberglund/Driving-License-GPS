import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Dimensions, Platform, Keyboard } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import PanelButtons from "./panelComponents/PanelButtons";
import LocationInput from "./panelComponents/LocationInput";
export default function GoogleMaps() {
  const mapRef = useRef(null);
  const watchRef = useRef(null);
  const locationInputRef = useRef(null);

  const [is3D, setIs3D] = useState(true);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

  // 1. Begär plats‐permission en gång när komponenten mountar
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("⛔ Åtkomst till plats nekad");
        return;
      }
    })();
  }, []);

  // 2. Starta live‐tracking när is3D eller isFollowingUser ändras
  useEffect(() => {
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("⛔ Åtkomst till plats nekad");
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

  // 3. Animera kartkameran (3D eller 2D)
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

  // 4. Växla mellan 3D‐ och 2D‐vy
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

  // 5. Återställ kameran till användarens position
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

  // 6. Callback när användaren väljer en plats i sökfältet
  const onPlaceSelect = ({ latitude, longitude }) => {
    setIsFollowingUser(false);
    setIs3D(true);
    animateToPosition(latitude, longitude, 0);
    // Töm inputfältet via clear()
    locationInputRef.current?.clear();
    // Dölj tangentbordet
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* 7A. MapView med onPress/onPanDrag som stänger ner input */}
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
        onPress={() => {
          Keyboard.dismiss();
          // Stäng ner autocomplete‐listan genom att tömma texten
          locationInputRef.current?.clear();
          setIsFollowingUser(false);
        }}
        onPanDrag={() => {
          setIsFollowingUser(false);
          Keyboard.dismiss();
          locationInputRef.current?.clear();
        }}
      />

      {/* 7B. Sökfältet ovanpå kartan */}
      <LocationInput
        ref={locationInputRef}
        currentLocation={currentLocation}
        onPlaceSelect={onPlaceSelect}
      />

      {/* 7C. PanelButtons längst ner */}
      {/* <PanelButtons
        is3D={is3D}
        onToggleView={toggleView}
        onResetCamera={resetCamera}
      /> */}
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
