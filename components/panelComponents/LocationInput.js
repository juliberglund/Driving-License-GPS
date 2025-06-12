// components/panelComponents/PlacesAutocompleteInput.js

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { GOOGLE_MAPS_API_KEY } from "@env";

export default function LocationInput({ onPlaceSelect }) {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Hämta användarens position vid mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setUserLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  // Debounce & sök
  useEffect(() => {
    const handle = setTimeout(() => {
      if (query.length > 0) searchPlaces(query);
      else setPredictions([]);
    }, 200);
    return () => clearTimeout(handle);
  }, [query, userLocation]);

  async function searchPlaces(input) {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        input,
        key: GOOGLE_MAPS_API_KEY,
        language: "sv",
        components: "country:se",
        types: "geocode|establishment",
      });
      if (userLocation) {
        params.append(
          "location",
          `${userLocation.latitude},${userLocation.longitude}`
        );
        params.append("radius", "50000");
      }
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`
      );
      const data = await res.json();
      if (data.status === "OK") {
        setPredictions(
          data.predictions.map((p) => ({
            id: p.place_id,
            description: p.description,
            mainText: p.structured_formatting.main_text,
            secondaryText: p.structured_formatting.secondary_text,
          }))
        );
      } else {
        setPredictions([]);
      }
    } catch (e) {
      console.error(e);
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSelect(item) {
    setQuery(item.description);
    setPredictions([]);
    // Hämta detaljerad plats
    const params = new URLSearchParams({
      place_id: item.id,
      key: GOOGLE_MAPS_API_KEY,
      fields: "geometry",
      language: "sv",
    });
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params}`
    );
    const data = await res.json();
    if (data.status === "OK") {
      const { lat, lng } = data.result.geometry.location;
      onPlaceSelect({ latitude: lat, longitude: lng });
    } else {
      Alert.alert("Kunde inte hämta platsdetaljer");
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
      <Text style={styles.main}>{item.mainText}</Text>
      {item.secondaryText ? (
        <Text style={styles.secondary}>{item.secondaryText}</Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Sök adress eller plats..."
        value={query}
        onChangeText={setQuery}
        onBlur={() => setPredictions([])} // Dölj listan vid touch utanför
      />
      <FlatList
        data={predictions}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    width: "90%",
    alignSelf: "center", // Centera horisontellt
    zIndex: 999,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    width: "100%", // Full bredd inom wrapper
  },
  list: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderRadius: 8,
  },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
  main: { fontSize: 16 },
  secondary: { fontSize: 14, color: "#666" },
});
