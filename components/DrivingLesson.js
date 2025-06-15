import React from "react";
import { View, StyleSheet } from "react-native";
import GoogleMaps from "./GoogleMaps"; // 👈 Se till att sökvägen stämmer

export default function DrivingLessons() {
  return (
    <View style={styles.container}>
      <GoogleMaps showSearch={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
