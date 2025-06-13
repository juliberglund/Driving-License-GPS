import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Keyboard,
  Button,
} from "react-native";
import MapView, { Polyline, Text, TouchableOpacity } from "react-native-maps";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import PanelButtons from "./panelComponents/PanelButtons";
import LocationInput from "./panelComponents/LocationInput";
import polyline from "@mapbox/polyline"; // Installera om du inte har det
import { GOOGLE_MAPS_API_KEY } from "@env";

export default function GoogleMaps() {
  const mapRef = useRef(null);
  const watchRef = useRef(null);
  const locationInputRef = useRef(null);

  const [is3D, setIs3D] = useState(true);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

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
  // const onPlaceSelect = ({ latitude, longitude }) => {
  //   setIsFollowingUser(false);
  //   setIs3D(true);
  //   animateToPosition(latitude, longitude, 0);
  //   // Töm inputfältet via clear()
  //   locationInputRef.current?.clear();
  //   // Dölj tangentbordet
  //   Keyboard.dismiss();
  // };
  const onPlaceSelect = ({ latitude, longitude }) => {
    setIsFollowingUser(false);
    setIs3D(true);
    animateToPosition(latitude, longitude, 0);
    setDestination({ latitude, longitude });
    locationInputRef.current?.clear();
    Keyboard.dismiss();

    if (currentLocation) {
      fetchRoute(currentLocation, { latitude, longitude });
    }
  };

  // Funktion som hämtar rutt
  const fetchRoute = async (origin, dest) => {
    const originStr = `${origin.latitude},${origin.longitude}`;
    const destStr = `${dest.latitude},${dest.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destStr}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.routes.length) {
      const points = data.routes[0].overview_polyline.points;
      const coords = polyline.decode(points).map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));
      setRouteCoords(coords);
    } else {
      console.warn("Ingen rutt hittades.");
    }
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
          locationInputRef.current?.clear();
          setIsFollowingUser(false);
        }}
        onPanDrag={() => {
          setIsFollowingUser(false);
          Keyboard.dismiss();
          locationInputRef.current?.clear();
        }}
      >
        {/* 👇 Lägg till din Polyline här inne 👇 */}
        {routeCoords.length > 0 && (
          <Polyline
            coordinates={routeCoords}
            strokeWidth={5}
            strokeColor="#007AFF"
          />
        )}
      </MapView>

      {/* 7B. Sökfältet ovanpå kartan */}
      <LocationInput
        ref={locationInputRef}
        currentLocation={currentLocation}
        onPlaceSelect={onPlaceSelect}
      />
      {routeCoords.length > 0 && (
        <View style={{ position: "absolute", bottom: 40, alignSelf: "center" }}>
          <Button
            title="Starta navigering"
            onPress={() => {
              // Här kan du lägga till taligenkänning, instruktioner etc.
              alert("Navigering påbörjad 🚗");
            }}
          />
        </View>
      )}

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
