import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Platform } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import "react-native-get-random-values";
import * as Linking from "expo-linking";
import { Button } from "react-native";
import * as Speech from "expo-speech";

export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const mapRef = useRef(null);
  const placesRef = useRef();
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Behörighet nekad");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setUserLocation({ latitude, longitude });
      setRegion(initialRegion);
      mapRef.current?.animateToRegion(initialRegion, 1000);
    })();
  }, []);

  const onPlacePress = async (data, details = null) => {
    try {
      const placeId = data.place_id;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const json = await response.json();

      if (json.status === "OK") {
        const destination = json.result.geometry.location;

        const newRegion = {
          latitude: destination.lat,
          longitude: destination.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);

        // 🧭 Hämta rutt!
        if (userLocation) {
          const routeData = await getRoute(userLocation, {
            latitude: destination.lat,
            longitude: destination.lng,
          });

          // Här kan du t.ex. lägga in ruttstegen på kartan sen!
          console.log("Ruttdata:", routeData);
        }
      } else {
        alert("Kunde inte hämta platsdetaljer.");
      }
    } catch (error) {
      alert("Fel vid hämtning av platsdetaljer: " + error.message);
    }
  };

  const getRoute = async (origin, destination) => {
    try {
      const originStr = `${origin.latitude},${origin.longitude}`;
      const destStr = `${destination.latitude},${destination.longitude}`;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originStr}&destination=${destStr}&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length) {
        const steps = data.routes[0].legs[0].steps;

        const directions = steps.map((step) => ({
          instruction: step.html_instructions,
          distance: step.distance.text,
          duration: step.duration.text,
        }));

        setDirections(directions);
        if (directions.length > 0) {
          const text = directions[0].instruction.replace(/<[^>]+>/g, ""); // Ta bort HTML
          Speech.speak(text);
        }

        const points = data.routes[0].overview_polyline.points;
        const coords = polyline.decode(points).map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));
        setRouteCoords(coords);
      } else {
        alert("Ingen rutt hittades.");
      }
    } catch (err) {
      console.error("Fel vid Directions API:", err);
    }
  };

  const openGoogleMapsNavigation = (origin, destination) => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&travelmode=driving`;
    Linking.openURL(url);
  };

  const handleMapPress = async (coordinate) => {
    const newRegion = {
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 1000);

    if (userLocation) {
      const routeData = await getRoute(userLocation, coordinate);
      console.log("Ruttdata (via klick):", routeData);
      setSelectedDestination(coordinate);
    }
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          provider="google"
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPress={(e) => handleMapPress(e.nativeEvent.coordinate)}
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="Du är här" />
          )}
          {region && <Marker coordinate={region} pinColor="blue" />}
          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeWidth={5}
              strokeColor="#007AFF"
            />
          )}
          {selectedDestination && (
            <Marker
              coordinate={selectedDestination}
              pinColor="blue"
              title="Vald plats"
            />
          )}
        </MapView>
      )}

      <GooglePlacesAutocomplete
        predefinedPlaces={[]}
        ref={placesRef}
        placeholder="Sök plats..."
        fetchDetails={true} // Viktigt: vi hämtar inte detaljer automatiskt
        onPress={(data) => onPlacePress(data)}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "sv",
          location: userLocation
            ? `${userLocation.latitude},${userLocation.longitude}`
            : undefined, // Lägg till användarens plats
          radius: 50000, // 50 km, justera om du vill
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.input,
        }}
        enablePoweredByContainer={false}
        textInputProps={{
          onFocus: () => {},
        }}
      />
      {userLocation && selectedDestination && (
        <View style={{ position: "absolute", bottom: 40, alignSelf: "center" }}>
          <Button
            title="Starta navigering"
            onPress={() => {
              directions.forEach((step, i) => {
                setTimeout(() => {
                  const cleaned = step.instruction.replace(/<[^>]+>/g, "");
                  Speech.speak(`Steg ${i + 1}: ${cleaned}`);
                }, i * 4000); // talar ett steg var 4:e sekund
              });
            }}
          />
        </View>
      )}

      {directions.length > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 20,
            backgroundColor: "white",
            padding: 10,
          }}
        >
          {directions.map((step, i) => (
            <Text style={{ marginBottom: 5 }}>
              ➤ {step.instruction.replace(/<[^>]+>/g, "")} ({step.distance})
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  autocompleteContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    width: "90%",
    alignSelf: "center",
    zIndex: 1,
  },
  input: {
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
  },
});
