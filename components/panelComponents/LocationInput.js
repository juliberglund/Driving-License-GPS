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
  Alert,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { GOOGLE_MAPS_API_KEY } from "@env";

const LocationInput = forwardRef(({ currentLocation, onPlaceSelect }, ref) => {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Nytt state för att hantera rutt-läge
  const [isRouteMode, setIsRouteMode] = useState(false);
  const [startLocation, setStartLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [startText, setStartText] = useState("");
  const [destinationText, setDestinationText] = useState("");

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

  // Expose clear function via ref
  useImperativeHandle(ref, () => ({
    clear: () => {
      setQuery("");
      setPredictions([]);
      setIsRouteMode(false);
      setStartLocation(null);
      setDestinationLocation(null);
      setStartText("");
      setDestinationText("");
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
    setQuery("");
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
      const selectedLocation = { latitude: lat, longitude: lng };

      // Aktivera rutt-läge
      setIsRouteMode(true);
      setDestinationLocation(selectedLocation);
      setDestinationText(item.description);

      // Sätt start som nuvarande position
      if (currentLocation) {
        setStartLocation(currentLocation);
        setStartText("Din plats");
      }

      // Skicka rutt-info till parent
      if (currentLocation) {
        onPlaceSelect({
          start: currentLocation,
          destination: selectedLocation,
          startText: "Din plats",
          destinationText: item.description,
        });
      }
    } else {
      Alert.alert("Kunde inte hämta platsdetaljer");
    }
  }

  const exitRouteMode = () => {
    setIsRouteMode(false);
    setStartLocation(null);
    setDestinationLocation(null);
    setStartText("");
    setDestinationText("");
    setQuery("");
    setPredictions([]);

    // Meddela parent att rutt-läge avslutats
    onPlaceSelect(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
      <Text style={styles.main}>{item.mainText}</Text>
      {item.secondaryText ? (
        <Text style={styles.secondary}>{item.secondaryText}</Text>
      ) : null}
    </TouchableOpacity>
  );

  if (isRouteMode) {
    // Visa rutt-interface som i Google Maps MED IKONER - UTAN PIL
    return (
      <View style={styles.routeWrapper}>
        <View style={styles.routeInputs}>
          {/* Start punkt med live location ikon och kryss */}
          <View style={styles.routeInputRowWithIcon}>
            <Ionicons
              name="locate"
              size={14}
              color="#007AFF"
              style={styles.startIcon}
            />
            <Text style={styles.startLocationText}>{startText}</Text>
            <TouchableOpacity
              onPress={exitRouteMode}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Separator linje */}
          <View style={styles.separator} />

          {/* Destination med location ikon - INGEN PIL */}
          <View style={styles.routeInputRowWithIcon}>
            <Ionicons
              name="location-outline"
              size={14}
              color="#FF3B30"
              style={styles.destinationIcon}
            />
            <Text style={styles.routeInputText}>{destinationText}</Text>
          </View>
        </View>
      </View>
    );
  }

  // Vanlig sök-interface
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
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        style={styles.list}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  // Befintliga styles
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

  // Nya rutt-mode styles MED IKONER - UTAN PIL
  routeWrapper: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    width: "95%",
    alignSelf: "center",
    zIndex: 999,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  routeInputs: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    position: "relative",
  },
  routeInputRowWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: "relative",
  },
  // LIVE LOCATION IKON för start
  startIcon: {
    marginRight: 12,
  },
  // LOCATION IKON för destination
  destinationIcon: {
    marginRight: 12,
  },
  startLocationText: {
    fontSize: 15,
    color: "#007AFF",
    fontWeight: "500",
    flex: 1,
  },
  routeInputText: {
    fontSize: 15,
    color: "#333",
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginHorizontal: 12,
    marginTop: 2,
    marginBottom: 8,
  },
  closeButton: {
    padding: 6,
    marginLeft: 8,
  },
  closeButtonText: {
    fontSize: 15,
    color: "#666",
    fontWeight: "400",
  },
});

export default LocationInput;
