// ChooseActivity.js
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function ChooseActivity({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vad vill du göra?</Text>
      <Button
        title="📚 Studera vägskyltar"
        onPress={() => navigation.navigate("Signs")}
        color="#4A90E2"
      />
      <View style={{ marginVertical: 10 }} />
      <Button
        title="🚗 Övningskör med vägledning"
        onPress={() => navigation.navigate("DrivingLesson")}
        color="#50E3C2"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: "center",
    fontWeight: "bold",
  },
});
