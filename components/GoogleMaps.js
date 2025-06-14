import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Platform,
  Keyboard,
  Button,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView, { Polyline } from "react-native-maps";
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
  const [transportMode, setTransportMode] = useState("driving");
  const [routeInfo, setRouteInfo] = useState(null);
  const [showStartButton, setShowStartButton] = useState(false);
  const [showTransportOptions, setShowTransportOptions] = useState(false);

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
      fetchRoute(currentLocation, { latitude, longitude }, transportMode);
    }
    setShowStartButton(true);
    setShowTransportOptions(false); // för säkerhets skull
  };

  // Funktion som hämtar rutt
  const fetchRoute = async (origin, dest, mode = "driving") => {
    const originStr = `${origin.latitude},${origin.longitude}`;
    const destStr = `${dest.latitude},${dest.longitude}`;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destStr}&mode=${mode}&key=${GOOGLE_MAPS_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.routes.length) {
      const points = data.routes[0].overview_polyline.points;
      const coords = polyline.decode(points).map(([lat, lng]) => ({
        latitude: lat,
        longitude: lng,
      }));
      setRouteCoords(coords);

      // 👇 Lägg till distans och tid
      const leg = data.routes[0].legs[0];
      setRouteInfo({
        duration: leg.duration.text,
        distance: leg.distance.text,
      });
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
        {routeInfo && (
          <View
            style={{
              position: "absolute",
              bottom: 110,
              alignSelf: "center",
              backgroundColor: "white",
              padding: 8,
              borderRadius: 8,
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 16 }}>
              {routeInfo.duration} – {routeInfo.distance}
            </Text>
          </View>
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
      {showStartButton && !showTransportOptions && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            setShowTransportOptions(true);
            setShowStartButton(false);
          }}
        >
          <Text style={styles.startButtonText}>Starta navigering</Text>
        </TouchableOpacity>
      )}

      <View
        style={{
          position: "absolute",
          bottom: 160,
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        {["driving", "walking", "bicycling"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={{
              backgroundColor: transportMode === mode ? "#007AFF" : "#eee",
              padding: 10,
              borderRadius: 8,
              marginHorizontal: 5,
            }}
            onPress={() => {
              setTransportMode(mode);
              if (currentLocation && destination) {
                fetchRoute(currentLocation, destination, mode);
              }
            }}
          >
            <Text style={{ color: transportMode === mode ? "white" : "black" }}>
              {mode === "driving" ? "🚗" : mode === "walking" ? "🚶‍♂️" : "🚴‍♀️"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
  startButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 10,
  },
  startButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  transportOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modeButton: {
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 8,
  },
});
