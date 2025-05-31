// components/panelComponents/LocationInput.js

import React from "react";
import { StyleSheet, Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

/**
 * LocationInput-komponenten renderar en sökruta med Google
 * Places Autocomplete. När användaren väljer en adress
 * anropas onPlaceSelected med latitud/longitud.
 *
 * Props:
 *   - onPlaceSelected: (coords: { latitude: number, longitude: number }) => void
 */
const LocationInput = ({ onPlaceSelected }) => {
  // Debug‐log (valfritt): Värdet av onPlaceSelected bör inte vara undefined
  // console.log("DEBUG: onPlaceSelected i LocationInput = ", onPlaceSelected);

  return (
    <GooglePlacesAutocomplete
      placeholder="Sök efter adress..."
      fetchDetails={true}
      onPress={(data, details = null) => {
        if (details && details.geometry && details.geometry.location) {
          const { lat, lng } = details.geometry.location;
          onPlaceSelected({ latitude: lat, longitude: lng });
        }
      }}
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: "sv",
        types: "address",
      }}
      enablePoweredByContainer={false}
      styles={{
        container: styles.autocompleteContainer,
        textInput: styles.textInput,
        listView: styles.listView,
      }}
    />
  );
};

const styles = StyleSheet.create({
  autocompleteContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    width: "90%",
    alignSelf: "center",
    zIndex: 10,
  },
  textInput: {
    height: 44,
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingHorizontal: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  listView: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginTop: 5,
  },
});

export default LocationInput;
