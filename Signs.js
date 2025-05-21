// Signs.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

const signs = [
  {
    title: "Väjningsplikt",
    //image: require("./assets/vajningsplikt.png"),
    description:
      "Väjningsplikt innebär att du måste lämna företräde för all korsande trafik.",
  },
  {
    title: "Huvudled",
    //image: require("./assets/huvudled.png"),
    description:
      "Huvudled innebär att du har företräde i alla korsningar tills skylten upphör.",
  },
  // Lägg till fler skyltar här
];

export default function Signs() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Studera vägskyltar</Text>
      {signs.map((sign, index) => (
        <View key={index} style={styles.card}>
          <Image source={sign.image} style={styles.image} />
          <Text style={styles.cardTitle}>{sign.title}</Text>
          <Text style={styles.description}>{sign.description}</Text>
          <TouchableOpacity style={styles.readMore}>
            <Text style={styles.readMoreText}>Läs mer</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  image: { width: 100, height: 100, marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  description: { fontSize: 14, textAlign: "center", marginTop: 5 },
  readMore: { marginTop: 10 },
  readMoreText: { color: "#007AFF", textDecorationLine: "underline" },
});
