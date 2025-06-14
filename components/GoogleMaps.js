import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Dimensions, Platform, Keyboard } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import PanelButtons from "./panelComponents/PanelButtons";
import LocationInput from "./panelComponents/LocationInput";
import { GOOGLE_MAPS_API_KEY } from "@env";

export default function GoogleMaps() {
  const mapRef = useRef(null);
  const watchRef = useRef(null);
  const locationInputRef = useRef(null);

  const [is3D, setIs3D] = useState(true);
  const [isFollowingUser, setIsFollowingUser] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Nya state för rutt
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [destinationMarker, setDestinationMarker] = useState(null);

  // 1. Begär plats‐permission en gång när komponenten mountar
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("⛔ Åtkomst till plats nekad");
        return;
      }
    })();
  }, []);

  // 2. Starta live‐tracking när is3D eller isFollowingUser ändras
  useEffect(() => {
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("⛔ Åtkomst till plats nekad");
        return;
      }

      if (watchRef.current) {
        watchRef.current.remove();
        watchRef.current = null;
      }

      watchRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          const { latitude, longitude, heading } = location.coords;
          setCurrentLocation({ latitude, longitude, heading });

          if (isFollowingUser && mapRef.current) {
            animateToPosition(latitude, longitude, heading);
          }
        }
      );
    })();

    return () => {
      if (watchRef.current) {
        watchRef.current.remove();
        watchRef.current = null;
      }
    };
  }, [is3D, isFollowingUser]);

  // 3. Animera kartkameran (3D eller 2D)
  const animateToPosition = (latitude, longitude, heading = 0) => {
    if (!mapRef.current) return;

    const cameraConfig = is3D
      ? {
          center: { latitude, longitude },
          pitch: 85,
          heading,
          altitude: 5,
          zoom: 19.5,
        }
      : {
          center: { latitude, longitude },
          pitch: 0,
          heading: 0,
          altitude: 1000,
          zoom: 16,
        };

    mapRef.current.animateCamera(cameraConfig, { duration: 1000 });
  };

  // 4. Hämta rutt från Google Directions API
  const fetchRoute = async (start, destination) => {
    try {
      const origin = `${start.latitude},${start.longitude}`;
      const dest = `${destination.latitude},${destination.longitude}`;

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${dest}&key=${GOOGLE_MAPS_API_KEY}&mode=driving&language=sv`
      );

      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const coordinates = decodePolyline(route.overview_polyline.points);
        setRouteCoordinates(coordinates);

        // Sätt bara destination marker (ingen start marker)
        setDestinationMarker(destination);

        // Zooma för att visa hela rutten
        if (mapRef.current) {
          mapRef.current.fitToCoordinates([start, destination], {
            edgePadding: { top: 100, right: 50, bottom: 150, left: 50 },
            animated: true,
          });
        }

        console.log(
          "Rutt hämtad:",
          data.routes[0].legs[0].distance.text,
          data.routes[0].legs[0].duration.text
        );
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // 5. Decode Google polyline
  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < encoded.length) {
      let shift = 0,
        result = 0;
      let byte;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let deltaLat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      let deltaLng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      points.push({
        latitude: lat * 1e-5,
        longitude: lng * 1e-5,
      });
    }
    return points;
  };

  // 6. Växla mellan 3D‐ och 2D‐vy
  const toggleView = () => {
    setIs3D((prev) => {
      const newIs3D = !prev;
      if (currentLocation) {
        setIsFollowingUser(true);
        animateToPosition(
          currentLocation.latitude,
          currentLocation.longitude,
          currentLocation.heading
        );
      }
      return newIs3D;
    });
  };

  // 7. Återställ kameran till användarens position
  const resetCamera = () => {
    if (currentLocation) {
      setIsFollowingUser(true);
      animateToPosition(
        currentLocation.latitude,
        currentLocation.longitude,
        currentLocation.heading
      );
    }
  };

  // 8. Callback när användaren väljer en plats i sökfältet
  const onPlaceSelect = (routeData) => {
    if (routeData === null) {
      // Avsluta rutt-läge
      setRouteCoordinates([]);
      setDestinationMarker(null);
      setIsFollowingUser(true);
      if (currentLocation) {
        animateToPosition(
          currentLocation.latitude,
          currentLocation.longitude,
          currentLocation.heading
        );
      }
    } else {
      // Ny rutt satt
      setIsFollowingUser(false);
      fetchRoute(routeData.start, routeData.destination);
    }

    // Dölj tangentbordet
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* MapView */}
      <MapView
        ref={mapRef}
        style={styles.map}
        provider="google"
        showsUserLocation={true}
        showsTraffic={false}
        showsBuildings={true}
        followsUserLocation={false}
        initialRegion={{
          latitude: 59.3293,
          longitude: 18.0686,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        onPress={() => {
          Keyboard.dismiss();
          // Stäng ner autocomplete‐listan genom att tömma texten
          locationInputRef.current?.clear();
          setIsFollowingUser(false);
        }}
        onPanDrag={() => {
          setIsFollowingUser(false);
          Keyboard.dismiss();
        }}
      >
        {/* Destination marker - bara röd marker för destination */}
        {destinationMarker && (
          <Marker
            coordinate={destinationMarker}
            title="Destination"
            pinColor="red"
          />
        )}

        {/* Route polyline */}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#4285F4"
            strokeWidth={5}
            strokePattern={[1]}
          />
        )}
      </MapView>

      {/* Sökfältet ovanpå kartan */}
      <LocationInput
        ref={locationInputRef}
        currentLocation={currentLocation}
        onPlaceSelect={onPlaceSelect}
      />

      {/* PanelButtons längst ner */}
      {/* <PanelButtons
        is3D={is3D}
        onToggleView={toggleView}
        onResetCamera={resetCamera}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
