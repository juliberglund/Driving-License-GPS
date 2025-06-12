import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import { GOOGLE_MAPS_API_KEY } from "@env";

const TestPlaces = () => {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("Hämtar position...");

  // Hämta användarens position vid start
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Debounce funktion för sökning
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 1) {
        searchPlaces(query);
      } else {
        setPredictions([]);
      }
    }, 200); // Snabb respons som Google Maps

    return () => clearTimeout(timer);
  }, [query]);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationStatus("Platsåtkomst nekad");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setLocationStatus(""); // Tom sträng istället för "Position hämtad ✓"
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationStatus("Kunde inte hämta position");
    }
  };

  const searchPlaces = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      // Använd Places API Autocomplete - samma som Google Maps använder
      const params = new URLSearchParams({
        input: searchQuery,
        key: GOOGLE_MAPS_API_KEY,
        language: "sv",
        components: "country:se", // Fokusera på Sverige
        types: "geocode|establishment", // Både adresser och verksamheter
      });

      // Lägg till location bias för närliggande resultat
      if (userLocation) {
        params.append(
          "location",
          `${userLocation.latitude},${userLocation.longitude}`
        );
        params.append("radius", "50000"); // 50km radie
      }

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`
      );

      const data = await response.json();

      if (!response.ok || data.status !== "OK") {
        if (data.status === "ZERO_RESULTS") {
          setPredictions([]);
          return;
        }
        throw new Error(data.error_message || `API Error: ${data.status}`);
      }

      // Bearbeta predictions utan ikoner och kategorier
      const processedPredictions = data.predictions.map((prediction) => {
        return {
          id: prediction.place_id,
          description: prediction.description,
          mainText:
            prediction.structured_formatting?.main_text ||
            prediction.description,
          secondaryText: prediction.structured_formatting?.secondary_text || "",
          types: prediction.types || [],
          distanceMeters: prediction.distance_meters || null,
        };
      });

      setPredictions(processedPredictions);
    } catch (error) {
      console.error("Autocomplete Error:", error);
      Alert.alert("Fel", `Kunde inte söka: ${error.message}`);
      setPredictions([]);
    } finally {
      setLoading(false);
    }
  };

  // Hämta detaljerad information om vald plats
  const getPlaceDetails = async (placeId) => {
    try {
      const params = new URLSearchParams({
        place_id: placeId,
        key: GOOGLE_MAPS_API_KEY,
        fields: "name,formatted_address,geometry,types,place_id",
        language: "sv",
      });

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?${params}`
      );

      const data = await response.json();

      if (response.ok && data.status === "OK") {
        return data.result;
      }
      return null;
    } catch (error) {
      console.error("Place Details Error:", error);
      return null;
    }
  };

  const handlePlaceSelect = async (prediction) => {
    console.log("Vald prediction:", prediction);
    setQuery(prediction.description);
    setPredictions([]);
    setLoading(true);

    try {
      // Hämta detaljerad information
      const placeDetails = await getPlaceDetails(prediction.id);

      if (placeDetails) {
        const location = placeDetails.geometry?.location;
        let distanceText = "";

        if (userLocation && location) {
          const distance = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            location.lat,
            location.lng
          );
          distanceText = `\nAvstånd: ${distance.toFixed(1)} km`;
        }

        Alert.alert(
          "Plats vald",
          `${placeDetails.name || prediction.mainText}\n${
            placeDetails.formatted_address
          }${distanceText}`,
          [
            { text: "OK" },
            {
              text: "Visa detaljer",
              onPress: () =>
                console.log("Fullständig platsinfo:", placeDetails),
            },
          ]
        );
      } else {
        Alert.alert("Plats vald", prediction.description);
      }
    } catch (error) {
      Alert.alert("Plats vald", prediction.description);
    } finally {
      setLoading(false);
    }
  };

  // Beräkna avstånd mellan två koordinater (i km)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const renderPrediction = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.predictionItem}
        onPress={() => handlePlaceSelect(item)}
      >
        <View style={styles.predictionContent}>
          <View style={styles.textContent}>
            <Text style={styles.mainText}>{item.mainText}</Text>
            {item.secondaryText ? (
              <Text style={styles.secondaryText}>{item.secondaryText}</Text>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Places API Autocomplete</Text>

      {locationStatus && <Text style={styles.subtitle}>{locationStatus}</Text>}

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Sök efter platser, adresser, verksamheter..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {query.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setQuery("");
              setPredictions([]);
            }}
          >
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {loading && <Text style={styles.loadingText}>Söker...</Text>}

      {predictions.length > 0 && (
        <FlatList
          data={predictions}
          renderItem={renderPrediction}
          keyExtractor={(item) => item.id}
          style={styles.resultsList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      )}

      {query.length >= 1 && predictions.length === 0 && !loading && (
        <Text style={styles.noResultsText}>Inga resultat hittades</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 15,
    fontStyle: "italic",
  },
  searchContainer: {
    position: "relative",
    marginBottom: 8,
  },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingRight: 50,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  clearButton: {
    position: "absolute",
    right: 15,
    top: 15,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  clearButtonText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "bold",
  },
  helpText: {
    fontSize: 12,
    color: "#888",
    marginBottom: 15,
    fontStyle: "italic",
  },
  loadingText: {
    textAlign: "center",
    color: "#666",
    marginTop: 10,
    fontStyle: "italic",
  },
  noResultsText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontStyle: "italic",
  },
  resultsList: {
    maxHeight: 400,
    marginTop: 10,
  },
  predictionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  predictionContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textContent: {
    flex: 1,
  },
  mainText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 2,
  },
  secondaryText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
});

export default TestPlaces;
