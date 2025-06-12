import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  View,
  StyleSheet,
  Platform,
  Image,
  Keyboard,
  Dimensions,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

const LocationInput = forwardRef(({ currentLocation, onPlaceSelect }, ref) => {
  const autocompleteRef = useRef(null);
  const [locationBias, setLocationBias] = useState({
    location: null,
    radius: 2000,
  });

  useEffect(() => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      setLocationBias({ location: `${latitude},${longitude}`, radius: 2000 });
    }
  }, [currentLocation]);

  useImperativeHandle(ref, () => ({
    clear: () => {
      autocompleteRef.current?.setAddressText("");
    },
  }));

  return (
    <View style={styles.overlay}>
      <GooglePlacesAutocomplete
        ref={autocompleteRef}
        placeholder="Sök adress eller plats"
        fetchDetails
        debounce={200}
        enablePoweredByContainer={false}
        nearbyPlacesAPI="GooglePlacesSearch"
        minLength={2}
        keyboardShouldPersistTaps="handled"
        listViewDisplayed="auto"
        keepResultsAfterBlur={false}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: "sv",
          types: "address",
          ...(locationBias.location
            ? { location: locationBias.location, radius: locationBias.radius }
            : {}),
        }}
        onPress={(data, details = null) => {
          if (details?.geometry?.location) {
            const { lat, lng } = details.geometry.location;
            onPlaceSelect({ latitude: lat, longitude: lng });
            Keyboard.dismiss();
          }
        }}
        onFail={(error) => console.error("Autocomplete error:", error)}
        renderLeftButton={() => (
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/000000/search--v1.png",
            }}
            style={styles.icon}
          />
        )}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
        textInputProps={{
          placeholderTextColor: "#555",
        }}
      />
    </View>
  );
});

export default LocationInput;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    width: width - 32,
    alignSelf: "center",
    zIndex: 999,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#333",
    marginLeft: 8,
  },
  listView: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "#888",
  },
});
