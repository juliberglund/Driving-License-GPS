import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { GOOGLE_MAPS_API_KEY } from "@env";

const LocationInput = forwardRef(({ onPlaceSelect }, ref) => {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Hämta användarens position (för att kunna ge närliggande förslag)
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
    const timeout = setTimeout(() => {
      if (query.length > 0) {
        searchPlaces(query);
      } else {
        setPredictions([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query, userLocation]);

  // Expose clear via ref
  useImperativeHandle(ref, () => ({
    clear: () => {
      setQuery("");
      setPredictions([]);
    },
  }));

  async function searchPlaces(input) {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        input,
        key: GOOGLE_MAPS_API_KEY,
        language: "sv",
        components: "country:se",
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
    setQuery("");
    setPredictions([]);

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
      const selectedLocation = { latitude: lat, longitude: lng };

      // Skicka korrekt format till parent
      onPlaceSelect({
        latitude: lat,
        longitude: lng,
        address: item.description,
      });

      // För UI (ruttläge m.m.)
      setIsRouteMode(true);
      setDestinationLocation(selectedLocation);
      setDestinationText(item.description);
      if (currentLocation) {
        setStartLocation(currentLocation);
        setStartText("Din plats");
      }
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
        onBlur={() => setPredictions([])}
      />
      <FlatList
        data={predictions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    width: "90%",
    alignSelf: "center",
    zIndex: 999,
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    fontSize: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  list: {
    backgroundColor: "#fff",
    marginTop: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 200,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  main: {
    fontSize: 16,
    color: "#333",
  },
  secondary: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});

export default LocationInput;
