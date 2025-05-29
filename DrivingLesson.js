import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  Text,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import GetLocation from "react-native-get-location";

export default function MapScreen() {
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const mapRef = useRef(null);
  const placesRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Platsbehörighet nekad");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.warn("Fel vid hämtning av plats:", error);
    }
  };

  const onPlacePress = async (data) => {
    try {
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

  if (!permissionGranted) {
    return (
      <View style={styles.centered}>
        <Text>Godkänn platsåtkomst för att fortsätta...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {userLocation && (
            <Marker coordinate={userLocation} title="Du är här" />
          )}
          <Marker coordinate={region} pinColor="blue" />
        </MapView>
      )}

      <GooglePlacesAutocomplete
        ref={placesRef}
        placeholder="Sök plats..."
        fetchDetails={true}
        onPress={onPlacePress}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "sv",
        }}
        styles={{
          container: styles.autocompleteContainer,
          textInput: styles.input,
        }}
        enablePoweredByContainer={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
