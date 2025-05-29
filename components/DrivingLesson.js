import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);
  const placesRef = useRef();

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

  const onPlacePress = async (data) => {
    try {
      // Hämta detaljer själv via place_id
      const placeId = data.place_id;
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
      );
      const json = await response.json();

      if (json.status === "OK") {
        const location = json.result.geometry.location;
        const newRegion = {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
      } else {
        alert("Kunde inte hämta platsdetaljer.");
      }
    } catch (error) {
      alert("Fel vid hämtning av platsdetaljer: " + error.message);
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
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="Du är här" />
          )}
          {region && <Marker coordinate={region} pinColor="blue" />}
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
