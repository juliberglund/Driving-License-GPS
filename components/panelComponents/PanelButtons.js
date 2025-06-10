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
    top: 40,
    right: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    elevation: 5,
  },
});
