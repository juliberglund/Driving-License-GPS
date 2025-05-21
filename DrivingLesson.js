// DrivingLesson.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

export default function DrivingLesson() {
  const [address, setAddress] = useState("");

  const handleSearch = () => {
    // Här kan du koppla in Google Maps API
    alert(`Söker vägbeskrivning till: ${address}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Övningskörning</Text>
      <TextInput
        placeholder="Skriv adress att övningsköra till"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />
      <Button
        title="Starta navigation"
        onPress={handleSearch}
        color="#4CAF50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});
