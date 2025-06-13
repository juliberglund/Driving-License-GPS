// components/PanelComponents/LocationInput.js

import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { View, StyleSheet, Platform, Image, Keyboard } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

const LocationInput = forwardRef(({ currentLocation, onPlaceSelect }, ref) => {
  const autocompleteRef = useRef(null);

  // Lokalt state för att bias:a sökresultaten mot användarens position
  const [locationBias, setLocationBias] = useState({
    location: null,
    radius: 2000, // i meter
  });

  useEffect(() => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      setLocationBias({
        location: `${latitude},${longitude}`,
        radius: 2000,
      });
    }
  }, [currentLocation]);

  // Exponera endast clear() till parent via ref
  useImperativeHandle(ref, () => ({
    clear: () => {
      autocompleteRef.current?.clear();
    },
  }));

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        ref={autocompleteRef}
        placeholder="Sök här…"
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
        // query={{
        //   key: GOOGLE_MAPS_API_KEY,
        //   language: "sv",
        //   types: "address",
        //   ...(locationBias.location
        //     ? {
        //         location: locationBias.location,
        //         radius: locationBias.radius,
        //       }
        //     : {}),
        // }}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "sv",
          location: currentLocation
            ? `${currentLocation.latitude},${currentLocation.longitude}`
            : undefined,
          rankby: "distance", // 🧠 Begränsar till nära platser
          types: "address", // (valfritt) bara adresser
        }}
        GooglePlacesSearchQuery={{
          rankby: "distance",
          ...(locationBias.location
            ? {
                location: locationBias.location,
              }
            : {}),
        }}
        onPress={(data, details = null) => {
          if (details?.geometry?.location) {
            const { lat, lng } = details.geometry.location;
            onPlaceSelect({ latitude: lat, longitude: lng });
            Keyboard.dismiss();
            // Notera: clear() kallas från parent, så vi behöver inte anropa autofill.clear() här
          } else {
            console.log("⚠️ Inga detaljer från API.");
          }
        }}
        onFail={(error) => {
          console.log("🚨 Autocomplete‐fel:", error);
        }}
        styles={{
          // Wrapper för autocomplete, i overlay‐läge
          container: styles.autocompleteWrapper,

          // Stylning för textInputContainer → helvit, rundade hörn, skugga
          textInputContainer: {
            backgroundColor: "#ffffff",
            borderRadius: 8,
            marginHorizontal: 16,
            marginTop: Platform.OS === "ios" ? 60 : 40,
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          },

          // Själva TextInput → helvit, rundade hörn
          textInput: {
            height: 44,
            backgroundColor: "#ffffff",
            borderRadius: 8,
            paddingHorizontal: 12,
            fontSize: 16,
            color: "#000",
          },

          // Dropdown‐listan
          listView: {
            backgroundColor: "#ffffff",
            borderRadius: 8,
            marginHorizontal: 16,
            marginTop: 5,
            elevation: 3,
          },
        }}
        textInputProps={{
          placeholderTextColor: "#999999",
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
      />
    </View>
  );
});

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "transparent",
  },
  autocompleteWrapper: {
    flex: 1,
  },
  leftButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    marginLeft: 12,
  },
  leftIcon: {
    width: 20,
    height: 20,
    tintColor: "#888888",
    marginTop: 2,
    marginTop: 18,
  },
});
