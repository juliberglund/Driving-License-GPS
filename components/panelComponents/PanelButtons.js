import React from "react";
import { View, Button, StyleSheet } from "react-native";

export default function PanelButtons({ is3D, onToggleView, onResetCamera }) {
  return (
    <View style={styles.buttonContainer}>
      <Button
        title={is3D ? "Byt till 2D" : "Byt till 3D"}
        onPress={onToggleView}
      />
      <View style={{ height: 10 }} />
      <Button title="Återställ kamera" onPress={onResetCamera} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5, // skugga på Android
    shadowColor: "#000", // skugga på iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
