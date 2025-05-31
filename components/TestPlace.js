import "react-native-get-random-values";

import React from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

export default function TestPlaces() {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Sök adress (test)…"
        fetchDetails={true}
        debounce={200}
        enablePoweredByContainer={false}
        nearbyPlacesAPI="GooglePlacesSearch"
        minLength={2}
        timeout={10000}
        keyboardShouldPersistTaps="handled"
        listViewDisplayed="auto"
        keepResultsAfterBlur={false}
        currentLocation={false}
        predefinedPlaces={[]}
        predefinedPlacesAlwaysVisible={false}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "sv",
          types: "address",
        }}
        GooglePlacesSearchQuery={{
          rankby: "distance",
          radius: 1000,
        }}
        onPress={(data, details = null) => {
          // När användaren väljer ett förslag:
          if (details && details.geometry && details.geometry.location) {
            const { lat, lng } = details.geometry.location;
            console.log("🏷️ Vald adress:", data.description);
            console.log("📍 Koordinater:", { latitude: lat, longitude: lng });
          } else {
            console.log("⚠️ Inga detaljer från API.");
          }
        }}
        onFail={(error) => {
          console.log("🚨 Autocomplete-fel:", error);
        }}
        // requestUrl brukar inte vara nödvändigt i React Native, men om du behöver det:
        // (kan kommenteras ut eller tas bort)
        requestUrl={{
          url: "https://maps.googleapis.com/maps/api",
          useOnPlatform: "all",
        }}
        renderLeftButton={() => (
          <View style={styles.leftButtonContainer}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/000000/search--v1.png",
              }}
              style={styles.leftIcon}
              resizeMode="contain"
            />
          </View>
        )}
        styles={{
          container: styles.autocompleteContainer,

          //textinput‐behållaren ska se ut
          textInputContainer: {
            backgroundColor: "#f9f9f9",
            borderRadius: 20,
            marginHorizontal: 20,
            marginTop: Platform.OS === "ios" ? 60 : 40,
            shadowColor: "#d4d4d4",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 5,
          },

          // textinput‐fältet ska se ut
          textInput: {
            height: 44,
            backgroundColor: "#FFF",
            borderRadius: 5,
            paddingHorizontal: 12,
            fontSize: 16,
            color: "#000",
          },

          // Hur listvy‐dropdownen ska se ut
          listView: {
            backgroundColor: "#FFF",
            borderRadius: 5,
            marginTop: 5,
            elevation: 3,
          },
        }}
        textInputProps={{
          placeholderTextColor: "gray",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  // Stylingen för “container” som används av GooglePlacesAutocomplete
  autocompleteContainer: {
    flex: 1,
  },

  // Behållare för sök‐ikonen till vänster i textfältet
  leftButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    marginLeft: 15,
  },

  leftIcon: {
    width: 24,
    height: 24,
    tintColor: "gray",
  },
});
